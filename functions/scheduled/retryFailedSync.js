// ============================================================
// NIORA '26 — Scheduled: Retry Failed Google Sheets Sync
// Runs every 30 minutes to retry failed syncs
// ============================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { upsertRow, appendRow, formatTimestamp, ensureSheetsExist } = require('../sheets/sheetsClient');

const db = admin.firestore();
const MAX_RETRIES = 5;

exports.retryFailedSync = functions.pubsub
  .schedule('every 30 minutes')
  .onRun(async (context) => {
    functions.logger.info('Running retry failed sync job');

    const failedSyncs = await db
      .collection('syncQueue')
      .where('syncStatus', '==', 'FAILED')
      .where('retryCount', '<', MAX_RETRIES)
      .limit(20)
      .get();

    if (failedSyncs.empty) {
      functions.logger.info('No failed syncs to retry');
      return;
    }

    await ensureSheetsExist();

    for (const queueDoc of failedSyncs.docs) {
      const { type, documentId, retryCount } = queueDoc.data();

      try {
        let success = false;

        if (type === 'registration') {
          const doc = await db.collection('registrations').doc(documentId).get();
          if (doc.exists) {
            const data = doc.data();
            // Re-trigger sync via update
            await doc.ref.update({ syncStatus: 'PENDING', updatedAt: admin.firestore.FieldValue.serverTimestamp() });
            success = true;
          }
        } else if (type === 'team') {
          const doc = await db.collection('teams').doc(documentId).get();
          if (doc.exists) {
            await doc.ref.update({ syncStatus: 'PENDING', updatedAt: admin.firestore.FieldValue.serverTimestamp() });
            success = true;
          }
        } else if (type === 'payment') {
          const doc = await db.collection('payments').doc(documentId).get();
          if (doc.exists) {
            await doc.ref.update({ syncStatus: 'PENDING', updatedAt: admin.firestore.FieldValue.serverTimestamp() });
            success = true;
          }
        }

        if (success) {
          await queueDoc.ref.update({
            syncStatus: 'RETRYING',
            retryCount: retryCount + 1,
            lastRetryAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      } catch (error) {
        functions.logger.error(`Retry failed for ${type}/${documentId}:`, error);
        await queueDoc.ref.update({
          retryCount: retryCount + 1,
          lastError: error.message,
          lastRetryAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }

    functions.logger.info(`Processed ${failedSyncs.size} retry items`);
  });
