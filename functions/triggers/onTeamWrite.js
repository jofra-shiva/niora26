// ============================================================
// NIORA '26 — Firestore Trigger: Team Write
// ============================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { upsertRow, formatTimestamp, ensureSheetsExist } = require('../sheets/sheetsClient');

const db = admin.firestore();

exports.onTeamWrite = functions.firestore
  .document('teams/{teamId}')
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return;

    const { teamId } = context.params;

    try {
      await ensureSheetsExist();

      // Get registration status
      const regSnap = await db
        .collection('registrations')
        .where('teamId', '==', teamId)
        .limit(1)
        .get();

      const reg = regSnap.empty ? null : regSnap.docs[0].data();

      const rowData = [
        teamId,
        after.teamName,
        after.leaderName,
        after.leaderEmail,
        after.leaderPhone,
        after.collegeName,
        after.course,
        after.branch,
        after.year,
        after.city,
        after.state,
        String(after.memberCount || 0),
        reg?.registrationStatus || 'NOT_REGISTERED',
        reg?.paymentStatus || 'PENDING',
        formatTimestamp(after.createdAt),
        formatTimestamp(after.updatedAt),
      ];

      await upsertRow('Teams', teamId, rowData);

      // Sync members
      const membersSnap = await db
        .collection('teamMembers')
        .where('teamId', '==', teamId)
        .where('status', '==', 'active')
        .get();

      for (const memberDoc of membersSnap.docs) {
        const m = memberDoc.data();
        const memberRow = [
          teamId,
          after.teamName,
          m.memberId,
          m.fullName,
          m.email,
          m.phone,
          m.collegeName,
          m.course,
          m.branch,
          m.year,
          m.city,
          m.state,
          m.role,
          formatTimestamp(m.createdAt),
          formatTimestamp(m.updatedAt),
        ];
        await upsertRow('Team Members', m.memberId, memberRow);
      }

      await change.after.ref.update({ syncStatus: 'SYNCED' });

    } catch (error) {
      console.error('Team sync failed:', error);
      await db.collection('syncQueue').add({
        type: 'team',
        documentId: teamId,
        syncStatus: 'FAILED',
        error: error.message,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        retryCount: 0,
      });
      await change.after.ref.update({ syncStatus: 'FAILED' });
    }
  });
