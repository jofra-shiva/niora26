'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, ClipboardList, FileText, TrendingUp, Activity } from 'lucide-react';
import {
  getDocs, collection, query, where, orderBy, limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { FIRESTORE_COLLECTIONS } from '@/lib/utils/constants';
import { format } from 'date-fns';
import type { Registration, Team, ActivityLog } from '@/lib/types';
import Link from 'next/link';

interface Stats {
  totalTeams: number;
  totalMembers: number;
  totalRegistrations: number;
  totalPaid: number;
  totalRevenue: number;
  totalSubmissions: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats>({ totalTeams: 0, totalMembers: 0, totalRegistrations: 0, totalPaid: 0, totalRevenue: 0, totalSubmissions: 0 });
  const [recentRegs, setRecentRegs] = useState<Registration[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [teamsSnap, membersSnap, regsSnap, submissionsSnap, actSnap] = await Promise.all([
        getDocs(query(collection(db, FIRESTORE_COLLECTIONS.TEAMS), where('status', '!=', 'disqualified'))),
        getDocs(query(collection(db, FIRESTORE_COLLECTIONS.TEAM_MEMBERS), where('status', '==', 'active'))),
        getDocs(collection(db, FIRESTORE_COLLECTIONS.REGISTRATIONS)),
        getDocs(query(collection(db, FIRESTORE_COLLECTIONS.SUBMISSIONS), where('status', '==', 'active'))),
        getDocs(query(collection(db, FIRESTORE_COLLECTIONS.ACTIVITY_LOGS), orderBy('timestamp', 'desc'), limit(10))),
      ]);

      const regs = regsSnap.docs.map(d => d.data() as Registration);
      const paid = regs.filter(r => r.paymentStatus === 'PAID');

      setStats({
        totalTeams: teamsSnap.size,
        totalMembers: membersSnap.size,
        totalRegistrations: regsSnap.size,
        totalPaid: paid.length,
        totalRevenue: paid.length * 500,
        totalSubmissions: submissionsSnap.size,
      });

      setRecentRegs(regs.slice(0, 5));
      setRecentActivity(actSnap.docs.map(d => d.data() as ActivityLog));
      setLoading(false);
    };
    load();
  }, []);

  const STAT_CARDS = [
    { label: 'Total Teams', value: stats.totalTeams, icon: Users, color: 'text-indigo-500 bg-indigo-50', href: '/admin/teams' },
    { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'text-violet-500 bg-violet-50', href: '/admin/participants' },
    { label: 'Registrations', value: stats.totalRegistrations, icon: ClipboardList, color: 'text-amber-500 bg-amber-50', href: '/admin/registrations' },
    { label: 'Paid Teams', value: stats.totalPaid, icon: CreditCard, color: 'text-emerald-500 bg-emerald-50', href: '/admin/payments' },
    { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-rose-500 bg-rose-50', href: '/admin/payments' },
    { label: 'Submissions', value: stats.totalSubmissions, icon: FileText, color: 'text-cyan-500 bg-cyan-50', href: '/admin/submissions' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-28 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-bold text-2xl text-slate-800">Admin Overview</h1>
        <p className="text-slate-500 text-sm mt-1">HackSpark '26 — Real-time event metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, href }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link href={href} className="glass-card-hover rounded-xl p-5 block">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-heading font-black text-2xl text-slate-800">{value}</p>
              <p className="text-xs text-slate-400 font-medium mt-1">{label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-slate-800">Recent Registrations</h2>
            <Link href="/admin/registrations" className="text-xs text-indigo-500 font-medium">View All</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentRegs.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">No registrations yet</div>
            ) : recentRegs.map((reg) => (
              <div key={reg.registrationId || reg.teamId} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-slate-800">{reg.teamName}</p>
                  <p className="text-xs text-slate-400">{reg.memberCount} members</p>
                </div>
                <span className={`badge text-[10px] ${reg.paymentStatus === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
                  {reg.paymentStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Live Activity
            </h2>
            <Link href="/admin/activity" className="text-xs text-indigo-500 font-medium">View All</Link>
          </div>
          <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">No activity yet</div>
            ) : recentActivity.map((log, i) => (
              <div key={log.activityId || i} className="px-6 py-2.5 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 truncate">{log.description}</p>
                  <p className="text-[10px] text-slate-400">
                    {log.timestamp?.toDate ? format(log.timestamp.toDate(), 'hh:mm a') : ''}
                  </p>
                </div>
                <span className="badge-neutral text-[10px] flex-shrink-0">{log.activityType}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
