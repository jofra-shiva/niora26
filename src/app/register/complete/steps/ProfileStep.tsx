'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, School, BookOpen, GraduationCap, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile, logActivity } from '@/lib/firebase/firestore';
import { INDIAN_STATES, COURSE_OPTIONS, YEAR_OPTIONS } from '@/lib/utils/constants';
import toast from 'react-hot-toast';
import { useState } from 'react';

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  collegeName: z.string().min(3, 'Required'),
  course: z.string().min(1, 'Required'),
  branch: z.string().min(2, 'Required'),
  year: z.string().min(1, 'Required'),
  city: z.string().min(2, 'Required'),
  state: z.string().min(1, 'Required'),
});
type FormData = z.infer<typeof schema>;

interface Props { onNext: () => void; }

export default function ProfileStep({ onNext }: Props) {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: profile?.fullName || user?.displayName || '',
      phone: profile?.phone || '',
      collegeName: profile?.collegeName || '',
      course: profile?.course || '',
      branch: profile?.branch || '',
      year: profile?.year || '',
      city: profile?.city || '',
      state: profile?.state || '',
    },
  });

  // Pre-fill from profile
  useEffect(() => {
    if (profile) {
      if (profile.fullName) setValue('fullName', profile.fullName);
      if (profile.phone) setValue('phone', profile.phone);
      if (profile.collegeName) setValue('collegeName', profile.collegeName);
      if (profile.course) setValue('course', profile.course);
      if (profile.branch) setValue('branch', profile.branch);
      if (profile.year) setValue('year', profile.year);
      if (profile.city) setValue('city', profile.city);
      if (profile.state) setValue('state', profile.state);
    }
  }, [profile, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.uid, { ...data, profileCompleted: true });
      await logActivity({
        userId: user.uid,
        userName: data.fullName,
        activityType: profile?.profileCompleted ? 'PROFILE_UPDATED' : 'PROFILE_CREATED',
        description: profile?.profileCompleted ? 'Profile updated' : 'Profile completed',
      });
      await refreshProfile();
      toast.success('Profile saved!');
      onNext();
    } catch {
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <h2 className="font-heading font-bold text-xl text-slate-800 mb-1">Your Profile</h2>
      <p className="text-sm text-slate-500 mb-6">This information will be used across your registration. Fill it once.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name *" error={errors.fullName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input {...register('fullName')} className="input-field pl-10" placeholder="Your full name" />
            </div>
          </Field>
          <Field label="Mobile Number *" error={errors.phone?.message}>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input {...register('phone')} className="input-field pl-10" placeholder="10-digit mobile number" maxLength={10} />
            </div>
          </Field>
        </div>

        <Field label="College / Institution *" error={errors.collegeName?.message}>
          <div className="relative">
            <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input {...register('collegeName')} className="input-field pl-10" placeholder="Your college name" />
          </div>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="Course *" error={errors.course?.message}>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select {...register('course')} className="input-field pl-10 appearance-none">
                <option value="">Select course</option>
                {COURSE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </Field>
          <Field label="Branch / Specialization *" error={errors.branch?.message}>
            <input {...register('branch')} className="input-field" placeholder="e.g. Computer Science" />
          </Field>
          <Field label="Year of Study *" error={errors.year?.message}>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select {...register('year')} className="input-field pl-10 appearance-none">
                <option value="">Select year</option>
                {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="City *" error={errors.city?.message}>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input {...register('city')} className="input-field pl-10" placeholder="Your city" />
            </div>
          </Field>
          <Field label="State *" error={errors.state?.message}>
            <select {...register('state')} className="input-field appearance-none">
              <option value="">Select state</option>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={loading} className="btn-primary px-8 py-3">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
            ) : (
              <>Save & Continue <span className="ml-1">→</span></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
