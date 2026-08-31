// ── Payment Trigger ──────────────────────────────────────────
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { upsertRow, formatTimestamp, ensureSheetsExist } = require('../sheets/sheetsClient');

exports.onPaymentWrite = functions.firestore
  .document('payments/{paymentId}')
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return;
    const { paymentId } = context.params;
    try {
      await ensureSheetsExist();
      const rowData = [
        paymentId,
        after.registrationId || '',
        after.teamId || '',
        after.teamName || '',
        after.userUid || '',
        String(after.amount || ''),
        after.currency || 'INR',
        after.paymentStatus || '',
        after.paymentMethod || '',
        after.razorpayPaymentId || after.gatewayReference || '',
        after.verifiedBy || '',
        formatTimestamp(after.verifiedAt || after.paymentDate),
        formatTimestamp(after.createdAt),
        formatTimestamp(after.updatedAt),
      ];
      await upsertRow('Payments', paymentId, rowData);
      await change.after.ref.update({ syncStatus: 'SYNCED' });
    } catch (error) {
      console.error('Payment sync failed:', error);
      await admin.firestore().collection('syncQueue').add({
        type: 'payment', documentId: paymentId, syncStatus: 'FAILED',
        error: error.message, createdAt: admin.firestore.FieldValue.serverTimestamp(), retryCount: 0,
      });
      await change.after.ref.update({ syncStatus: 'FAILED' });
    }
  });
