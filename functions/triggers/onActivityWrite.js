const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { appendRow, formatTimestamp, ensureSheetsExist } = require('../sheets/sheetsClient');

exports.onActivityWrite = functions.firestore
  .document('activityLogs/{logId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    try {
      await ensureSheetsExist();
      const rowData = [
        formatTimestamp(data.timestamp),
        data.activityId || context.params.logId,
        data.userId || '',
        data.registrationId || '',
        data.teamId || '',
        data.teamName || '',
        data.userName || '',
        data.activityType || '',
        data.description || '',
        data.status || 'SUCCESS',
        data.metadata ? JSON.stringify(data.metadata) : '',
      ];
      await appendRow('Activity Logs', rowData);
      await snap.ref.update({ syncStatus: 'SYNCED' });
    } catch (error) {
      console.error('Activity log sync failed:', error);
      await snap.ref.update({ syncStatus: 'FAILED' });
    }
  });
