// ============================================================
// HackSpark '26 — Constants
// ============================================================

export const EVENT_NAME = "HackSpark '26";
export const EVENT_TAGLINE = 'Code Beyond Limits. Build the Future.';
export const EVENT_DESCRIPTION = '24 Hours of Coding • Creating • Innovating';
export const COLLEGE_NAME = 'NEHRU INSTITUTE OF INFORMATION TECHNOLOGY AND MANAGEMENT';
export const COLLEGE_AFFILIATION = 'Affiliated to Anna University, Chennai';
export const DEPARTMENT = 'PG Department of Computer Applications';

// IST = UTC+5:30 → so 10:00 AM IST = 04:30 UTC
export const EVENT_START_DATE = new Date('2026-10-09T04:30:00Z');
export const EVENT_END_DATE = new Date('2026-10-10T04:30:00Z');
export const PRIZE_POOL = '₹20,000';

export const REGISTRATION_ID_PREFIX = 'hackspark26-REG';
export const TEAM_ID_PREFIX = 'TEAM';
export const ACTIVITY_ID_PREFIX = 'ACT';
export const PAYMENT_ID_PREFIX = 'PAY';
export const SUBMISSION_ID_PREFIX = 'SUB';

export const DEFAULT_MIN_TEAM_SIZE = 2;
export const DEFAULT_MAX_TEAM_SIZE = 5;
export const DEFAULT_REGISTRATION_FEE = 500;
export const DEFAULT_CURRENCY = 'INR';

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

export const COURSE_OPTIONS = [
  'B.E. / B.Tech', 'M.E. / M.Tech', 'MCA', 'BCA', 'B.Sc. (CS/IT)',
  'M.Sc. (CS/IT)', 'MBA', 'Other',
];

export const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni'];

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  TEAMS: 'teams',
  TEAM_MEMBERS: 'teamMembers',
  REGISTRATIONS: 'registrations',
  PAYMENTS: 'payments',
  SUBMISSIONS: 'submissions',
  PROBLEM_STATEMENTS: 'problemStatements',
  THEMES: 'themes',
  TIMELINE: 'timeline',
  ANNOUNCEMENTS: 'announcements',
  FAQS: 'faqs',
  ORGANIZERS: 'organizers',
  CONTACT_MESSAGES: 'contactMessages',
  ACTIVITY_LOGS: 'activityLogs',
  EVENT_SETTINGS: 'eventSettings',
  SYNC_QUEUE: 'syncQueue',
} as const;

export const PRIORITY_COLORS = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-orange-50 text-orange-700',
  critical: 'bg-red-50 text-red-700',
} as const;

export const PAYMENT_STATUS_COLORS = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  PROCESSING: 'bg-blue-50 text-blue-700 border-blue-200',
  PAID: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  FAILED: 'bg-red-50 text-red-700 border-red-200',
  REFUNDED: 'bg-slate-50 text-slate-700 border-slate-200',
} as const;

export const SUBMISSION_STATUS_COLORS = {
  DRAFT: 'bg-slate-50 text-slate-600 border-slate-200',
  SUBMITTED: 'bg-blue-50 text-blue-700 border-blue-200',
  UNDER_REVIEW: 'bg-violet-50 text-violet-700 border-violet-200',
  EVALUATED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
} as const;
