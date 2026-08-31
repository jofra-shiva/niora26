// ============================================================
// HackSpark '26 — User Types
// ============================================================

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  course: string;
  branch: string;
  year: string;
  city: string;
  state: string;
  profileCompleted: boolean;
  role: 'participant' | 'admin' | 'organizer';
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
  status: 'active' | 'inactive' | 'banned';
}

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
  toDate?: () => Date;
}

export type UserRole = 'participant' | 'admin' | 'organizer';

export type SyncStatus = 'PENDING' | 'SYNCED' | 'FAILED' | 'RETRYING';

