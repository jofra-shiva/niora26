'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Function to generate a continuous Subtle Wavy Zigzag Circle Path
function generateSubtleZigzagPath(
  cx: number,
  cy: number,
  rBase: number,
  amplitude: number,
  wavesCount: number,
  steps = 360
) {
  const pathParts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    // Gentle sine wave for lite up and down zigzag curvature
    const r = rBase + Math.sin(theta * wavesCount) * amplitude;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);

    if (i === 0) {
      pathParts.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`);
    } else {
      pathParts.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
  }
  return pathParts.join(' ');
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(700);

  // SVG Dimensions & Subtle ("lite aa") Zigzag Wave Parameters
  const size = 250;
  const center = size / 2;
  const rBase = 100;
  const amplitude = 4.5; // Lite / subtle wave height up & down
  const wavesCount = 14; // Smooth gentle waves

  const zigzagPath = generateSubtleZigzagPath(center, center, rBase, amplitude, wavesCount);

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) setPathLength(len);
    }
  }, []);

  useEffect(() => {
    // Extra slow, graceful loading progress over 5.5 seconds
    const duration = 5500;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
        }, 400);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 750);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, onComplete]);

  const strokeDashoffset = pathLength - (progress / 100) * pathLength;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="subtle-zigzag-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#03060E] text-white select-none"
        >
          {/* Cyber Grid Lines Background (kattam kattam) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 z-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,240,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Soft Dark Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Main Content Container with gentle vertical floating */}
          <motion.div
            animate={{ y: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            
            {/* Round Logo Wrapper with SUBTLE ZIGZAG WAVE LOADING LINE */}
            <div className="relative flex items-center justify-center mb-8">
              
              {/* SLOW ROTATING SVG WITH SUBTLE ZIGZAG STROKE */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                width={size}
                height={size}
                className="transform -rotate-90 filter drop-shadow-[0_0_18px_rgba(0,240,255,0.6)]"
              >
                {/* Background Track Circle */}
                <path
                  d={zigzagPath}
                  stroke="#081433"
                  strokeWidth="4"
                  fill="transparent"
                />
                
                {/* Slow Active Glowing Zigzag Loading Line */}
                <path
                  ref={pathRef}
                  d={zigzagPath}
                  stroke="url(#subtle-cyan-gradient)"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={pathLength}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: 'stroke-dashoffset 0.04s linear',
                  }}
                />

                <defs>
                  <linearGradient id="subtle-cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="60%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Round Logo inside the Wavy Ring */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden p-3 bg-[#08112C] border border-cyan-400/40 shadow-[0_0_35px_rgba(0,240,255,0.35)] flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white/10 flex items-center justify-center p-2">
                    <Image
                      src="/logoo.png"
                      alt="HackSpark Logo"
                      fill
                      sizes="160px"
                      priority
                      className="object-contain p-1 filter drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* HACKSPARK '26 Title & Tagline Below */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-1.5"
            >
              <h1 className="font-logo text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">
                HACKSPARK <span className="text-[#00F0FF] drop-shadow-[0_0_30px_#00F0FF]">&apos;26</span>
              </h1>

              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] pt-1">
                THINK BEYOND LIMITS
              </p>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
