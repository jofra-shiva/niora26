'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { EVENT_START_DATE } from '@/lib/utils/constants';

/* -- Clean Countdown Unit -- */
function CountUnit({ value, label }: { value: number; label: string }) {
  const str = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(37,99,235,0.05)]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={str}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight"
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
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
        className="flex items-center gap-2 sm:gap-4"
      >
        <CountUnit value={timeLeft.days} label="Days" />
        <div className="flex flex-col gap-1.5 pb-6">
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="w-1 h-1 rounded-full bg-slate-300" />
        </div>
        <CountUnit value={timeLeft.hours} label="Hours" />
        <div className="flex flex-col gap-1.5 pb-6">
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="w-1 h-1 rounded-full bg-slate-300" />
        </div>
        <CountUnit value={timeLeft.minutes} label="Mins" />
        <div className="flex flex-col gap-1.5 pb-6">
          <div className="w-1 h-1 rounded-full bg-blue-300" />
          <div className="w-1 h-1 rounded-full bg-blue-300" />
        </div>
        <CountUnit value={timeLeft.seconds} label="Secs" />
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
      className="relative min-h-screen flex flex-col justify-center pt-16 pb-24 sm:pt-8 sm:pb-12 overflow-hidden"
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

      {/* ––– Blur orbs (Static to prevent lag) ––– */}
      <div
        className="absolute top-[-100px] right-[-100px] w-[480px] h-[480px] rounded-full pointer-events-none z-[2]"
        style={{ background: 'radial-gradient(circle, rgba(99,155,255,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 75%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none z-[2]"
        style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.15) 0%, rgba(37,99,235,0.06) 50%, transparent 75%)', filter: 'blur(32px)' }}
      />

      {/* ---- Main Content ---- */}
      <div className="section-container relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* ---- College Badge ---- */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-full sm:w-auto mb-3 sm:mb-4"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-md p-2 sm:p-1.5 hover:shadow-lg hover:bg-white/95 transition-all duration-300 max-w-full">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm shrink-0 overflow-hidden">
                <Image src="/footer.png" alt="NIITM" width={20} height={20} className="object-contain" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm shrink-0 overflow-hidden">
                <Image src="/images.jpg" alt="Partner" width={22} height={22} className="object-contain rounded-full" />
              </div>
            </div>
            
            <div className="w-px h-8 sm:h-10 bg-slate-200" />
            
            <div className="flex flex-col justify-center items-center py-0.5 text-center">
              <p className="text-[8px] sm:text-[11px] font-extrabold text-slate-900 tracking-wide uppercase leading-tight">
                Nehru Institute of Information Technology <span className="text-blue-600">&amp;</span> Management
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1 mt-0.5">
                <p className="text-[7px] sm:text-[8px] text-slate-500 font-bold tracking-[0.08em] uppercase">
                  In Collab With
                </p>
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                <p className="text-[7px] sm:text-[9px] font-bold text-slate-700 tracking-wide uppercase leading-tight">
                  Nehru College of Management
                </p>
              </div>
            </div>

            <div className="w-px h-8 sm:h-10 bg-slate-200" />

            <div className="pr-0.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm shrink-0 overflow-hidden">
                <Image src="/ngi-7051616-logo.png" alt="NCM" width={24} height={24} className="object-contain" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ––– Event Label ––– */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6 sm:mb-8"
        >
          <div className="w-8 h-px bg-slate-400" />
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.35em] font-bold">
            National Level Hackathon &apos;26
          </span>
          <div className="w-8 h-px bg-slate-400" />
        </motion.div>


        {/* ––– Main Title ––– */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-heading font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-slate-900 drop-shadow-sm leading-none flex items-start justify-center flex-wrap">
            HACKSPARK
            <span className="text-3xl sm:text-4xl md:text-5xl text-blue-600 mt-2 sm:mt-4 ml-1 sm:ml-2">&apos;26</span>
          </h1>
        </motion.div>

        {/* ---- Tagline ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4 sm:gap-6 mb-10 sm:mb-12"
        >
          <p className="text-sm sm:text-base lg:text-lg font-mono font-bold text-slate-600 tracking-[0.2em] uppercase flex items-center justify-center gap-3 flex-wrap">
            <span>Innovate</span>
            <span className="text-blue-400 font-light">/</span>
            <span>Build</span>
            <span className="text-blue-400 font-light">/</span>
            <span>Impact</span>
          </p>
          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl leading-relaxed text-center">
            &ldquo;The best way to predict the future is to build it. 24 hours, one idea, infinite possibilities.&rdquo;
          </p>
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-row items-center justify-center gap-4 mb-16 sm:mb-20"
        >
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-blue-600 overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-opacity opacity-100 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 transition-opacity opacity-0 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2">
              Register Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/#about"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-slate-700 bg-white/50 backdrop-blur-md border border-white/60 hover:bg-white/80 hover:shadow-lg transition-all hover:scale-105"
          >
            Learn More
          </Link>
        </motion.div>

        {/* ––– Flip Clock Countdown ––– */}
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-px bg-slate-300" />
             <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Event Starts In</p>
             <div className="w-12 h-px bg-slate-300" />
           </div>
           <FlipClock />
        </div>

      </div>
    </section>
  );
}
