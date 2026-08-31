'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getTeamByLeader, getTeamMembers, getRegistrationByTeam, logActivity } from '@/lib/firebase/firestore';
import { removeTeamMember } from '@/lib/firebase/firestore';
import type { Team, TeamMember, Registration } from '@/lib/types';
import { Crown, User, Trash2, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function TeamPage() {
  const { user, profile } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const t = await getTeamByLeader(user.uid);
      if (t) {
        const [mems, reg] = await Promise.all([
          getTeamMembers(t.teamId),
          getRegistrationByTeam(t.teamId),
        ]);
        setTeam(t);
        setMembers(mems);
        setRegistration(reg);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const handleRemove = async (memberId: string, name: string, teamId: string) => {
    if (!user) return;
    if (registration?.paymentStatus === 'PAID') {
      toast.error("Cannot remove members after payment is confirmed.");
      return;
    }
    try {
      await removeTeamMember(memberId, teamId);
      await logActivity({
        userId: user.uid,
        teamId,
        activityType: 'MEMBER_REMOVED',
        description: `${name} removed from team`,
      });
      setMembers(prev => prev.filter(m => m.memberId !== memberId));
      toast.success(`${name} removed`);
    } catch {
      toast.error('Failed to remove member');
    }
  };

  if (loading) return <div className="skeleton h-96 rounded-2xl" />;

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">My Team</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your hackathon team</p>
        </div>
        {team && (
          <span className="badge-primary">{members.length} member{members.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {!team ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 mb-4">You haven't created a team yet</p>
          <Link href="/register/complete" className="btn-primary inline-flex">
            Create Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* Team info */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Team Name</p>
                <h2 className="font-heading font-black text-2xl gradient-text">{team.teamName}</h2>
              </div>
              {registration && (
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1">Registration</p>
                  <span className="badge-primary text-[10px]">{registration.registrationStatus}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {[
                ['College', team.collegeName],
                ['Course', team.course],
                ['Year', team.year],
                ['City', team.city],
                ['State', team.state],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-slate-400">{k}</p>
                  <p className="font-medium text-slate-700">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading font-semibold text-slate-800">Team Members</h3>
              {registration?.paymentStatus !== 'PAID' && (
                <Link href="/register/complete" className="btn-ghost text-xs">
                  + Add Member
                </Link>
              )}
            </div>
            <div className="divide-y divide-slate-50">
              {members.map(m => (
                <div key={m.memberId} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: m.role === 'LEADER' ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#94A3B8' }}>
                    {m.fullName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800 text-sm">{m.fullName}</p>
                      {m.role === 'LEADER' && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                    </div>
                    <p className="text-xs text-slate-400">{m.email} · {m.collegeName}</p>
                  </div>
                  <span className={`badge text-[10px] ${m.role === 'LEADER' ? 'badge-primary' : 'badge-neutral'}`}>
                    {m.role}
                  </span>
                  {m.role !== 'LEADER' && registration?.paymentStatus !== 'PAID' && (
                    <button
                      onClick={() => handleRemove(m.memberId, m.fullName, team.teamId)}
                      className="btn-ghost p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
