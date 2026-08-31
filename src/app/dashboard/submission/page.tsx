'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  getTeamByLeader, getSubmissionByTeam, upsertSubmission,
  getEventSettings, logActivity,
} from '@/lib/firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, FileText, Code, Globe, Presentation } from 'lucide-react';
import { SUBMISSION_STATUS_COLORS } from '@/lib/utils/constants';
import type { ProjectSubmission } from '@/lib/types';
import toast from 'react-hot-toast';

const schema = z.object({
  projectName: z.string().min(3, 'Required'),
  problemStatement: z.string().min(5, 'Required'),
  description: z.string().min(50, 'Please provide at least 50 characters'),
  techStack: z.string().min(2, 'Required'),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  demoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  presentationUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});
type FormData = z.infer<typeof schema>;

export default function SubmissionPage() {
  const { user, profile } = useAuth();
  const [teamId, setTeamId] = useState<string | null>(null);
  const [submission, setSubmission] = useState<ProjectSubmission | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const team = await getTeamByLeader(user.uid);
      if (team) {
        setTeamId(team.teamId);
        const sub = await getSubmissionByTeam(team.teamId);
        setSubmission(sub);
        if (sub) {
          reset({
            projectName: sub.projectName,
            problemStatement: sub.problemStatement,
            description: sub.description,
            techStack: sub.techStack?.join(', ') || '',
            githubUrl: sub.githubUrl || '',
            demoUrl: sub.demoUrl || '',
            presentationUrl: sub.presentationUrl || '',
          });
        }
      }

      const settings = await getEventSettings();
      if (settings?.submissionDeadline) {
        const deadline = settings.submissionDeadline.toDate?.() || new Date(settings.submissionDeadline as unknown as string);
        setDeadlinePassed(new Date() > deadline);
      }

      setLoading(false);
    };
    load();
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    if (!user || !teamId) return;
    if (deadlinePassed) {
      toast.error('Submission deadline has passed');
      return;
    }

    setSaving(true);
    try {
      const team = await getTeamByLeader(user.uid);
      const isNew = !submission;

      await upsertSubmission(teamId, {
        teamName: team?.teamName || '',
        projectName: data.projectName,
        problemStatement: data.problemStatement,
        description: data.description,
        techStack: data.techStack.split(',').map(t => t.trim()).filter(Boolean),
        githubUrl: data.githubUrl || undefined,
        demoUrl: data.demoUrl || undefined,
        presentationUrl: data.presentationUrl || undefined,
        submissionStatus: 'DRAFT',
        createdBy: user.uid,
      });

      await logActivity({
        userId: user.uid,
        userName: profile?.fullName,
        teamId,
        activityType: isNew ? 'SUBMISSION_STARTED' : 'SUBMISSION_UPDATED',
        description: isNew ? 'Submission started' : 'Submission updated',
      });

      toast.success(isNew ? 'Submission created!' : 'Submission updated!');
    } catch {
      toast.error('Failed to save submission');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="skeleton h-96 rounded-2xl" />;
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Project Submission</h1>
          <p className="text-sm text-slate-500 mt-1">Submit your hackathon project</p>
        </div>
        {submission && (
          <span className={`badge text-xs ${SUBMISSION_STATUS_COLORS[submission.submissionStatus]}`}>
            {submission.submissionStatus}
          </span>
        )}
      </div>

      {!teamId ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500">You need a team to submit a project</p>
        </div>
      ) : deadlinePassed && submission?.submissionStatus !== 'SUBMITTED' ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-red-500 font-semibold">Submission deadline has passed</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl p-6 space-y-5">
          <div>
            <label className="form-label">Project Name *</label>
            <input {...register('projectName')} className="input-field" placeholder="Your awesome project" />
            {errors.projectName && <p className="text-xs text-red-500 mt-1">{errors.projectName.message}</p>}
          </div>

          <div>
            <label className="form-label">Problem Statement / Theme *</label>
            <input {...register('problemStatement')} className="input-field" placeholder="Which problem are you solving?" />
            {errors.problemStatement && <p className="text-xs text-red-500 mt-1">{errors.problemStatement.message}</p>}
          </div>

          <div>
            <label className="form-label">Project Description *</label>
            <textarea
              {...register('description')}
              rows={5}
              className="input-field resize-none"
              placeholder="Describe your project, its features, and how it works..."
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="form-label">Tech Stack * (comma-separated)</label>
            <input {...register('techStack')} className="input-field" placeholder="React, Node.js, Python, Firebase..." />
            {errors.techStack && <p className="text-xs text-red-500 mt-1">{errors.techStack.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label flex items-center gap-1"><Code className="w-3 h-3" />GitHub URL</label>
              <input {...register('githubUrl')} className="input-field" placeholder="https://github.com/..." />
              {errors.githubUrl && <p className="text-xs text-red-500 mt-1">{errors.githubUrl.message}</p>}
            </div>
            <div>
              <label className="form-label flex items-center gap-1"><Globe className="w-3 h-3" />Demo URL</label>
              <input {...register('demoUrl')} className="input-field" placeholder="https://your-demo.com" />
              {errors.demoUrl && <p className="text-xs text-red-500 mt-1">{errors.demoUrl.message}</p>}
            </div>
          </div>

          <div>
            <label className="form-label">Presentation URL</label>
            <input {...register('presentationUrl')} className="input-field" placeholder="https://docs.google.com/..." />
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={saving || !isDirty} className="btn-primary px-6 py-2.5">
              {saving ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
              ) : (
                <><Save className="w-4 h-4" />{submission ? 'Update' : 'Save'} Submission</>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
