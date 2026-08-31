// ============================================================
// NIORA '26 — Firestore Trigger: Registration Write
// Syncs registration data to Google Sheets on create/update
// ============================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { upsertRow, formatTimestamp, ensureSheetsExist } = require('../sheets/sheetsClient');

const db = admin.firestore();

exports.onRegistrationWrite = functions.firestore
  .document('registrations/{registrationId}')
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;

    if (!after) return; // deletion

    const { registrationId } = context.params;

    // ── Sync Participants sheet ──────────────────────────────
    try {
      await ensureSheetsExist();

      // Get team members for this registration
      const membersSnap = await db
        .collection('teamMembers')
        .where('teamId', '==', after.teamId)
        .where('status', '==', 'active')
        .get();

      for (const memberDoc of membersSnap.docs) {
        const m = memberDoc.data();
        const rowData = [
          after.registrationId || registrationId,
          m.uid || '',
          m.fullName,
          m.email,
          m.phone,
          m.collegeName,
          m.course,
          m.branch,
          m.year,
          m.city,
          m.state,
          after.teamId,
          after.teamName,
          after.registrationStatus,
          after.paymentStatus,
          formatTimestamp(after.createdAt),
          formatTimestamp(after.updatedAt),
        ];

        // Upsert using email as unique key (within team)
        await upsertRow('Participants', m.email, rowData);
      }

      // Update sync status in Firestore
      await change.after.ref.update({ syncStatus: 'SYNCED' });

    } catch (error) {
      console.error('Failed to sync registration to Sheets:', error);
      // Store in syncQueue for retry
      await db.collection('syncQueue').add({
        type: 'registration',
        documentId: registrationId,
        syncStatus: 'FAILED',
        error: error.message,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        retryCount: 0,
      });
      // Mark as failed sync (don't throw — don't block registration)
      await change.after.ref.update({ syncStatus: 'FAILED' });
    }
  });
