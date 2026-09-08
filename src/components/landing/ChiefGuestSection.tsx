'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Briefcase, Award, Sparkles } from 'lucide-react';

const CHIEF_GUEST = {
  name: 'Shanmuga Sundaram',
  role: 'Valedictory Chief Guest',
  image: '/team/shasunder.jpg',
  linkedin: 'https://in.linkedin.com/in/shasunder',
  headline: 'Associate Director - Delivery',
  about: 'Associate Director - Delivery with 18+ years of experience driving large-scale product engineering and delivery programs across regulated and enterprise environments. Known for building high-performing engineering teams, stabilizing complex delivery portfolios, and translating business priorities into predictable execution outcomes.',
};

export default function ChiefGuestSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="chief-guest" className="py-14 sm:py-20 relative overflow-hidden bg-[#050914] text-white border-t border-blue-500/20">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070D22]/85 border border-blue-500/30 backdrop-blur-xl mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-cyan-300">
              Valedictory Ceremony
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-3">
            Valedictory <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6]">Chief Guest</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-medium">
            Honored to have our esteemed guest for the HackSpark &apos;26 Valedictory &amp; Prize Distribution ceremony.
          </p>
        </motion.div>

        {/* Chief Guest Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-[32px] p-[2px] overflow-hidden group shadow-[0_0_50px_rgba(0,240,255,0.25)] hover:shadow-[0_0_70px_rgba(0,240,255,0.4)] transition-all duration-500"
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

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1.5 tracking-tight">
                {CHIEF_GUEST.name}
              </h3>

              <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-semibold text-xs sm:text-sm mb-4">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>{CHIEF_GUEST.headline}</span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                {CHIEF_GUEST.about}
              </p>

              {/* Action Link */}
              {CHIEF_GUEST.linkedin && (
                <div className="flex justify-center md:justify-start">
                  <a
                    href={CHIEF_GUEST.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
