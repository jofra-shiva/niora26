'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { subscribeToAnnouncements, logActivity } from '@/lib/firebase/firestore';
import type { Announcement } from '@/lib/types';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';
import { PRIORITY_COLORS } from '@/lib/utils/constants';

export default function AnnouncementsPage() {
  const { user, profile } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAnnouncements((items) => {
      setAnnouncements(items);
      setLoading(false);

      // Log that user viewed announcements
      if (user && items.length > 0) {
        logActivity({
          userId: user.uid,
          userName: profile?.fullName,
          activityType: 'ANNOUNCEMENT_VIEWED',
          description: `Viewed ${items.length} announcements`,
        }).catch(() => {});
      }
    });
    return () => unsub();
  }, [user, profile]);

  const PRIORITY_LABELS = { critical: '🚨 Critical', high: '⚠️ High', medium: 'ℹ️ Medium', low: '📌 Low' };

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
          <Bell className="w-5 h-5 text-indigo-500" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Announcements</h1>
          <p className="text-sm text-slate-500">Live updates from the organizers</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}
        </div>
      ) : announcements.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Bell className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400">No announcements yet. Check back later.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.announcementId} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-heading font-semibold text-slate-800">{a.title}</h3>
                <span className={`badge text-[10px] flex-shrink-0 ${PRIORITY_COLORS[a.priority]}`}>
                  {PRIORITY_LABELS[a.priority]}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{a.message}</p>
              <p className="text-xs text-slate-400 mt-3">
                {a.createdAt?.toDate ? format(a.createdAt.toDate(), 'dd MMM yyyy · hh:mm a') : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
