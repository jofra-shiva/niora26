// ============================================================
// NIORA '26 — Generate Registration ID (Callable Function)
// Server-side sequential ID generation with Firestore counter
// ============================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

exports.generateRegistrationId = functions.https.onCall(async (data, context) => {
  // Must be authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be signed in');
  }

  const { teamId } = data;
  if (!teamId) {
    throw new functions.https.HttpsError('invalid-argument', 'teamId is required');
  }

  // Verify user is the team leader
  const teamDoc = await db.collection('teams').doc(teamId).get();
  if (!teamDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Team not found');
  }

  if (teamDoc.data().leaderUid !== context.auth.uid) {
    throw new functions.https.HttpsError('permission-denied', 'Only team leader can generate registration ID');
  }

  // Check if registration ID already exists for this team
  const existingReg = await db
    .collection('registrations')
    .where('teamId', '==', teamId)
    .limit(1)
    .get();

  if (!existingReg.empty && existingReg.docs[0].data().registrationId?.startsWith('NIORA26-REG')) {
    return { registrationId: existingReg.docs[0].data().registrationId };
  }

  // Atomic counter increment for sequential IDs
  const counterRef = db.collection('eventSettings').doc('registrationCounter');

  const registrationId = await db.runTransaction(async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    const currentCount = counterDoc.exists ? counterDoc.data().count : 0;
    const newCount = currentCount + 1;

    transaction.set(counterRef, { count: newCount }, { merge: true });

    return `NIORA26-REG-${String(newCount).padStart(6, '0')}`;
  });

  // Update the registration document with the generated ID
  if (!existingReg.empty) {
    await existingReg.docs[0].ref.update({
      registrationId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // Log activity
  await db.collection('activityLogs').add({
    userId: context.auth.uid,
    teamId,
    activityType: 'REGISTRATION_COMPLETED',
    description: `Registration ID generated: ${registrationId}`,
    syncStatus: 'PENDING',
    status: 'SUCCESS',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { registrationId };
});
