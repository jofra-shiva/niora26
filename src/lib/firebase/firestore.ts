// ============================================================
// HackSpark '26 — Firestore Helpers
// ============================================================

import {
  doc, getDoc, setDoc, updateDoc, addDoc,
  collection, query, where, orderBy, limit,
  getDocs, onSnapshot, serverTimestamp,
  DocumentReference, CollectionReference,
  Timestamp, writeBatch, increment,
} from 'firebase/firestore';
import { db } from './client';
import { FIRESTORE_COLLECTIONS } from '@/lib/utils/constants';
import type {
  UserProfile, Team, TeamMember, Registration,
  Payment, ActivityLog, ProjectSubmission,
  ProblemStatement, Announcement, EventSettings,
  ContactMessage, ActivityType,
} from '@/lib/types';

// --- User Profile ----------------------------------------------

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.USERS, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.USERS, uid);
  await setDoc(ref, {
    ...data,
    uid,
    profileCompleted: false,
    role: 'participant',
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
  }, { merge: true });
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.USERS, uid);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// --- Teams -----------------------------------------------------

export async function getTeamByLeader(leaderUid: string): Promise<Team | null> {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.TEAMS),
    where('leaderUid', '==', leaderUid),
    where('status', '!=', 'disqualified'),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as Team;
}

export async function getTeamById(teamId: string): Promise<Team | null> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.TEAMS, teamId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as Team) : null;
}

export async function createTeam(teamData: Omit<Team, 'teamId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const ref = doc(collection(db, FIRESTORE_COLLECTIONS.TEAMS));
  await setDoc(ref, {
    ...teamData,
    teamId: ref.id,
    syncStatus: 'PENDING',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTeam(teamId: string, data: Partial<Team>): Promise<void> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.TEAMS, teamId);
  await updateDoc(ref, {
    ...data,
    syncStatus: 'PENDING',
    updatedAt: serverTimestamp(),
  });
}

// --- Team Members ----------------------------------------------

export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.TEAM_MEMBERS),
    where('teamId', '==', teamId),
    where('status', '==', 'active'),
    orderBy('createdAt', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data() as TeamMember);
}

export async function addTeamMember(memberData: Omit<TeamMember, 'memberId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const ref = doc(collection(db, FIRESTORE_COLLECTIONS.TEAM_MEMBERS));
  await setDoc(ref, {
    ...memberData,
    memberId: ref.id,
    syncStatus: 'PENDING',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  // Update member count on team
  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.TEAMS, memberData.teamId), {
    memberCount: increment(1),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTeamMember(memberId: string, teamId: string, data: Partial<TeamMember>): Promise<void> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.TEAM_MEMBERS, memberId);
  await updateDoc(ref, {
    ...data,
    syncStatus: 'PENDING',
    updatedAt: serverTimestamp(),
  });
}

export async function removeTeamMember(memberId: string, teamId: string): Promise<void> {
  const batch = writeBatch(db);
  batch.update(doc(db, FIRESTORE_COLLECTIONS.TEAM_MEMBERS, memberId), {
    status: 'removed',
    syncStatus: 'PENDING',
    updatedAt: serverTimestamp(),
  });
  batch.update(doc(db, FIRESTORE_COLLECTIONS.TEAMS, teamId), {
    memberCount: increment(-1),
    updatedAt: serverTimestamp(),
  });
  await batch.commit();
}

// --- Registrations ---------------------------------------------

export async function getRegistrationByTeam(teamId: string): Promise<Registration | null> {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.REGISTRATIONS),
    where('teamId', '==', teamId),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as Registration;
}

export async function createRegistration(data: Omit<Registration, 'registrationId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const ref = doc(collection(db, FIRESTORE_COLLECTIONS.REGISTRATIONS));
  await setDoc(ref, {
    ...data,
    syncStatus: 'PENDING',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateRegistration(registrationId: string, data: Partial<Registration>): Promise<void> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.REGISTRATIONS, registrationId);
  await updateDoc(ref, {
    ...data,
    syncStatus: 'PENDING',
    updatedAt: serverTimestamp(),
  });
}

// --- Activity Logs ---------------------------------------------

export async function logActivity(data: {
  userId: string;
  userName?: string;
  teamId?: string;
  teamName?: string;
  registrationId?: string;
  activityType: ActivityType;
  description: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const ref = doc(collection(db, FIRESTORE_COLLECTIONS.ACTIVITY_LOGS));
  await setDoc(ref, {
    ...data,
    activityId: ref.id,
    syncStatus: 'PENDING',
    status: 'SUCCESS',
    timestamp: serverTimestamp(),
  });
}

export async function getUserActivity(userId: string, limitCount = 20): Promise<ActivityLog[]> {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.ACTIVITY_LOGS),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data() as ActivityLog);
}

// --- Problem Statements ----------------------------------------

export async function getProblemStatements(): Promise<ProblemStatement[]> {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.PROBLEM_STATEMENTS),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data() as ProblemStatement);
}

// --- Announcements ---------------------------------------------

export function subscribeToAnnouncements(
  callback: (announcements: Announcement[]) => void
) {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.ANNOUNCEMENTS),
    where('published', '==', true),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(10)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => d.data() as Announcement));
  });
}

// --- Event Settings --------------------------------------------

export async function getEventSettings(): Promise<EventSettings | null> {
  const ref = doc(db, FIRESTORE_COLLECTIONS.EVENT_SETTINGS, 'main');
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as EventSettings) : null;
}

// --- Contact Messages ------------------------------------------

export async function submitContactMessage(data: Omit<ContactMessage, 'messageId' | 'createdAt' | 'updatedAt' | 'syncStatus'>): Promise<string> {
  const ref = doc(collection(db, FIRESTORE_COLLECTIONS.CONTACT_MESSAGES));
  await setDoc(ref, {
    ...data,
    messageId: ref.id,
    status: 'new',
    syncStatus: 'PENDING',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// --- Submissions -----------------------------------------------

export async function getSubmissionByTeam(teamId: string): Promise<ProjectSubmission | null> {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.SUBMISSIONS),
    where('teamId', '==', teamId),
    where('status', '==', 'active'),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as ProjectSubmission;
}

export async function upsertSubmission(teamId: string, data: Partial<ProjectSubmission>): Promise<string> {
  const existing = await getSubmissionByTeam(teamId);
  if (existing) {
    const ref = doc(db, FIRESTORE_COLLECTIONS.SUBMISSIONS, existing.submissionId);
    await updateDoc(ref, {
      ...data,
      syncStatus: 'PENDING',
      updatedAt: serverTimestamp(),
    });
    return existing.submissionId;
  }
  const ref = doc(collection(db, FIRESTORE_COLLECTIONS.SUBMISSIONS));
  await setDoc(ref, {
    ...data,
    submissionId: ref.id,
    teamId,
    submissionStatus: 'DRAFT',
    syncStatus: 'PENDING',
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}
