'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'image' | 'HACKSPARK' | 'done'>('image');

  useEffect(() => {
    const timings: Array<{ phase: 'image' | 'HACKSPARK' | 'done'; delay: number }> = [
      { phase: 'HACKSPARK', delay: 800 },
      { phase: 'done', delay: 3500 },
    ];

    const timeouts = timings.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        >
          {/* Subtle radial bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.08) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 text-center">
            
            {/* HackSpark '26 Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{
                opacity: phase === 'HACKSPARK' ? 1 : 0,
                scale: phase === 'HACKSPARK' ? 1 : 0.8,
                filter: phase === 'HACKSPARK' ? 'blur(0px)' : 'blur(10px)',
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
                style={{ fontFamily: 'var(--font-logo)', color: '#0F172A', letterSpacing: '0.12em' }}
              >
                HACKSPARK
                <span className="text-blue-600 ml-2 font-light">
                  '26
                </span>
              </h1>
              
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: phase === 'HACKSPARK' ? 1 : 0,
                  y: phase === 'HACKSPARK' ? 0 : 15,
                }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="mt-6 text-lg sm:text-xl md:text-2xl font-body font-light text-slate-500 tracking-wide"
              >
                Code Beyond Limits. Build the Future.
              </motion.p>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase === 'HACKSPARK' ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 w-24 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
