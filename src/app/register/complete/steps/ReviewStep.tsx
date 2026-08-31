'use client';

import { useState, useEffect } from 'react';
import { Users, User, CreditCard, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getTeamById, getTeamMembers, createRegistration, logActivity } from '@/lib/firebase/firestore';
import type { Team, TeamMember } from '@/lib/types';
import toast from 'react-hot-toast';

interface Props {
  teamId: string;
  onNext: (registrationId: string) => void;
  onBack: () => void;
}

export default function ReviewStep({ teamId, onNext, onBack }: Props) {
  const { user, profile } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getTeamById(teamId), getTeamMembers(teamId)])
      .then(([t, m]) => { setTeam(t); setMembers(m); })
      .finally(() => setLoading(false));
  }, [teamId]);

  const handleConfirm = async () => {
    if (!user || !team) return;
    setSubmitting(true);
    try {
      const regId = await createRegistration({
        teamId,
        teamName: team.teamName,
        leaderUid: user.uid,
        leaderName: team.leaderName,
        memberCount: members.length,
        registrationStatus: 'PAYMENT_PENDING',
        paymentStatus: 'PENDING',
        syncStatus: 'PENDING',
        status: 'active',
        createdBy: user.uid,
      });

      await logActivity({
        userId: user.uid,
        teamId,
        teamName: team.teamName,
        registrationId: regId,
        activityType: 'REGISTRATION_STARTED',
        description: 'Registration review confirmed, proceeding to payment',
      });

      toast.success('Review confirmed! Proceeding to payment...');
      onNext(regId);
    } catch {
      toast.error('Failed to confirm. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-8 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <h2 className="font-heading font-bold text-xl text-slate-800 mb-1">Review Your Registration</h2>
      <p className="text-sm text-slate-500 mb-6">Please verify all details before proceeding to payment</p>

      {/* Team Info */}
      <div className="rounded-xl border border-slate-100 overflow-hidden mb-4">
        <div className="bg-indigo-50 px-5 py-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          <p className="font-semibold text-sm text-slate-700">Team Details</p>
        </div>
        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          {[
            ['Team Name', team?.teamName],
            ['Leader', team?.leaderName],
            ['College', team?.collegeName],
            ['Course', team?.course],
            ['Year', team?.year],
            ['City', team?.city],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-slate-400 text-xs">{k}</p>
              <p className="font-medium text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Members */}
      <div className="rounded-xl border border-slate-100 overflow-hidden mb-6">
        <div className="bg-violet-50 px-5 py-3 flex items-center gap-2">
          <User className="w-4 h-4 text-violet-500" />
          <p className="font-semibold text-sm text-slate-700">Team Members ({members.length})</p>
        </div>
        <div className="divide-y divide-slate-50">
          {members.map((m) => (
            <div key={m.memberId} className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-slate-800">{m.fullName}</p>
                <p className="text-xs text-slate-400">{m.email} · {m.collegeName}</p>
              </div>
              <span className={`badge text-[10px] ${m.role === 'LEADER' ? 'badge-primary' : 'badge-neutral'}`}>
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fee notice */}
      <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 mb-6 flex items-center gap-3">
        <CreditCard className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm text-amber-800">Registration Fee</p>
          <p className="text-xs text-amber-600">₹500 per team · You will be redirected to payment on the next step</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={handleConfirm} disabled={submitting} className="btn-primary flex-1">
          {submitting ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Confirming...</>
          ) : (
            <><CheckCircle2 className="w-4 h-4" />Confirm & Pay</>
          )}
        </button>
      </div>
    </div>
  );
}
