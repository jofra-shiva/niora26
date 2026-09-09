'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Briefcase, Award, X } from 'lucide-react';

const CHIEF_GUEST = {
  name: 'Shanmuga Sundaram',
  role: 'Valedictory Chief Guest',
  image: '/team/shasunder.jpg',
  linkedin: 'https://in.linkedin.com/in/shasunder',
  headline: 'Associate Director - Delivery',
  about: 'Associate Director - Delivery with 18+ years of experience driving large-scale product engineering and delivery programs across regulated and enterprise environments. Known for building high-performing engineering teams, stabilizing complex delivery portfolios, and translating business priorities into predictable execution outcomes.',
};

function GuestModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative bg-[#070D22] border border-cyan-400/40 rounded-[28px] shadow-[0_0_50px_rgba(0,240,255,0.25)] w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="relative h-28 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 border-b border-cyan-400/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,240,255,0.2),transparent)]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Avatar — overlaps banner */}
        <div className="absolute left-6 top-12 w-28 h-28 rounded-2xl overflow-hidden border-[3px] border-[#070D22] shadow-[0_0_25px_rgba(0,240,255,0.35)] z-10 bg-[#0B1536]">
          <Image src={CHIEF_GUEST.image} alt={CHIEF_GUEST.name} fill className="object-cover" />
        </div>

        {/* Body */}
        <div className="px-6 pt-16 pb-6">
          <div className="mb-1">
            <h2 className="text-2xl font-black text-white leading-tight">{CHIEF_GUEST.name}</h2>
            <p className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest mt-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {CHIEF_GUEST.role}
            </p>
          </div>

          {CHIEF_GUEST.headline && (
            <div className="flex items-center gap-2 mt-3 mb-4">
              <Briefcase className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <p className="text-sm text-slate-200 font-semibold">{CHIEF_GUEST.headline}</p>
            </div>
          )}

          <div className="h-px bg-cyan-500/20 mb-4" />

          {CHIEF_GUEST.about && (
            <div className="mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">About Chief Guest</p>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">{CHIEF_GUEST.about}</p>
            </div>
          )}

          {CHIEF_GUEST.linkedin && (
            <a
              href={CHIEF_GUEST.linkedin}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold py-3 rounded-2xl transition-all border border-cyan-400/30 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <ExternalLink className="w-4 h-4" />
              View LinkedIn Profile
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function ChiefGuestSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="chief-guest" className="py-14 sm:py-20 relative overflow-hidden bg-[#050914] text-white border-t border-blue-500/20">
      <AnimatePresence>
        {modalOpen && <GuestModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.12),transparent_65%),radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.15),transparent_60%)]" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10 max-w-4xl mx-auto px-4" ref={ref}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070D22]/85 border border-cyan-400/40 backdrop-blur-xl mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Award className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-xs font-black tracking-widest uppercase text-cyan-300">
              CHIEF GUEST
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-3">
            Valedictory <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6]">Chief Guest</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-medium">
            Honored to have our esteemed guest for the HackSpark &apos;26 Valedictory &amp; Prize Distribution ceremony.
          </p>
        </motion.div>

        {/* Chief Guest Spotlight Card (Clickable to view modal) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => setModalOpen(true)}
          className="relative rounded-[32px] p-[2px] overflow-hidden group shadow-[0_0_50px_rgba(0,240,255,0.25)] hover:shadow-[0_0_70px_rgba(0,240,255,0.4)] transition-all duration-500 cursor-pointer"
        >
          {/* Animated Glowing Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6] opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

          <div className="relative z-10 bg-[#070D22]/95 backdrop-blur-2xl rounded-[30px] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center gap-6 lg:gap-10 border border-blue-500/30">
            {/* Avatar Photo */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 shrink-0 rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.3)] bg-[#0B1536]">
              <Image
                src={CHIEF_GUEST.image}
                alt={CHIEF_GUEST.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 176px, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D22]/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Details */}
            <div className="flex-1 text-center md:text-left flex flex-col justify-center">
              <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 w-fit mx-auto md:mx-0">
                <Award className="w-3.5 h-3.5 text-[#00F0FF]" />
                {CHIEF_GUEST.role}
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1.5 tracking-tight group-hover:text-[#00F0FF] transition-colors">
                {CHIEF_GUEST.name}
              </h3>

              <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-semibold text-xs sm:text-sm mb-4">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>{CHIEF_GUEST.headline}</span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-medium line-clamp-3">
                {CHIEF_GUEST.about}
              </p>

              {/* Action Hint */}
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#00F0FF] group-hover:underline">
                <span>View Full Profile</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
