// ============================================================
// NIORA '26 — Cloud Functions Entry Point
// ============================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { onRegistrationWrite } = require('./triggers/onRegistrationWrite');
const { onTeamWrite } = require('./triggers/onTeamWrite');
const { onPaymentWrite } = require('./triggers/onPaymentWrite');
const { onSubmissionWrite } = require('./triggers/onSubmissionWrite');
const { onActivityWrite } = require('./triggers/onActivityWrite');
const { onContactMessageWrite } = require('./triggers/onContactMessageWrite');
const { generateRegistrationId } = require('./callable/generateRegistrationId');
const { setAdminRole } = require('./callable/setAdminRole');
const { retryFailedSync } = require('./scheduled/retryFailedSync');

// ── Firestore Triggers ──────────────────────────────────────
exports.onRegistrationWrite = onRegistrationWrite;
exports.onTeamWrite = onTeamWrite;
exports.onPaymentWrite = onPaymentWrite;
exports.onSubmissionWrite = onSubmissionWrite;
exports.onActivityWrite = onActivityWrite;
exports.onContactMessageWrite = onContactMessageWrite;

// ── Callable Functions ──────────────────────────────────────
exports.generateRegistrationId = generateRegistrationId;
exports.setAdminRole = setAdminRole;

// ── Scheduled Functions ─────────────────────────────────────
exports.retryFailedSync = retryFailedSync;
