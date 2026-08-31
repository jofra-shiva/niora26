const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.setAdminRole = functions.https.onCall(async (data, context) => {
  // Caller must already be an admin
  if (!context.auth || context.auth.token.admin !== true) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can set admin roles');
  }

  const { uid, isAdmin } = data;
  if (!uid) {
    throw new functions.https.HttpsError('invalid-argument', 'uid is required');
  }

  await admin.auth().setCustomUserClaims(uid, {
    admin: !!isAdmin,
    role: isAdmin ? 'admin' : 'participant',
  });

  // Update Firestore user role
  await admin.firestore().collection('users').doc(uid).update({
    role: isAdmin ? 'admin' : 'participant',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await admin.firestore().collection('activityLogs').add({
    userId: context.auth.uid,
    activityType: 'ADMIN_ACTION',
    description: `Set admin role for ${uid}: ${isAdmin}`,
    syncStatus: 'PENDING',
    status: 'SUCCESS',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true, message: `Admin role ${isAdmin ? 'granted' : 'revoked'} for ${uid}` };
});
