'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, User, Phone, School } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile, logActivity } from '@/lib/firebase/firestore';
import { INDIAN_STATES, COURSE_OPTIONS, YEAR_OPTIONS } from '@/lib/utils/constants';
import toast from 'react-hot-toast';

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit number required'),
  collegeName: z.string().min(3),
  course: z.string().min(1),
  branch: z.string().min(2),
  year: z.string().min(1),
  city: z.string().min(2),
  state: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        collegeName: profile.collegeName || '',
        course: profile.course || '',
        branch: profile.branch || '',
        year: profile.year || '',
        city: profile.city || '',
        state: profile.state || '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, { ...data, profileCompleted: true });
      await logActivity({ userId: user.uid, activityType: 'PROFILE_UPDATED', description: 'Profile updated' });
      await refreshProfile();
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-slate-800">My Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Your personal information used across your registration</p>
      </div>

      {/* Avatar */}
      <div className="glass-card rounded-2xl p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
          {(profile?.fullName || 'U').charAt(0)}
        </div>
        <div>
          <p className="font-heading font-bold text-lg text-slate-800">{profile?.fullName || 'Participant'}</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="badge-primary text-[10px]">
              {profile?.profileCompleted ? '✓ Profile Complete' : 'Profile Incomplete'}
            </span>
            <span className="badge-neutral text-[10px]">{profile?.role || 'Participant'}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="form-label">Full Name *</label>
            <input {...register('fullName')} className="input-field" />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="form-label">Mobile Number *</label>
            <input {...register('phone')} className="input-field" maxLength={10} />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <div>
          <label className="form-label">College / Institution *</label>
          <input {...register('collegeName')} className="input-field" />
          {errors.collegeName && <p className="text-xs text-red-500 mt-1">{errors.collegeName.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="form-label">Course *</label>
            <select {...register('course')} className="input-field appearance-none">
              <option value="">Select</option>
              {COURSE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Branch *</label>
            <input {...register('branch')} className="input-field" />
          </div>
          <div>
            <label className="form-label">Year *</label>
            <select {...register('year')} className="input-field appearance-none">
              <option value="">Select</option>
              {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="form-label">City *</label>
            <input {...register('city')} className="input-field" />
          </div>
          <div>
            <label className="form-label">State *</label>
            <select {...register('state')} className="input-field appearance-none">
              <option value="">Select</option>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving || !isDirty} className="btn-primary px-6 py-2.5">
            {saving ? (
              <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
            ) : (
              <><Save className="w-4 h-4" />Save Changes</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
