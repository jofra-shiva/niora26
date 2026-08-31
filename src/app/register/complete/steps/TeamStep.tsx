'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  createTeam, getTeamByLeader, addTeamMember, logActivity,
} from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';

const schema = z.object({
  teamName: z.string().min(3, 'Team name must be at least 3 characters').max(40, 'Team name is too long'),
});
type FormData = z.infer<typeof schema>;

interface Props {
  onNext: (teamId: string) => void;
  onBack: () => void;
}

export default function TeamStep({ onNext, onBack }: Props) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [existingTeam, setExistingTeam] = useState<{ teamId: string; teamName: string } | null>(null);
  const [checking, setChecking] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!user) return;
    getTeamByLeader(user.uid)
      .then(team => {
        if (team) setExistingTeam({ teamId: team.teamId, teamName: team.teamName });
      })
      .finally(() => setChecking(false));
  }, [user]);

  const onSubmit = async (data: FormData) => {
    if (!user || !profile) return;
    setLoading(true);
    try {
      const teamId = await createTeam({
        teamName: data.teamName,
        leaderUid: user.uid,
        leaderName: profile.fullName,
        leaderEmail: profile.email,
        leaderPhone: profile.phone,
        collegeName: profile.collegeName,
        course: profile.course,
        branch: profile.branch,
        year: profile.year,
        city: profile.city,
        state: profile.state,
        memberCount: 1,
        status: 'incomplete',
        syncStatus: 'PENDING',
        createdBy: user.uid,
      });

      // Add leader as first member
      await addTeamMember({
        teamId,
        teamName: data.teamName,
        uid: user.uid,
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        collegeName: profile.collegeName,
        course: profile.course,
        branch: profile.branch,
        year: profile.year,
        city: profile.city,
        state: profile.state,
        role: 'LEADER',
        status: 'active',
        syncStatus: 'PENDING',
        createdBy: user.uid,
      });

      await logActivity({
        userId: user.uid,
        userName: profile.fullName,
        teamId,
        teamName: data.teamName,
        activityType: 'TEAM_CREATED',
        description: `Team "${data.teamName}" created`,
      });

      toast.success(`Team "${data.teamName}" created!`);
      onNext(teamId);
    } catch {
      toast.error('Failed to create team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="glass-card rounded-2xl p-8 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (existingTeam) {
    return (
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-800">Existing Team Found</h2>
            <p className="text-sm text-slate-500">You already have a team</p>
          </div>
        </div>
        <div className="bg-indigo-50 rounded-xl p-5 mb-6">
          <p className="text-sm text-slate-500 mb-1">Team Name</p>
          <p className="font-heading font-bold text-xl text-indigo-700">{existingTeam.teamName}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
          <button onClick={() => onNext(existingTeam.teamId)} className="btn-primary flex-1">
            Continue with this team →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
          <Users className="w-5 h-5 text-indigo-500" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-slate-800">Create Your Team</h2>
          <p className="text-sm text-slate-500">You will be the Team Leader</p>
        </div>
      </div>

      {/* Leader info auto-filled */}
      {profile && (
        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Team Leader (You)</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Name', profile.fullName],
              ['Email', profile.email],
              ['Phone', profile.phone],
              ['College', profile.collegeName],
              ['Course', profile.course],
              ['Year', profile.year],
            ].map(([k, v]) => (
              <div key={k}>
                <span className="text-slate-400 text-xs">{k}: </span>
                <span className="text-slate-700 font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="form-label">Team Name *</label>
          <input
            {...register('teamName')}
            className="input-field"
            placeholder="e.g. Code Warriors, Tech Titans..."
          />
          {errors.teamName && <p className="text-xs text-red-500 mt-1">{errors.teamName.message}</p>}
          <p className="text-xs text-slate-400 mt-1">Choose a creative team name (3–40 characters)</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="btn-secondary flex-1">← Back</button>
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</>
            ) : (
              <>Create Team →</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
