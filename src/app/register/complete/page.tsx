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
      <div className="min-h-screen flex items-center justify-center bg-[#050914] text-white">
        <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-[#00F0FF] rounded-full animate-spin shadow-[0_0_15px_#00F0FF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-[#050914] text-white overflow-hidden">
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.12),transparent_65%),radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)]" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <header className="bg-[#070D22]/85 backdrop-blur-2xl border-b border-blue-500/30 px-4 py-3 sticky top-0 z-20 shadow-[0_5px_20px_rgba(0,0,0,0.7)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/50 p-0.5 bg-white shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              <Image src="/logoo.png" alt="HackSpark Logo" width={30} height={30} className="object-cover rounded-full" />
            </div>
            <span className="font-heading font-black text-lg text-white">HackSpark <span className="text-[#00F0FF]">'26</span></span>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">Registration Portal</span>
        </div>
      </header>

      {/* Stepper */}
      <div className="px-4 py-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-none pb-2">
            {STEPS.map((step, i) => {
              const isDone = step.num < currentStep;
              const isCurrent = step.num === currentStep;

              return (
                <div key={step.num} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                      isDone
                        ? 'bg-[#2563EB] text-white shadow-[0_0_10px_rgba(37,99,235,0.6)]'
                        : isCurrent
                        ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_#00F0FF] ring-2 ring-cyan-300 font-black'
                        : 'bg-blue-950/60 text-slate-400 border border-blue-500/20'
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span className={`text-[10px] font-bold hidden sm:block ${
                      isCurrent ? 'text-[#00F0FF]' : isDone ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 min-w-[16px] sm:min-w-[24px] rounded-full transition-all duration-500 ${
                      step.num < currentStep ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-blue-950/60'
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
        <div className="max-w-4xl mx-auto">
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
