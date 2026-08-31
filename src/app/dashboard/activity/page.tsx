'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserActivity } from '@/lib/firebase/firestore';
import type { ActivityLog } from '@/lib/types';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

const ACTIVITY_ICONS: Record<string, string> = {
  ACCOUNT_CREATED: '🎉', LOGIN: '🔑', LOGOUT: '👋', PROFILE_CREATED: '👤',
  PROFILE_UPDATED: '✏️', TEAM_CREATED: '👥', TEAM_UPDATED: '📝',
  MEMBER_ADDED: '➕', MEMBER_REMOVED: '➖', REGISTRATION_STARTED: '📋',
  REGISTRATION_COMPLETED: '✅', PAYMENT_STARTED: '💳', PAYMENT_SUCCESS: '💰',
  PAYMENT_FAILED: '❌', PROBLEM_VIEWED: '👁️', PROBLEM_SELECTED: '🎯',
  SUBMISSION_STARTED: '📁', SUBMISSION_UPDATED: '🔄', SUBMISSION_COMPLETED: '🚀',
  ANNOUNCEMENT_VIEWED: '📢', ADMIN_ACTION: '⚙️',
};

export default function ActivityPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserActivity(user.uid, 50).then(l => { setLogs(l); setLoading(false); });
  }, [user]);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-slate-800">Activity Log</h1>
        <p className="text-slate-500 text-sm mt-1">Your recent actions and events</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
        </div>
      ) : logs.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Activity className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400">No activity recorded yet</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl divide-y divide-slate-50 overflow-hidden">
          {logs.map((log, i) => (
            <div key={log.activityId || i} className="p-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
              <span className="text-xl flex-shrink-0 mt-0.5">
                {ACTIVITY_ICONS[log.activityType] || '📌'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-slate-800">{log.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">
                    {log.timestamp?.toDate
                      ? format(log.timestamp.toDate(), 'dd MMM yyyy · hh:mm a')
                      : 'Just now'}
                  </span>
                  <span className="badge-neutral text-[10px]">{log.activityType}</span>
                </div>
              </div>
              <span className={`badge text-[10px] flex-shrink-0 ${
                log.status === 'SUCCESS' ? 'badge-success' :
                log.status === 'FAILED' ? 'badge-danger' : 'badge-neutral'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
