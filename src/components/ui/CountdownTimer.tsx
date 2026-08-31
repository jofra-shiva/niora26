'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function CountdownTimer({
  targetDate,
  showLabels = true,
  size = 'lg',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  const eventEnd = new Date('2026-10-10T04:30:00Z');
  const now = Date.now();
  const isLive = now >= targetDate.getTime() && now < eventEnd.getTime();
  const isEnded = now >= eventEnd.getTime();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const sizeClasses = {
    sm: { num: 'text-2xl', label: 'text-[9px]', box: 'w-14 h-16' },
    md: { num: 'text-3xl', label: 'text-[10px]', box: 'w-16 h-20' },
    lg: { 
      num: 'text-3xl sm:text-4xl xl:text-5xl', 
      label: 'text-[10px] sm:text-xs', 
      box: 'w-16 h-20 sm:w-20 sm:h-24 xl:w-24 xl:h-28' 
    },
  }[size];

  if (isLive) {
    return (
      <div className="bg-white border border-emerald-200 shadow-sm rounded-2xl px-8 py-4 inline-flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-emerald-500"
        />
        <span className="font-heading font-bold text-xl text-emerald-700">HackSpark '26 IS LIVE</span>
      </div>
    );
  }

  if (isEnded) {
    return (
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl px-8 py-4 inline-flex items-center gap-3">
        <span className="font-heading font-bold text-xl text-slate-500">HackSpark '26 HAS ENDED</span>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Label removed as requested */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {units.map(({ label, value }, idx) => (
          <div key={label}>
            <div className={`${sizeClasses.box} bg-white border border-slate-200 shadow-sm rounded-xl flex flex-col items-center justify-center relative overflow-hidden`}>
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                style={{ background: 'linear-gradient(90deg, #2563EB, #1D4ED8)' }} />
              <motion.span
                key={value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`${sizeClasses.num} font-heading font-black text-slate-900 tabular-nums`}
              >
                {pad(value)}
              </motion.span>
              {showLabels && (
                <span className={`${sizeClasses.label} font-semibold tracking-widest uppercase text-slate-400 mt-0.5`}>
                  {label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
