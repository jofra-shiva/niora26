// ============================================================
// HackSpark '26 — Registration Types
// ============================================================

import { FirebaseTimestamp, SyncStatus } from './user';

export interface Registration {
  registrationId: string; // hackspark26-REG-000123
  teamId: string;
  teamName: string;
  leaderUid: string;
  leaderName: string;
  memberCount: number;
  registrationStatus: RegistrationStatus;
  paymentStatus: PaymentStatus;
  syncStatus: SyncStatus;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
  status: 'active' | 'cancelled';
}

export interface Payment {
  paymentId: string;
  registrationId: string;
  teamId: string;
  teamName: string;
  userUid: string;
  amount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  gatewayReference?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  verifiedBy?: string;
  verifiedAt?: FirebaseTimestamp;
  paymentDate?: FirebaseTimestamp;
  syncStatus: SyncStatus;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
  status: 'active' | 'cancelled';
}

export type RegistrationStatus =
  | 'ACCOUNT_CREATED'
  | 'PROFILE_COMPLETE'
  | 'TEAM_CREATED'
  | 'MEMBERS_ADDED'
  | 'REVIEW_COMPLETE'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_PROCESSING'
  | 'COMPLETE';

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface RegistrationStep {
  step: number;
  label: string;
  status: 'complete' | 'current' | 'upcoming';
}

export const REGISTRATION_STEPS: RegistrationStep[] = [
  { step: 1, label: 'Account', status: 'upcoming' },
  { step: 2, label: 'Profile', status: 'upcoming' },
  { step: 3, label: 'Team', status: 'upcoming' },
  { step: 4, label: 'Members', status: 'upcoming' },
  { step: 5, label: 'Review', status: 'upcoming' },
  { step: 6, label: 'Payment', status: 'upcoming' },
  { step: 7, label: 'Complete', status: 'upcoming' },
];
