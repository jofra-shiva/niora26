// ============================================================
// HackSpark '26 — Activity Log Types
// ============================================================

import { FirebaseTimestamp, SyncStatus } from './user';

export interface ActivityLog {
  activityId: string;
  userId: string;
  userName?: string;
  teamId?: string;
  teamName?: string;
  registrationId?: string;
  activityType: ActivityType;
  description: string;
  timestamp: FirebaseTimestamp;
  metadata?: Record<string, unknown>;
  syncStatus: SyncStatus;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export type ActivityType =
  | 'ACCOUNT_CREATED'
  | 'LOGIN'
  | 'LOGOUT'
  | 'PROFILE_CREATED'
  | 'PROFILE_UPDATED'
  | 'TEAM_CREATED'
  | 'TEAM_UPDATED'
  | 'MEMBER_ADDED'
  | 'MEMBER_UPDATED'
  | 'MEMBER_REMOVED'
  | 'REGISTRATION_STARTED'
  | 'REGISTRATION_COMPLETED'
  | 'PAYMENT_STARTED'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'PROBLEM_VIEWED'
  | 'PROBLEM_SELECTED'
  | 'SUBMISSION_STARTED'
  | 'SUBMISSION_UPDATED'
  | 'SUBMISSION_COMPLETED'
  | 'ANNOUNCEMENT_VIEWED'
  | 'ADMIN_ACTION';
