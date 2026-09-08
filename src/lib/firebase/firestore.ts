// ============================================================
// HackSpark '26 — Firestore Helpers (Fail-Safe / Silent DB Mode)
// Registration is managed directly via Google Forms
// ============================================================

import type {
  UserProfile, Team, TeamMember, Registration,
  ActivityLog, ProjectSubmission, ProblemStatement,
  Announcement, EventSettings, ActivityType,
} from '@/lib/types';

// Safe mock / fallback helpers so application code runs without throwing DB errors
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  return null;
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  return;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  return;
}

export async function getTeamByLeader(leaderUid: string): Promise<Team | null> {
  return null;
}

export async function getTeamById(teamId: string): Promise<Team | null> {
  return null;
}

export async function createTeam(teamData: Omit<Team, 'teamId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  return 'team-mock-id';
}

export async function updateTeam(teamId: string, data: Partial<Team>): Promise<void> {
  return;
}

export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
  return [];
}

export async function addTeamMember(memberData: Omit<TeamMember, 'memberId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  return 'member-mock-id';
}

export async function updateTeamMember(memberId: string, teamId: string, data: Partial<TeamMember>): Promise<void> {
  return;
}

export async function removeTeamMember(memberId: string, teamId: string): Promise<void> {
  return;
}

export async function getRegistrationByTeam(teamId: string): Promise<Registration | null> {
  return null;
}

export async function createRegistration(data: Omit<Registration, 'registrationId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  return 'reg-mock-id';
}

export async function updateRegistration(registrationId: string, data: Partial<Registration>): Promise<void> {
  return;
}

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
  return;
}

export async function getUserActivity(userId: string, limitCount = 20): Promise<ActivityLog[]> {
  return [];
}

export async function getProblemStatements(): Promise<ProblemStatement[]> {
  return [];
}

export function subscribeToAnnouncements(
  callback: (announcements: Announcement[]) => void
) {
  callback([]);
  return () => {};
}

export async function getEventSettings(): Promise<EventSettings | null> {
  return null;
}

export async function submitContactMessage(data: Record<string, unknown>): Promise<string> {
  return 'msg-mock-id';
}

export async function getSubmissionByTeam(teamId: string): Promise<ProjectSubmission | null> {
  return null;
}

export async function upsertSubmission(teamId: string, data: Partial<ProjectSubmission>): Promise<string> {
  return 'sub-mock-id';
}
