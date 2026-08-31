'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trash2, Crown, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getTeamMembers, addTeamMember, removeTeamMember, getTeamById, logActivity,
} from '@/lib/firebase/firestore';
import { INDIAN_STATES, COURSE_OPTIONS, YEAR_OPTIONS } from '@/lib/utils/constants';
import type { TeamMember } from '@/lib/types';
import toast from 'react-hot-toast';

interface MemberForm {
  fullName: string; email: string; phone: string;
  collegeName: string; course: string; branch: string;
  year: string; city: string; state: string;
}

const emptyMember = (): MemberForm => ({
  fullName: '', email: '', phone: '',
  collegeName: '', course: '', branch: '',
  year: '', city: '', state: '',
});

interface Props {
  teamId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function MembersStep({ teamId, onNext, onBack }: Props) {
  const { user, profile } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState<MemberForm>(emptyMember());
  const [addingMember, setAddingMember] = useState(false);
  const [maxSize, setMaxSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    Promise.all([
      getTeamMembers(teamId),
    ]).then(([mems]) => {
      setMembers(mems);
    }).finally(() => setLoading(false));
  }, [teamId]);

  const handleAddMember = async () => {
    if (!user || !profile) return;
    if (!newMember.fullName || !newMember.email || !newMember.phone) {
      toast.error('Please fill in name, email, and phone');
      return;
    }
    if (members.length >= maxSize) {
      toast.error(`Maximum ${maxSize} members allowed`);
      return;
    }

    setAddingMember(true);
    try {
      const team = await getTeamById(teamId);
      const memberId = await addTeamMember({
        ...newMember,
        teamId,
        teamName: team?.teamName || '',
        role: 'MEMBER',
        status: 'active',
        syncStatus: 'PENDING',
        createdBy: user.uid,
      });

      await logActivity({
        userId: user.uid,
        userName: profile.fullName,
        teamId,
        teamName: team?.teamName,
        activityType: 'MEMBER_ADDED',
        description: `${newMember.fullName} added to team`,
        metadata: { memberEmail: newMember.email },
      });

      setMembers(prev => [...prev, { ...newMember, memberId, teamId, teamName: team?.teamName || '', role: 'MEMBER', status: 'active', syncStatus: 'PENDING', createdAt: {} as any, updatedAt: {} as any, createdBy: user.uid }]);
      setNewMember(emptyMember());
      setShowAddForm(false);
      toast.success(`${newMember.fullName} added!`);
    } catch {
      toast.error('Failed to add member');
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemove = async (memberId: string, name: string) => {
    if (!user) return;
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

  const canProceed = members.length >= 2;

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-8 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-xl text-slate-800">Team Members</h2>
          <p className="text-sm text-slate-500">Min 2 · Max {maxSize} members</p>
        </div>
        <div className="badge-primary">{members.length}/{maxSize}</div>
      </div>

      {/* Members list */}
      <div className="space-y-3 mb-6">
        {members.map((m) => (
          <motion.div
            key={m.memberId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.role === 'LEADER' ? 'bg-indigo-100' : 'bg-slate-100'
            }`}>
              {m.role === 'LEADER'
                ? <Crown className="w-4 h-4 text-indigo-600" />
                : <User className="w-4 h-4 text-slate-500" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-sm truncate">{m.fullName}</p>
              <p className="text-xs text-slate-400 truncate">{m.email} · {m.collegeName}</p>
            </div>
            <span className={`badge text-[10px] px-2 flex-shrink-0 ${
              m.role === 'LEADER' ? 'badge-primary' : 'badge-neutral'
            }`}>
              {m.role}
            </span>
            {m.role !== 'LEADER' && (
              <button
                onClick={() => handleRemove(m.memberId, m.fullName)}
                className="btn-ghost p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add member form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-indigo-100 rounded-xl p-5 mb-4 bg-indigo-50/30"
          >
            <p className="font-semibold text-slate-700 text-sm mb-4">Add New Member</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'fullName', label: 'Full Name *', placeholder: 'Member name' },
                { key: 'email', label: 'Email *', placeholder: 'member@email.com' },
                { key: 'phone', label: 'Phone *', placeholder: '10-digit number' },
                { key: 'collegeName', label: 'College', placeholder: 'College name' },
                { key: 'branch', label: 'Branch', placeholder: 'Branch / Specialization' },
                { key: 'city', label: 'City', placeholder: 'City' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="form-label">{label}</label>
                  <input
                    value={(newMember as unknown as Record<string, string>)[key]}
                    onChange={e => setNewMember(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="input-field text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="form-label">Course</label>
                <select
                  value={newMember.course}
                  onChange={e => setNewMember(prev => ({ ...prev, course: e.target.value }))}
                  className="input-field text-sm appearance-none"
                >
                  <option value="">Select</option>
                  {COURSE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Year</label>
                <select
                  value={newMember.year}
                  onChange={e => setNewMember(prev => ({ ...prev, year: e.target.value }))}
                  className="input-field text-sm appearance-none"
                >
                  <option value="">Select</option>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">State</label>
                <select
                  value={newMember.state}
                  onChange={e => setNewMember(prev => ({ ...prev, state: e.target.value }))}
                  className="input-field text-sm appearance-none"
                >
                  <option value="">Select</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowAddForm(false)} className="btn-secondary flex-1 text-sm py-2">
                Cancel
              </button>
              <button onClick={handleAddMember} disabled={addingMember} className="btn-primary flex-1 text-sm py-2">
                {addingMember ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Add Member'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add member button */}
      {!showAddForm && members.length < maxSize && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl text-sm font-semibold text-indigo-500 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2 mb-6"
        >
          <UserPlus className="w-4 h-4" />
          Add Team Member
        </button>
      )}

      {!canProceed && (
        <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-4">
          ⚠ Add at least 1 more member to proceed (minimum 2 required)
        </p>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} disabled={!canProceed} className="btn-primary flex-1">
          Continue →
        </button>
      </div>
    </div>
  );
}
