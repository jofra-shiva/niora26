'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Timer, Hourglass, ArrowRight, Download, FileText, Presentation } from 'lucide-react';
import { EVENT_START_DATE, GOOGLE_FORM_URL } from '@/lib/utils/constants';

/* -- 4 Dark Cyber Glass Cards Countdown -- */
function CountdownCards() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const target = new Date(EVENT_START_DATE).getTime();
    const tick = () => {
      const dist = target - Date.now();
      if (dist <= 0) { setDone(true); setTimeLeft(null); }
      else setTimeLeft({
        days: Math.floor(dist / 864e5),
        hours: Math.floor((dist % 864e5) / 36e5),
        minutes: Math.floor((dist % 36e5) / 6e4),
        seconds: Math.floor((dist % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (done) return null;

  const daysStr = timeLeft ? timeLeft.days.toString().padStart(2, '0') : '28';
  const hoursStr = timeLeft ? timeLeft.hours.toString().padStart(2, '0') : '17';
  const minsStr = timeLeft ? timeLeft.minutes.toString().padStart(2, '0') : '55';
  const secsStr = timeLeft ? timeLeft.seconds.toString().padStart(2, '0') : '17';

  const units = [
    { label: 'DAYS', value: daysStr, icon: Calendar, color: 'text-[#00F0FF]', border: 'border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.15)]' },
    { label: 'HOURS', value: hoursStr, icon: Clock, color: 'text-[#3B82F6]', border: 'border-[#3B82F6]/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' },
    { label: 'MINS', value: minsStr, icon: Timer, color: 'text-[#00F0FF]', border: 'border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.15)]' },
    { label: 'SECS', value: secsStr, icon: Hourglass, color: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]' },
  ];

  return (
    <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3 w-full max-w-lg mx-auto my-2 px-1">
      {units.map((u) => {
        const Icon = u.icon;
        return (
          <motion.div
            key={u.label}
            whileHover={{ y: -2, scale: 1.02 }}
            className={`flex flex-col items-center justify-center py-1.5 xs:py-2 sm:py-2.5 px-1 xs:px-2 rounded-lg sm:rounded-xl bg-[#070D22]/85 ${u.border} backdrop-blur-2xl transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Top Glowing Icon */}
            <div className="mb-0.5">
              <Icon className={`w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 ${u.color} drop-shadow-[0_0_6px_currentColor]`} />
            </div>

            {/* Label */}
            <span className="text-[8px] xs:text-[9px] font-bold text-slate-400 tracking-[0.1em] sm:tracking-[0.18em] uppercase mb-0.5">
              {u.label}
            </span>

            {/* Value Number */}
            <span className="font-heading font-black text-base xs:text-lg sm:text-2xl text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              {u.value}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -- Floating Code Bits & Binary Symbols Background Animation -- */
function FloatingCodeBits() {
  const codeItems = [
    { text: '01011', top: '15%', left: '8%', duration: 7, delay: 0, color: 'text-cyan-400/35' },
    { text: '</>', top: '28%', left: '18%', duration: 6, delay: 1, color: 'text-purple-400/40' },
    { text: '{ ... }', top: '70%', left: '12%', duration: 8, delay: 0.5, color: 'text-blue-400/35' },
    { text: 'AI', top: '82%', left: '22%', duration: 6.5, delay: 2, color: 'text-cyan-300/30' },
    { text: 'fn() =>', top: '20%', right: '12%', duration: 7.5, delay: 1.5, color: 'text-purple-300/35' },
    { text: 'HACK', top: '65%', right: '16%', duration: 8.5, delay: 0.8, color: 'text-cyan-400/30' },
    { text: '01001', top: '35%', right: '8%', duration: 9, delay: 2.2, color: 'text-blue-300/35' },
    { text: '1010', top: '85%', right: '25%', duration: 7, delay: 1.2, color: 'text-pink-400/30' },
    { text: '<code/>', top: '48%', left: '6%', duration: 6.8, delay: 2.5, color: 'text-cyan-400/35' },
    { text: 'import AI', top: '52%', right: '5%', duration: 7.8, delay: 1.8, color: 'text-indigo-400/35' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {codeItems.map((item, i) => (
        <motion.span
          key={i}
          initial={{ y: 0, opacity: 0.2 }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.45, 0.2],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          className={`absolute font-mono font-bold text-xs sm:text-sm tracking-wider select-none backdrop-blur-[1px] drop-shadow-[0_0_8px_currentColor] ${item.color}`}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050914] text-white min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4">
      
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.18),transparent_65%),radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_55%)]" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Code Bits & Binary Symbols Background Animation */}
      <FloatingCodeBits />

      {/* Bottom Left: Circuit Lightbulb Icon */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          scale: { duration: 0.8 },
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="hidden lg:flex absolute bottom-28 left-32 xl:bottom-36 xl:left-48 pointer-events-none z-10"
      >
        {/* Circuit bulb SVG — subtle blink/flicker */}
        <motion.svg
          width="160" height="186" viewBox="0 0 38 44" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_30px_rgba(251,191,36,0.95)]"
          animate={{ opacity: [1, 0.55, 1, 0.75, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.15, 0.3, 0.6, 1] }}
        >
            {/* Bulb outline */}
            <path d="M19 2C10.716 2 4 8.716 4 17c0 5.2 2.6 9.8 6.5 12.6V33h17v-3.4C31.4 26.8 34 22.2 34 17c0-8.284-6.716-15-15-15z" stroke="#3B82F6" strokeWidth="1.5" fill="rgba(59,130,246,0.08)"/>
            {/* Base rings */}
            <rect x="11" y="34" width="16" height="2.5" rx="1.25" fill="#3B82F6" opacity="0.7"/>
            <rect x="12.5" y="37.5" width="13" height="2" rx="1" fill="#3B82F6" opacity="0.5"/>
            <rect x="14" y="40.5" width="10" height="2" rx="1" fill="#3B82F6" opacity="0.3"/>
            {/* Circuit filament */}
            <line x1="19" y1="29" x2="19" y2="22" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="19" y1="22" x2="13" y2="16" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="19" y1="22" x2="25" y2="16" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="19" y1="22" x2="19" y2="14" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Circuit nodes */}
            <circle cx="19" cy="29" r="2" fill="#FBBF24" opacity="0.9"/>
            <circle cx="13" cy="16" r="1.5" fill="#FBBF24" opacity="0.8"/>
            <circle cx="25" cy="16" r="1.5" fill="#FBBF24" opacity="0.8"/>
            <circle cx="19" cy="14" r="1.5" fill="#FBBF24" opacity="0.8"/>
            {/* Glow rays */}
            <line x1="19" y1="4" x2="19" y2="1" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            <line x1="30" y1="8" x2="32.5" y2="5.5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            <line x1="8" y1="8" x2="5.5" y2="5.5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            <line x1="34" y1="17" x2="37" y2="17" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            <line x1="4" y1="17" x2="1" y2="17" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        </motion.svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 0.9, y: [0, -10, 0], scale: 1 }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          scale: { duration: 0.8 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="hidden lg:block absolute bottom-2 right-2 xl:bottom-6 xl:right-8 pointer-events-none z-10 w-72 sm:w-80 md:w-96 lg:w-[400px] xl:w-[480px] h-64 sm:h-72 lg:h-80 xl:h-96"
      >
        {/* Neon Glow Aura Behind Laptop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,240,255,0.25),transparent_70%)] blur-2xl pointer-events-none" />

        <div className="relative w-full h-full">
          <Image
            src="/laptop.png"
            alt="HackSpark Coding Laptop"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-contain drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]"
            priority
          />
        </div>
      </motion.div>

      {/* ---- Main Screen Contents ---- */}
      <div className="relative z-10 w-full max-w-[1450px] mx-auto flex flex-col items-center text-center">
        
        {/* =========================================================================
            INSTITUTIONAL / COLLEGE BRANDING FROSTED GLASS BANNER (COMPACT BOX)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="w-full max-w-5xl mx-auto mb-4 sm:mb-8 px-2 sm:px-4 -mt-2 sm:-mt-5"
        >
          <div className="p-4 xs:p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#070D22]/90 border border-cyan-400/35 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,240,255,0.18)] w-full">
            
            {/* Mobile Layout (< md): 3 Logos on top row with generous spacing, College text below */}
            <div className="flex md:hidden flex-col items-center gap-3 xs:gap-4 w-full">
              {/* Top Row: 3 Logos */}
              <div className="flex items-center justify-center gap-3 xs:gap-4">
                <div className="w-11 h-11 xs:w-13 xs:h-13 rounded-full bg-white flex items-center justify-center border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] p-1 shrink-0">
                  <Image src="/footer.png" alt="NIITM" width={48} height={48} className="object-contain" />
                </div>
                <div className="w-11 h-11 xs:w-13 xs:h-13 rounded-full bg-white flex items-center justify-center border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] p-1 shrink-0">
                  <Image src="/images.jpg" alt="Partner" width={48} height={48} className="object-contain rounded-full" />
                </div>
                <div className="w-11 h-11 xs:w-13 xs:h-13 rounded-full bg-white flex items-center justify-center border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] p-1 shrink-0">
                  <Image src="/ngi-7051616-logo.png" alt="NCM" width={48} height={48} className="object-contain" />
                </div>
              </div>

              {/* Below: College Name Text with generous line height & padding */}
              <div className="flex flex-col justify-center items-center text-center px-2 w-full gap-1">
                <h2 className="text-xs xs:text-sm font-heading font-black text-white tracking-wide uppercase leading-snug text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] max-w-full">
                  Nehru Institute of Information Technology <span className="text-[#00F0FF] font-black">&amp;</span> Management
                </h2>
                <p className="text-[9px] xs:text-[10px] font-black tracking-[0.2em] uppercase my-1 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#D946EF] drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                  IN ASSOCIATION WITH
                </p>
                <p className="text-xs xs:text-sm font-black text-white uppercase tracking-wider leading-snug text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                  Nehru College of Management
                </p>
              </div>
            </div>

            {/* Desktop / Tablet Layout (>= md): Left logos, Center text, Right logo */}
            <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
              {/* Left Logos */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-13 h-13 md:w-15 md:h-15 rounded-full bg-white flex items-center justify-center border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] p-1.5">
                  <Image src="/footer.png" alt="NIITM" width={48} height={48} className="object-contain" />
                </div>
                <div className="w-13 h-13 md:w-15 md:h-15 rounded-full bg-white flex items-center justify-center border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] p-1.5">
                  <Image src="/images.jpg" alt="Partner" width={48} height={48} className="object-contain rounded-full" />
                </div>
              </div>

              {/* Center College Text */}
              <div className="flex flex-col justify-center items-center text-center px-1 flex-1 min-w-0 overflow-hidden">
                <h2 className="text-xs md:text-sm lg:text-base xl:text-lg font-heading font-black text-white tracking-tight uppercase leading-tight text-center whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                  Nehru Institute of Information Technology <span className="text-[#00F0FF] font-black">&amp;</span> Management
                </h2>
                <p className="text-[9.5px] sm:text-[10.5px] md:text-xs font-black tracking-[0.2em] uppercase mt-1 mb-0.5 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#D946EF] drop-shadow-[0_0_6px_rgba(168,85,247,0.4)] whitespace-nowrap">
                  IN ASSOCIATION WITH
                </p>
                <p className="text-xs sm:text-sm md:text-base font-black text-white uppercase tracking-wider leading-snug whitespace-nowrap drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
                  Nehru College of Management
                </p>
              </div>

              {/* Right Logo */}
              <div className="flex items-center shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] p-1.5">
                  <Image src="/ngi-7051616-logo.png" alt="NCM" width={52} height={52} className="object-contain" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ---- Organizes Banner (Outside & Below Box) ---- */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-8 px-2"
        >
          <div className="w-4 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-[#00F0FF] shrink-0" />
          <span className="text-xs sm:text-base md:text-lg font-black text-[#00F0FF] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-center drop-shadow-[0_0_12px_#00F0FF]">
            Organizes 24 Hours Hackathon &apos;26
          </span>
          <div className="w-4 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-[#00F0FF] shrink-0" />
        </motion.div>

        {/* =========================================================================
            MAIN TITLE: HACKSPARK '26 WITH ZIG-ZAG LIGHTNING LINE TOUCHING 'H'
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 sm:mb-8 relative w-full flex flex-col items-center justify-center py-2"
        >
          <div className="relative inline-flex items-center justify-center">
            {/* ZIG-ZAG ELECTRIC LIGHTNING LINE TOUCHING 'H' (CONTINUOUS ELECTRIC SURGE WAVE ANIMATION) */}
            <div className="flex items-center absolute right-full top-1/2 -translate-y-1/2 pr-0 pointer-events-none z-20">
              <div className="relative flex items-center justify-end">
                <svg className="w-10 xs:w-16 sm:w-36 md:w-48 lg:w-56 h-6 sm:h-12 text-[#00F0FF] overflow-visible" viewBox="0 0 200 40" fill="none">
                  <defs>
                    <filter id="electric-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="electric-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
                      <stop offset="60%" stopColor="#00F0FF" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  {/* Faded Base Lightning Trace */}
                  <path
                    d="M 0 20 L 40 20 L 60 8 L 85 32 L 110 10 L 135 30 L 160 15 L 180 25 L 200 20"
                    stroke="#00F0FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.35"
                  />

                  {/* Traveling High-Voltage Cyan Electric Wave Surge */}
                  <motion.path
                    d="M 0 20 L 40 20 L 60 8 L 85 32 L 110 10 L 135 30 L 160 15 L 180 25 L 200 20"
                    stroke="url(#electric-grad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#electric-glow)"
                    strokeDasharray="60 140"
                    animate={{ strokeDashoffset: [200, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Inner Pure White High-Voltage Core Wave */}
                  <motion.path
                    d="M 0 20 L 40 20 L 60 8 L 85 32 L 110 10 L 135 30 L 160 15 L 180 25 L 200 20"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="30 170"
                    animate={{ strokeDashoffset: [200, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>

                {/* Electric Contact Node Directly Touching 'H' */}
                <div className="relative -ml-0.5 sm:-ml-1 flex items-center justify-center">
                  <span className="w-2 h-2 sm:w-3.5 sm:h-3.5 rounded-full bg-[#00F0FF] shadow-[0_0_20px_#00F0FF] shrink-0" />
                </div>
              </div>
            </div>

            {/* ==================== MAIN CENTERPIECE TITLE TEXT ==================== */}
            <h1 className="relative font-heading font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[95px] xl:text-[108px] tracking-tight leading-none flex items-baseline justify-center z-10 select-none flex-wrap">
              {/* HACK (PURE WHITE) */}
              <span className="text-white font-black tracking-tight relative">
                HACK
              </span>

              {/* SPARK (GRADIENT BLUE/CYAN) */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#00F0FF] font-black tracking-tight ml-0.5 sm:ml-1">
                SPARK
              </span>

              {/* '26 (GRADIENT PURPLE/PINK) WITH PERFECTLY CENTERED RIGHT ELECTRIC LINE */}
              <span className="relative inline-flex items-center ml-1 sm:ml-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#D946EF] text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black align-baseline tracking-tight">
                  &apos;26
                </span>

                {/* ZIG-ZAG ELECTRIC LIGHTNING LINE TOUCHING '26' (CONTINUOUS ELECTRIC SURGE WAVE ANIMATION) */}
                <div className="flex items-center absolute left-full top-1/2 -translate-y-1/2 pl-0 pointer-events-none z-20">
                  <div className="relative flex items-center justify-start">
                    {/* Electric Contact Node Directly Touching '26' */}
                    <div className="relative -mr-0.5 sm:-mr-1 flex items-center justify-center">
                      <span className="w-2 h-2 sm:w-3.5 sm:h-3.5 rounded-full bg-[#8B5CF6] shadow-[0_0_20px_#8B5CF6] shrink-0" />
                    </div>

                    <svg className="w-10 xs:w-16 sm:w-36 md:w-48 lg:w-56 h-6 sm:h-12 text-[#8B5CF6] overflow-visible" viewBox="0 0 200 40" fill="none">
                      <defs>
                        <filter id="electric-glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <linearGradient id="electric-grad-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                          <stop offset="40%" stopColor="#A855F7" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>

                      {/* Faded Base Lightning Trace */}
                      <path
                        d="M 0 20 L 20 25 L 40 15 L 65 30 L 90 10 L 115 32 L 140 8 L 160 20 L 200 20"
                        stroke="#8B5CF6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.35"
                      />

                      {/* Traveling High-Voltage Purple Electric Wave Surge */}
                      <motion.path
                        d="M 0 20 L 20 25 L 40 15 L 65 30 L 90 10 L 115 32 L 140 8 L 160 20 L 200 20"
                        stroke="url(#electric-grad-purple)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#electric-glow-purple)"
                        strokeDasharray="60 140"
                        animate={{ strokeDashoffset: [-200, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                      />

                      {/* Inner Pure White High-Voltage Core Wave */}
                      <motion.path
                        d="M 0 20 L 20 25 L 40 15 L 65 30 L 90 10 L 115 32 L 140 8 L 160 20 L 200 20"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="30 170"
                        animate={{ strokeDashoffset: [-200, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                      />
                    </svg>
                  </div>
                </div>
              </span>
            </h1>
          </div>
        </motion.div>

        {/* =========================================================================
            TAGLINE & QUOTE
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-2 mb-6"
        >
          <p className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-3">
            <span className="text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF]">INNOVATE</span>
            <span className="text-[#8B5CF6] font-light">/</span>
            <span className="text-[#3B82F6] drop-shadow-[0_0_8px_#3B82F6]">BUILD</span>
            <span className="text-[#8B5CF6] font-light">/</span>
            <span className="text-[#EC4899] drop-shadow-[0_0_8px_#EC4899]">IMPACT</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-300 italic font-medium max-w-xl text-center leading-relaxed">
            &ldquo;The best way to predict the future is to build it. 24 hours, one idea, infinite possibilities.&rdquo;
          </p>

          {/* Event Date + Fee creative pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {/* Date pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#070D22]/80 border border-cyan-400/40 backdrop-blur-xl shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <span className="text-[10px] xs:text-xs font-black font-mono uppercase tracking-widest text-white">
                <span className="text-cyan-400">8th</span> <span className="text-white/50">&amp;</span> <span className="text-cyan-400">9th</span> <span className="text-slate-300">October</span>
              </span>
            </div>
            {/* Dot divider */}
            <span className="w-1 h-1 rounded-full bg-slate-500 hidden xs:block" />
            {/* Fee pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#070D22]/80 border border-emerald-400/40 backdrop-blur-xl shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <span className="relative flex h-2 w-2 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" /></span>
              <span className="text-[10px] xs:text-xs font-black font-mono uppercase tracking-widest">
                <span className="text-slate-300">Reg Fee</span> <span className="text-emerald-400">₹500</span> <span className="text-slate-500 font-medium normal-case text-[9px]">/team</span>
              </span>
            </div>
          </div>

          {/* Mobile Only: Register Now CTA Button below Reg Fee pill */}
          <div className="block sm:hidden mt-3 w-full max-w-[260px] mx-auto">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full font-black text-xs text-white bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6] active:scale-95 transition-all duration-300 uppercase tracking-widest border border-cyan-400/40"
            >
              <span>REGISTER NOW</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* =========================================================================
            VIBRANT GRADIENT CTAs (MATCHING '26 PURPLE/MAGENTA GRADIENT THEME)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-row items-center justify-center gap-1.5 xs:gap-3 sm:gap-4 mb-6 flex-nowrap w-full max-w-sm sm:max-w-none mx-auto px-1"
        >
          <a
            href="/HACKSPARK Rule Book.pdf"
            download="HACKSPARK Rule Book.pdf"
            className="flex-1 sm:flex-initial group relative inline-flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 px-2.5 xs:px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-black text-[10px] xs:text-xs sm:text-base text-white bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3] shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_45px_rgba(217,70,239,0.9)] hover:scale-105 transition-all duration-300 uppercase tracking-wider cursor-pointer border border-purple-400/30 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform text-white shrink-0" />
            <span>RULE BOOK</span>
          </a>

          <a
            href="/HackSpark PPT template.pptx"
            download="HackSpark PPT template.pptx"
            className="flex-1 sm:flex-initial group relative inline-flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 px-2.5 xs:px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-black text-[10px] xs:text-xs sm:text-base text-white bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#00F0FF] hover:from-[#1D4ED8] hover:to-[#00D8E6] shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_45px_rgba(0,240,255,0.9)] hover:scale-105 transition-all duration-300 uppercase tracking-wider cursor-pointer border border-cyan-400/30 whitespace-nowrap"
          >
            <Presentation className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform text-white shrink-0" />
            <span>PPT TEMPLATE</span>
          </a>
        </motion.div>

        {/* =========================================================================
            4 CYBER GLASS CARDS COUNTDOWN TIMER
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <CountdownCards />
        </motion.div>

      </div>
    </section>
  );
}
