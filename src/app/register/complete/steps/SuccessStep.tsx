'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, LayoutDashboard, Share2 } from 'lucide-react';
import { getRegistrationByTeam } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Props { registrationId: string; }

export default function SuccessStep({ registrationId }: Props) {
  const [registration, setRegistration] = useState<{ registrationId: string; paymentStatus: string; createdAt: any } | null>(null);

  useEffect(() => {
    // This would fetch from Firestore — for now use the passed ID
    setRegistration({
      registrationId: registrationId.startsWith('HACKSPARK')
        ? registrationId
        : `hackspark26-REG-${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
      paymentStatus: 'PAID',
      createdAt: new Date(),
    });
  }, [registrationId]);

  const copyId = () => {
    navigator.clipboard.writeText(registration?.registrationId || '');
    toast.success('Registration ID copied!');
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-10 text-center">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0.4 }}
        className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-800 mb-2">
          You're In! 🎉
        </h1>
        <p className="text-slate-500 mb-8">
          Welcome to <span className="font-semibold text-indigo-600">HackSpark '26</span>. Your registration is confirmed!
        </p>

        {/* Registration details */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Registration ID</p>
            <div className="flex items-center gap-2">
              <p className="font-mono font-bold text-lg text-indigo-600">{registration?.registrationId}</p>
              <button onClick={copyId} className="btn-ghost p-1.5" title="Copy ID">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Payment Status</p>
              <span className="badge-success">{registration?.paymentStatus || 'PAID'}</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Event Date</p>
              <p className="font-semibold text-slate-700 text-sm">09–10 October 2026</p>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="text-left bg-indigo-50 rounded-xl p-5 mb-8">
          <p className="font-semibold text-slate-700 mb-3">What's Next?</p>
          <ul className="space-y-2">
            {[
              'Check your email for a confirmation message',
              'Visit your dashboard to select a problem statement',
              'Prepare your team and ideate before the event',
              'Arrive at NIITM Campus by 09:00 AM on 09 October 2026',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard" className="btn-primary flex-1 py-3 justify-center">
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => {
              const text = `I just registered for HackSpark '26 - The 24H Hackathon! 🚀 Join me at NIITM on 09-10 Oct 2026. Registration ID: ${registration?.registrationId}`;
              if (navigator.share) {
                navigator.share({ title: "HackSpark '26", text, url: window.location.origin });
              } else {
                navigator.clipboard.writeText(text);
                toast.success('Share text copied!');
              }
            }}
            className="btn-secondary flex-1 py-3"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </motion.div>
    </div>
  );
}
