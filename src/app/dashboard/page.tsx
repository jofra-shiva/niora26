'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Clock, CreditCard, FileText,
  Bell, Users, ChevronRight, ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getTeamByLeader, getRegistrationByTeam,
  getTeamMembers, subscribeToAnnouncements,
} from '@/lib/firebase/firestore';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { EVENT_START_DATE, PAYMENT_STATUS_COLORS } from '@/lib/utils/constants';
import type { Team, Registration, TeamMember, Announcement } from '@/lib/types';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const t = await getTeamByLeader(user.uid);
      if (t) {
        const [reg, mems] = await Promise.all([
          getRegistrationByTeam(t.teamId),
          getTeamMembers(t.teamId),
        ]);
        setTeam(t);
        setRegistration(reg);
        setMembers(mems);
      }
      setLoading(false);
    };
    load();

    // Real-time announcements
    const unsub = subscribeToAnnouncements(setAnnouncements);
    return () => unsub();
  }, [user]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const STATUS_CARDS = [
    {
      label: 'Registration',
      value: registration ? registration.registrationStatus.replace(/_/g, ' ') : team ? 'Team Created' : 'Not Started',
      icon: CheckCircle2,
      color: registration ? 'text-emerald-500 bg-emerald-50' : team ? 'text-amber-500 bg-amber-50' : 'text-slate-400 bg-slate-50',
      href: '/dashboard/registration',
    },
    {
      label: 'Payment',
      value: registration?.paymentStatus || 'PENDING',
      icon: CreditCard,
      color: registration?.paymentStatus === 'PAID' ? 'text-emerald-500 bg-emerald-50' : 'text-amber-500 bg-amber-50',
      href: '/dashboard/payment',
    },
    {
      label: 'Team',
      value: team ? `${members.length} member${members.length !== 1 ? 's' : ''}` : 'No team',
      icon: Users,
      color: team ? 'text-indigo-500 bg-indigo-50' : 'text-slate-400 bg-slate-50',
      href: '/dashboard/team',
    },
    {
      label: 'Submission',
      value: 'Not Started',
      icon: FileText,
      color: 'text-slate-400 bg-slate-50',
      href: '/dashboard/submission',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-800">
          {greeting()}, {profile?.fullName?.split(' ')[0] || 'Participant'} 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Welcome to your HackSpark '26 dashboard.
          {!registration && (
            <Link href="/register/complete" className="text-indigo-500 font-semibold ml-1">
              Complete your registration →
            </Link>
          )}
        </p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card rounded-2xl p-6 text-center"
      >
        <CountdownTimer targetDate={EVENT_START_DATE} size="md" />
      </motion.div>

      {/* Status Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {STATUS_CARDS.map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className="glass-card-hover rounded-xl p-4 group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
            <p className="font-heading font-semibold text-sm text-slate-700 leading-tight">{value}</p>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 mt-2 group-hover:text-indigo-400 transition-colors" />
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-slate-800">My Team</h2>
            <Link href="/dashboard/team" className="text-xs text-indigo-500 hover:text-indigo-700 font-medium flex items-center gap-1">
              Manage <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {team ? (
            <>
              <p className="font-heading font-bold text-lg text-indigo-600 mb-4">{team.teamName}</p>
              <div className="space-y-3">
                {members.map(m => (
                  <div key={m.memberId} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: m.role === 'LEADER' ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#94A3B8' }}>
                      {m.fullName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-800 truncate">{m.fullName}</p>
                      <p className="text-xs text-slate-400 truncate">{m.collegeName}</p>
                    </div>
                    <span className={`badge text-[10px] ${m.role === 'LEADER' ? 'badge-primary' : 'badge-neutral'}`}>
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No team yet</p>
              <Link href="/register/complete" className="btn-primary text-sm mt-3 inline-flex">
                Create Team <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-slate-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400" />
              Announcements
            </h2>
            <Link href="/dashboard/announcements" className="text-xs text-indigo-500 font-medium">
              All
            </Link>
          </div>
          {announcements.length > 0 ? (
            <div className="space-y-3">
              {announcements.slice(0, 4).map(a => (
                <div key={a.announcementId} className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-start gap-2">
                    <div className={`priority-dot mt-1.5 ${
                      a.priority === 'critical' ? 'bg-red-500' :
                      a.priority === 'high' ? 'bg-orange-500' :
                      a.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <div>
                      <p className="font-semibold text-sm text-slate-700">{a.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{a.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No announcements yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
