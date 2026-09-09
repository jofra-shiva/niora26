'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Trophy, Lightbulb } from 'lucide-react';
import Image from 'next/image';

const HIGHLIGHTS = [
  {
    highlight: '24H',
    label: 'Continuous Hackathon',
    desc: '10 AM on 8th Oct → 10 AM on 9th Oct 2026.',
    icon: Clock,
    image: '/about-24h.jpg',
    borderColor: '#3b82f6',
    fillColor: 'rgba(59,130,246,0.07)',
    glowColor: 'rgba(59,130,246,0.25)',
  },
  {
    highlight: '₹20K',
    label: 'Prize Pool',
    desc: 'Top teams compete for cash prizes, merit certificates, and recognition.',
    icon: Trophy,
    image: '/about-prize.jpg',
    borderColor: '#6366f1',
    fillColor: 'rgba(99,102,241,0.07)',
    glowColor: 'rgba(99,102,241,0.25)',
  },
  {
    highlight: 'Open',
    label: 'Innovation',
    desc: 'No restrictions on domains. Build creative solutions for any real-world problem.',
    icon: Lightbulb,
    image: '/about-innovation.jpg',
    borderColor: '#06b6d4',
    fillColor: 'rgba(6,182,212,0.07)',
    glowColor: 'rgba(6,182,212,0.25)',
  },
];

function HighlightCard({ item, index }: { item: typeof HIGHLIGHTS[0]; index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.95', 'start 0.35'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  const borderOpacity = useTransform(smooth, [0, 1], [0.15, 1]);
  const bgOpacity = useTransform(smooth, [0, 1], [0, 1]);
  const iconScale = useTransform(smooth, [0, 1], [0.9, 1]);
  const textOpacity = useTransform(smooth, [0, 0.6], [0.5, 1]);
  const boxShadow = useTransform(
    smooth,
    [0, 1],
    [`0 4px 20px -8px rgba(0,0,0,0.05)`, `0 20px 50px -15px ${item.glowColor}`]
  );

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 80 }}
      className="group relative h-full flex cursor-default"
    >
      {/* Scroll-linked border */}
      <motion.div
        className="absolute inset-0 rounded-[28px] pointer-events-none"
        style={{ opacity: borderOpacity }}
      >
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{ border: `2px solid ${item.borderColor}` }}
        />
      </motion.div>

      {/* Hover glow border — stronger on hover */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ border: `2px solid ${item.borderColor}`, boxShadow: `0 0 20px 2px ${item.glowColor}` }}
      />

      {/* Static faint border always visible */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none"
        style={{ border: `2px solid ${item.borderColor}22` }}
      />

      {/* Card body */}
      <motion.div
        className="relative w-full h-full bg-[#070D22]/85 border border-blue-500/30 backdrop-blur-xl rounded-[22px] sm:rounded-[26px] p-5 sm:p-8 flex flex-col overflow-hidden z-10 text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        style={{ boxShadow }}
      >
        {/* Background color fill */}
        <motion.div
          className="absolute inset-0 rounded-[22px] sm:rounded-[26px] pointer-events-none"
          style={{
            background: item.fillColor,
            opacity: bgOpacity,
          }}
        />

        {/* Subtle Background Icon watermark */}
        <div className="absolute right-0 bottom-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none text-white">
          <Icon className="w-36 h-36 sm:w-48 sm:h-48" strokeWidth={1} />
        </div>

        {/* Header (Icon + Text) */}
        <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-6 relative z-10">
          {/* Modern Icon instead of raster image */}
          <div 
            className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${item.borderColor}25, ${item.borderColor}40)`,
              border: `1px solid ${item.borderColor}60`
            }}
          >
            <Icon 
              className="w-6 h-6 sm:w-8 sm:h-8 relative z-10" 
              style={{ color: item.borderColor }} 
              strokeWidth={2.5}
            />
          </div>

          <div className="flex flex-col justify-center">
            <motion.h3
              className="font-bold text-2xl sm:text-[32px] leading-none tracking-tight text-white"
              style={{ opacity: textOpacity }}
            >
              {item.highlight}
            </motion.h3>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium relative z-10 mt-auto">
          {item.desc}
        </p>

        {/* Bottom accent line — slides in on hover */}
        <div
          className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:left-4 group-hover:right-4"
          style={{ background: `linear-gradient(to right, transparent, ${item.borderColor}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} id="about" className="pt-8 sm:pt-12 pb-12 sm:pb-16 relative bg-[#050914] text-white overflow-hidden">
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.12),transparent_65%),radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_55%)]" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#070D22]/80 border border-blue-500/30 mb-4 sm:mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#00F0FF]">
              About HackSpark &apos;26
            </span>
          </div>

          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-3 sm:mb-6">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#00F0FF] to-[#8B5CF6]">HackSpark?</span>
          </h2>

          <p className="text-xs xs:text-sm sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-4xl mx-auto font-medium px-1 sm:px-0">
            HackSpark &apos;26 is a premium <span className="font-bold text-cyan-300 border-b-2 border-cyan-500/40">24-hour hackathon</span> focused on{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6] border-b-2 border-cyan-400/50 drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              Sustainable AI
            </span>{' '}
            and innovative technology, organized by the PG Department of Computer Applications, Nehru Institute of Information Technology and Management in collaboration with Nehru College of Management. Participants develop <span className="font-bold text-cyan-300 border-b-2 border-cyan-500/40">AI-powered solutions</span> to address real-world challenges, promote sustainability, and create a smarter, greener future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {HIGHLIGHTS.map((item, i) => (
            <HighlightCard key={item.highlight} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </section>
  );
}

