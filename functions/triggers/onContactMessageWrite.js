const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { appendRow, formatTimestamp, ensureSheetsExist } = require('../sheets/sheetsClient');

exports.onContactMessageWrite = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    try {
      await ensureSheetsExist();
      const rowData = [
        formatTimestamp(data.createdAt),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.subject || '',
        data.message || '',
        data.status || 'new',
      ];
      await appendRow('Contact Messages', rowData);
      await snap.ref.update({ syncStatus: 'SYNCED' });
    } catch (error) {
      console.error('Contact sync failed:', error);
      await snap.ref.update({ syncStatus: 'FAILED' });
    }
  });
