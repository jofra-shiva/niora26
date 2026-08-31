// ============================================================
// HackSpark '26 — Team Types
// ============================================================

import { FirebaseTimestamp, SyncStatus } from './user';

export interface Team {
  teamId: string;
  teamName: string;
  leaderUid: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  collegeName: string;
  course: string;
  branch: string;
  year: string;
  city: string;
  state: string;
  memberCount: number;
  status: TeamStatus;
  syncStatus: SyncStatus;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
}

export interface TeamMember {
  memberId: string;
  teamId: string;
  teamName: string;
  uid?: string; // if registered user
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  course: string;
  branch: string;
  year: string;
  city: string;
  state: string;
  role: MemberRole;
  syncStatus: SyncStatus;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
  status: 'active' | 'removed';
}

export type TeamStatus = 'incomplete' | 'complete' | 'registered' | 'disqualified';
export type MemberRole = 'LEADER' | 'MEMBER';

