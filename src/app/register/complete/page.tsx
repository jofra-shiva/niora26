'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Code2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProfileStep from './steps/ProfileStep';
import TeamStep from './steps/TeamStep';
import MembersStep from './steps/MembersStep';
import ReviewStep from './steps/ReviewStep';
import PaymentStep from './steps/PaymentStep';
import SuccessStep from './steps/SuccessStep';

const STEPS = [
  { num: 1, label: 'Account' },
  { num: 2, label: 'Profile' },
  { num: 3, label: 'Team' },
  { num: 4, label: 'Members' },
  { num: 5, label: 'Review' },
  { num: 6, label: 'Payment' },
  { num: 7, label: 'Complete' },
];

export default function RegisterCompletePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?from=/register/complete');
    }
  }, [user, loading, router]);

  // Resume from correct step based on profile state
  useEffect(() => {
    if (!profile) return;
    if (!profile.profileCompleted) {
      setCurrentStep(2);
    } else {
      setCurrentStep(3); // Will be refined based on team/reg state
    }
  }, [profile]);

  const goNext = () => setCurrentStep(s => Math.min(s + 1, 7));
  const goPrev = () => setCurrentStep(s => Math.max(s - 1, 2));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 bg-radial-indigo pointer-events-none" />
      <div className="absolute inset-0 bg-radial-mint pointer-events-none opacity-50" />

      {/* Header */}
      <header className="glass-card border-b border-white/50 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center bg-[#6a35ff] rounded-lg shadow-sm">
              <span className="font-logo text-lg font-bold text-white">N</span>
            </div>
            <span className="font-logo text-lg text-[#6a35ff]">HackSpark '26</span>
          </div>
          <span className="text-xs text-slate-400">Registration</span>
        </div>
      </header>

      {/* Stepper */}
      <div className="px-4 py-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-none pb-2">
            {STEPS.map((step, i) => {
              const isDone = step.num < currentStep;
              const isCurrent = step.num === currentStep;
              const isUpcoming = step.num > currentStep;

              return (
                <div key={step.num} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isDone
                        ? 'bg-indigo-500 text-white'
                        : isCurrent
                        ? 'bg-white text-indigo-600 shadow-lg ring-2 ring-indigo-500'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span className={`text-[10px] font-semibold hidden sm:block ${
                      isCurrent ? 'text-indigo-600' : isDone ? 'text-slate-500' : 'text-slate-300'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 min-w-[16px] sm:min-w-[24px] rounded-full transition-all duration-500 ${
                      step.num < currentStep ? 'bg-indigo-400' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-4 pb-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 2 && (
                <ProfileStep onNext={() => { goNext(); }} />
              )}
              {currentStep === 3 && (
                <TeamStep onNext={(id) => { setTeamId(id); goNext(); }} onBack={goPrev} />
              )}
              {currentStep === 4 && teamId && (
                <MembersStep teamId={teamId} onNext={goNext} onBack={goPrev} />
              )}
              {currentStep === 5 && teamId && (
                <ReviewStep teamId={teamId} onNext={(regId) => { setRegistrationId(regId); goNext(); }} onBack={goPrev} />
              )}
              {currentStep === 6 && registrationId && (
                <PaymentStep registrationId={registrationId} onNext={goNext} onBack={goPrev} />
              )}
              {currentStep === 7 && registrationId && (
                <SuccessStep registrationId={registrationId} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
