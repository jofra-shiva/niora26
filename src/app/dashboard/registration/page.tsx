'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getRegistrationByTeam, getTeamByLeader } from '@/lib/firebase/firestore';
import type { Registration } from '@/lib/types';
import { ClipboardList, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PAYMENT_STATUS_COLORS } from '@/lib/utils/constants';
import { format } from 'date-fns';

export default function RegistrationPage() {
  const { user } = useAuth();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getTeamByLeader(user.uid).then(t => {
      if (t) return getRegistrationByTeam(t.teamId);
      return null;
    }).then(reg => {
      setRegistration(reg);
      setLoading(false);
    });
  }, [user]);

  const STATUS_STEPS = [
    { key: 'ACCOUNT_CREATED', label: 'Account Created' },
    { key: 'PROFILE_COMPLETE', label: 'Profile Complete' },
    { key: 'TEAM_CREATED', label: 'Team Created' },
    { key: 'MEMBERS_ADDED', label: 'Members Added' },
    { key: 'REVIEW_COMPLETE', label: 'Reviewed' },
    { key: 'PAYMENT_PENDING', label: 'Payment' },
    { key: 'COMPLETE', label: 'Complete' },
  ];

  const STATUS_ORDER = STATUS_STEPS.map(s => s.key);

  const currentStatusIdx = registration
    ? STATUS_ORDER.indexOf(registration.registrationStatus)
    : -1;

  if (loading) return <div className="skeleton h-96 rounded-2xl" />;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-slate-800">Registration</h1>
        <p className="text-sm text-slate-500 mt-1">Your HackSpark '26 registration status</p>
      </div>

      {!registration ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <ClipboardList className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 mb-4">Registration not started</p>
          <Link href="/register/complete" className="btn-primary inline-flex">
            Start Registration <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* Registration ID card */}
          <div className="glass-card rounded-2xl p-6 mb-6"
            style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.04), rgba(124,58,237,0.04))' }}>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Registration ID</p>
            <p className="font-mono font-bold text-xl text-indigo-600 mb-4">
              {registration.registrationId || 'Pending Generation'}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-400">Payment Status</p>
                <span className={`badge mt-1 ${PAYMENT_STATUS_COLORS[registration.paymentStatus]}`}>
                  {registration.paymentStatus}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400">Team</p>
                <p className="font-semibold text-slate-700">{registration.teamName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Members</p>
                <p className="font-semibold text-slate-700">{registration.memberCount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Registered</p>
                <p className="font-semibold text-slate-700 text-xs">
                  {registration.createdAt?.toDate
                    ? format(registration.createdAt.toDate(), 'dd MMM yyyy')
                    : 'Just now'}
                </p>
              </div>
            </div>
          </div>

          {/* Progress stepper */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-slate-800 mb-5">Registration Progress</h3>
            <div className="space-y-3">
              {STATUS_STEPS.map((step, i) => {
                const isDone = i <= currentStatusIdx;
                const isCurrent = i === currentStatusIdx;
                return (
                  <div key={step.key} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDone ? 'bg-indigo-500' : 'bg-slate-100'
                    }`}>
                      {isDone
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <Clock className="w-3.5 h-3.5 text-slate-400" />
                      }
                    </div>
                    <span className={`text-sm font-medium ${
                      isDone ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {step.label}
                      {isCurrent && <span className="ml-2 badge-primary text-[10px]">Current</span>}
                    </span>
                  </div>
                );
              })}
            </div>

            {registration.paymentStatus !== 'PAID' && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link href="/register/complete" className="btn-primary w-full justify-center py-2.5">
                  Continue Registration <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
