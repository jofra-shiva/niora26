'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getRegistrationByTeam, getTeamByLeader } from '@/lib/firebase/firestore';
import type { Registration } from '@/lib/types';
import { CreditCard, CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PAYMENT_STATUS_COLORS } from '@/lib/utils/constants';
import { format } from 'date-fns';

export default function PaymentPage() {
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

  if (loading) return <div className="skeleton h-64 rounded-2xl" />;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-slate-800">Payment</h1>
        <p className="text-sm text-slate-500 mt-1">Registration fee and payment status</p>
      </div>

      {!registration ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <CreditCard className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 mb-4">Complete your registration first</p>
          <Link href="/register/complete" className="btn-primary inline-flex">
            Start Registration <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Payment Status Card */}
          <div className={`glass-card rounded-2xl p-6 border-2 ${
            registration.paymentStatus === 'PAID'
              ? 'border-emerald-200 bg-emerald-50/30'
              : registration.paymentStatus === 'FAILED'
              ? 'border-red-200 bg-red-50/30'
              : 'border-amber-200 bg-amber-50/30'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                registration.paymentStatus === 'PAID'
                  ? 'bg-emerald-100'
                  : registration.paymentStatus === 'FAILED'
                  ? 'bg-red-100'
                  : 'bg-amber-100'
              }`}>
                {registration.paymentStatus === 'PAID'
                  ? <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  : registration.paymentStatus === 'FAILED'
                  ? <AlertCircle className="w-6 h-6 text-red-600" />
                  : <Clock className="w-6 h-6 text-amber-600" />
                }
              </div>
              <div>
                <p className="font-heading font-bold text-xl text-slate-800">
                  {registration.paymentStatus === 'PAID' ? 'Payment Confirmed' :
                   registration.paymentStatus === 'FAILED' ? 'Payment Failed' :
                   'Payment Pending'}
                </p>
                <span className={`badge text-xs ${PAYMENT_STATUS_COLORS[registration.paymentStatus]}`}>
                  {registration.paymentStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-400">Amount</p>
                <p className="font-bold text-slate-800">₹500</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Team</p>
                <p className="font-semibold text-slate-700">{registration.teamName}</p>
              </div>
              {registration.registrationId && (
                <div className="col-span-2">
                  <p className="text-xs text-slate-400">Registration ID</p>
                  <p className="font-mono font-bold text-indigo-600">{registration.registrationId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Retry payment */}
          {registration.paymentStatus !== 'PAID' && (
            <div className="glass-card rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Complete your payment</p>
                <p className="text-xs text-slate-400 mt-0.5">Registration fee: ₹500 per team</p>
              </div>
              <Link href="/register/complete" className="btn-primary flex-shrink-0 text-sm py-2">
                Pay Now
              </Link>
            </div>
          )}

          {registration.paymentStatus === 'PAID' && (
            <div className="glass-card rounded-xl p-5 text-center">
              <p className="text-sm text-slate-600">
                🎉 Your registration is fully confirmed! See you at NIITM on <strong>09 October 2026</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
