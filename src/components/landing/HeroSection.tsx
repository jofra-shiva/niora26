'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { EVENT_START_DATE } from '@/lib/utils/constants';

/* -- Clean Countdown Unit -- */
function CountUnit({ value, label, accent, progress }: { value: number; label: string; accent?: boolean; progress: number }) {
  const str = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border shadow-lg overflow-hidden ${
        accent
          ? 'bg-blue-900/20 border-blue-400/50 shadow-blue-500/30 backdrop-blur-md'
          : 'bg-white/40 backdrop-blur-md border-slate-200/80 shadow-slate-200/50'
      }`}>
        {/* Fill Background based on time progress */}
        <div 
          className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-linear ${
            accent ? 'bg-gradient-to-t from-blue-600 to-blue-500' : 'bg-gradient-to-t from-white to-white/70'
          }`}
          style={{ height: `${progress * 100}%` }}
        />
        
        {/* Subtle top gloss */}
        <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10" />
        
        {/* Animated number */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={str}
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.85 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={`font-mono font-black tabular-nums text-4xl sm:text-5xl leading-none select-none z-20 drop-shadow-sm ${
              accent ? 'text-white' : 'text-slate-900'
            }`}
          >
            {str}
          </motion.span>
        </AnimatePresence>
        
        {/* Accent ring glow */}
        {accent && (
          <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-400/40 ring-offset-0 pointer-events-none z-30" />
        )}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${
        accent ? 'text-blue-500' : 'text-slate-400'
      }`}>
        {label}
      </span>
    </div>
  );
}

function FlipClock() {
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

  if (done || !timeLeft) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="flex flex-col gap-5"
      >
        {/* Label */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-blue-400" />
          <p className="text-[10px] font-black tracking-[0.35em] text-slate-400 uppercase">Event Starts In</p>
        </div>

        {/* Units row */}
        <div className="flex items-center gap-2 sm:gap-3">
          <CountUnit value={timeLeft.days} label="Days" progress={timeLeft.days / 30} />
          
          <div className="flex flex-col gap-2 pb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
          
          <CountUnit value={timeLeft.hours} label="Hours" progress={timeLeft.hours / 24} />
          
          <div className="flex flex-col gap-2 pb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
          
          <CountUnit value={timeLeft.minutes} label="Mins" progress={timeLeft.minutes / 60} />
          
          <div className="flex flex-col gap-2 pb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
          </div>
          
          <CountUnit value={timeLeft.seconds} label="Secs" progress={timeLeft.seconds / 60} accent />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}



export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4;
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-4 pb-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ––– Video Background ––– */}
      <video
        autoPlay muted loop playsInline
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/vidssave.com White Polygons Motion 1 1080P.mp4"
      />

      {/* ––– Blur Overlay ––– */}
      <div className="absolute inset-0 z-0 backdrop-blur-[3px]" />

      {/* ––– Mouse Pointer Glow ––– */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        animate={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.1), transparent 70%)`
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* ––– Light tint ––– */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0.3) 100%)',
        }}
      />

      {/* ––– Grid overlay ––– */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(99,155,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,155,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ––– Blur orbs ––– */}
      <motion.div
        className="absolute top-[-100px] right-[-100px] w-[480px] h-[480px] rounded-full pointer-events-none z-[2]"
        animate={{ rotate: 360, scale: [1, 1.06, 1] }}
        transition={{ rotate: { duration: 60, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ background: 'radial-gradient(circle, rgba(99,155,255,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 75%)', filter: 'blur(40px)' }}
      />
      <motion.div
        className="absolute bottom-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none z-[2]"
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 45, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.15) 0%, rgba(37,99,235,0.06) 50%, transparent 75%)', filter: 'blur(32px)' }}
      />

      {/* ––– Main Content ––– */}
      <div className="section-container relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-start gap-6">

          {/* ––– College Badge ––– */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="inline-flex items-center gap-3.5 sm:gap-4 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-md p-1.5 hover:shadow-lg hover:bg-white/95 transition-all duration-300">
              <div className="flex items-center gap-1.5 pl-0.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm shrink-0 overflow-hidden">
                  <Image src="/footer.png" alt="NIITM" width={22} height={22} className="object-contain" />
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm shrink-0 overflow-hidden">
                  <Image src="/images.jpg" alt="Partner" width={24} height={24} className="object-contain rounded-full" />
                </div>
              </div>
              
              <div className="w-px h-10 bg-slate-200" />
              
              <div className="flex flex-col justify-center py-1">
                <p className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 tracking-wide uppercase leading-tight">
                  Nehru Institute of IT <span className="text-blue-600">&amp;</span> Management
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-[8px] text-slate-500 font-bold tracking-[0.1em] uppercase">
                    In Collaboration With
                  </p>
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-700 tracking-wide uppercase leading-tight">
                    Nehru College of Management
                  </p>
                </div>
              </div>

              <div className="w-px h-10 bg-slate-200" />

              <div className="pr-0.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm shrink-0 overflow-hidden">
                  <Image src="/ngi-7051616-logo.png" alt="NCM" width={26} height={26} className="object-contain" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ––– Event Label ––– */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 -mb-2"
          >
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.35em] font-semibold">
              National Level Hackathon &apos;26
            </span>
          </motion.div>

          {/* ––– Main Title ––– */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="-mb-2"
          >
            <h1
              className="leading-[0.85] tracking-tight flex items-start gap-2 sm:gap-3 flex-wrap"
              style={{ fontWeight: 900, textShadow: '0 2px 30px rgba(255,255,255,0.9)' }}
            >
              <span
                style={{
                  fontFamily: "'GulamsCondensed', sans-serif",
                  fontSize: 'clamp(4.5rem, 12vw, 12rem)',
                }}
              >
                <span className="text-[#155DFC]">H</span>
                <span className="text-slate-900">ACK</span>
                <span className="text-[#155DFC]">S</span>
                <span className="text-slate-900">PARK</span>
              </span>
              <span className="flex items-start font-heading pt-2 sm:pt-4">
                <span className="font-black text-blue-600" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
                  &apos;26
                </span>
              </span>
            </h1>
          </motion.div>

          {/* ––– Tagline ––– */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <p className="text-lg sm:text-xl font-mono font-black text-slate-800 tracking-[0.22em] uppercase flex items-center gap-3 flex-wrap">
              <span>Innovate</span>
              <span className="text-blue-500 font-black">/</span>
              <span>Build</span>
              <span className="text-blue-500 font-black">/</span>
              <span>Impact</span>
            </p>
            <p className="text-sm sm:text-base text-slate-500 font-medium italic max-w-xl leading-relaxed border-l-2 border-blue-400 pl-3">
              &ldquo;The best way to predict the future is to build it. 24 hours, one idea, infinite possibilities.&rdquo;
            </p>
          </motion.div>

          {/* â”€â”€ CTA Buttons â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="flex flex-row flex-wrap gap-3"
          >
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Register Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-slate-700 bg-white/70 backdrop-blur-md border border-slate-200/70 shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>

          {/* ––– Flip Clock Countdown ––– */}
          <FlipClock />

        </div>
      </div>
    </section>
  );
}
