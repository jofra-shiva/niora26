const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { upsertRow, formatTimestamp, ensureSheetsExist } = require('../sheets/sheetsClient');

exports.onSubmissionWrite = functions.firestore
  .document('submissions/{submissionId}')
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return;
    const { submissionId } = context.params;
    try {
      await ensureSheetsExist();
      const rowData = [
        submissionId,
        after.teamId || '',
        after.teamName || '',
        after.projectName || '',
        after.problemStatement || '',
        after.description || '',
        (after.techStack || []).join(', '),
        after.githubUrl || '',
        after.demoUrl || '',
        after.presentationUrl || '',
        after.submissionStatus || '',
        formatTimestamp(after.submittedAt),
        formatTimestamp(after.updatedAt),
      ];
      await upsertRow('Submissions', submissionId, rowData);
      await change.after.ref.update({ syncStatus: 'SYNCED' });
    } catch (error) {
      console.error('Submission sync failed:', error);
      await admin.firestore().collection('syncQueue').add({
        type: 'submission', documentId: submissionId, syncStatus: 'FAILED',
        error: error.message, createdAt: admin.firestore.FieldValue.serverTimestamp(), retryCount: 0,
      });
      await change.after.ref.update({ syncStatus: 'FAILED' });
    }
  });
