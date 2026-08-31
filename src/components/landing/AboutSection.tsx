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
    desc: '10 AM on 9 Oct → 10 AM on 10 Oct 2026.',
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
        className="relative w-full h-full bg-white rounded-[26px] p-8 flex flex-col overflow-hidden z-10"
        style={{ boxShadow }}
      >
        {/* Background color fill */}
        <motion.div
          className="absolute inset-0 rounded-[26px] pointer-events-none"
          style={{
            background: item.fillColor,
            opacity: bgOpacity,
          }}
        />

        {/* Subtle Background Icon watermark */}
        <div className="absolute right-0 bottom-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
          <Icon className="w-48 h-48" strokeWidth={1} />
        </div>

        {/* Header (Icon + Text) */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          {/* Icon image — static, no hover scale */}
          <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-lg relative">
            <Image
              src={item.image}
              alt={item.label}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <motion.h3
              className="font-bold text-[32px] leading-none tracking-tight text-slate-900"
              style={{ opacity: textOpacity }}
            >
              {item.highlight}
            </motion.h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1.5">
              {item.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed font-medium relative z-10 mt-auto">
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="pt-8 pb-10 relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-50/80 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="section-container relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-blue-700">
              About HackSpark '26
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-tight mb-6">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">HackSpark?</span>
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-slate-600 max-w-4xl mx-auto font-medium">
            HackSpark '26 is a premium <span className="font-bold text-slate-900 border-b-2 border-blue-200">24-hour hackathon</span> organized by the PG Department of Computer Applications,
            Nehru Institute of Information Technology and Management in collaboration with Nehru College of Management. Participants build <span className="font-bold text-slate-900 border-b-2 border-blue-200">real-world solutions</span>{' '}
            under time pressure, compete for prizes, and push the boundaries of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HIGHLIGHTS.map((item, i) => (
            <HighlightCard key={item.highlight} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}

