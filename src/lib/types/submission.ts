// ============================================================
// HackSpark '26 — Submission & Problem Statement Types
// ============================================================

import { FirebaseTimestamp, SyncStatus } from './user';

export interface ProblemStatement {
  problemId: string;
  title: string;
  theme: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  expectedOutcome: string;
  technologySuggestions: string[];
  status: 'active' | 'draft' | 'archived';
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
}

export interface ProjectSubmission {
  submissionId: string;
  teamId: string;
  teamName: string;
  registrationId: string;
  projectName: string;
  problemStatementId?: string;
  problemStatement: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  presentationUrl?: string;
  submissionStatus: SubmissionStatus;
  syncStatus: SyncStatus;
  submittedAt?: FirebaseTimestamp;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
  status: 'active' | 'withdrawn';
}

export interface TeamProblemSelection {
  teamId: string;
  problemId: string;
  problemTitle: string;
  selectedAt: FirebaseTimestamp;
  selectedBy: string;
}

export type SubmissionStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'EVALUATED';

export interface Announcement {
  announcementId: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  published: boolean;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
  status: 'active' | 'archived';
}

export interface TimelineEvent {
  timelineId: string;
  title: string;
  description?: string;
  startTime: FirebaseTimestamp;
  endTime?: FirebaseTimestamp;
  type: 'registration' | 'event' | 'deadline' | 'ceremony' | 'meal' | 'break';
  order: number;
  status: 'active' | 'archived';
}

export interface FAQ {
  faqId: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'active' | 'archived';
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
}

export interface EventSettings {
  registrationFee: number;
  currency: string;
  minTeamSize: number;
  maxTeamSize: number;
  registrationOpen: boolean;
  registrationDeadline: FirebaseTimestamp;
  submissionDeadline: FirebaseTimestamp;
  eventStartDate: FirebaseTimestamp;
  eventEndDate: FirebaseTimestamp;
  allowProblemSelection: boolean;
  allowTeamEdit: boolean;
  maintenanceMode: boolean;
  updatedAt: FirebaseTimestamp;
  updatedBy: string;
}

export interface ContactMessage {
  messageId: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  syncStatus: SyncStatus;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
}
