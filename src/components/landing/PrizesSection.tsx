'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Trophy, Medal, Award, Star, Briefcase, CheckCircle2, Building2, ExternalLink } from 'lucide-react';

const PRIZES = [
  {
    place: '1st Place',
    amount: '₹10,000',
    icon: Trophy,
    bgGradient: 'bg-gradient-to-b from-amber-500/10 to-transparent',
    borderGradient: 'from-amber-300 via-yellow-400 to-amber-600',
    iconGradient: 'from-amber-400 to-orange-500',
    textGradient: 'from-amber-500 via-yellow-500 to-orange-600',
    iconColor: 'text-amber-500',
    dotColor: 'bg-amber-500 shadow-amber-500/50',
    glow: 'shadow-[0_0_50px_-12px_rgba(245,158,11,0.4)] hover:shadow-[0_0_80px_-12px_rgba(245,158,11,0.6)]',
    perks: ['Cash Prize', 'Winner Trophy', 'Merit Certificate'],
  },
  {
    place: '2nd Place',
    amount: '₹6,000',
    icon: Medal,
    bgGradient: 'bg-gradient-to-b from-slate-400/10 to-transparent',
    borderGradient: 'from-slate-300 via-slate-400 to-slate-500',
    iconGradient: 'from-slate-400 to-slate-600',
    textGradient: 'from-slate-500 to-slate-700',
    iconColor: 'text-slate-500',
    dotColor: 'bg-slate-500 shadow-slate-500/50',
    glow: 'shadow-[0_0_40px_-15px_rgba(148,163,184,0.3)] hover:shadow-[0_0_60px_-15px_rgba(148,163,184,0.5)]',
    perks: ['Cash Prize', 'Runner-up Medal', 'Merit Certificate'],
  },
  {
    place: '3rd Place',
    amount: '₹4,000',
    icon: Award,
    bgGradient: 'bg-gradient-to-b from-orange-400/10 to-transparent',
    borderGradient: 'from-orange-300 via-orange-400 to-orange-600',
    iconGradient: 'from-orange-400 to-red-500',
    textGradient: 'from-orange-500 to-red-600',
    iconColor: 'text-orange-500',
    dotColor: 'bg-orange-500 shadow-orange-500/50',
    glow: 'shadow-[0_0_40px_-15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_-15px_rgba(249,115,22,0.5)]',
    perks: ['Cash Prize', 'Runner-up Medal', 'Merit Certificate'],
  },
];

export default function PrizesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="prizes" className="py-10 sm:py-24 relative overflow-hidden bg-[#050914] text-white">
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

      <div className="section-container relative z-10 max-w-6xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#070D22]/85 border border-blue-500/30 backdrop-blur-xl mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-cyan-300">
              Prize Pool
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-3 sm:mb-4">
            Win <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">₹20,000</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto px-1 font-medium">
            Compete, build, and win. Top teams take home massive cash prizes, premium trophies, and merit certificates.
          </p>
        </motion.div>

        {/* Mobile: vertical stack (1st, 2nd, 3rd). Desktop: podium (2nd, 1st, 3rd) */}
        <div className="max-w-5xl mx-auto mt-6 sm:mt-12">
          {/* Mobile layout: 1st, 2nd, 3rd */}
          <div className="flex flex-col gap-4 sm:hidden">
            <PrizeCardContainer prize={PRIZES[0]} delay={0.1} isCenter={true} />
            <PrizeCardContainer prize={PRIZES[1]} delay={0.2} isCenter={false} />
            <PrizeCardContainer prize={PRIZES[2]} delay={0.3} isCenter={false} />
          </div>
          {/* Desktop podium layout: 2nd, 1st, 3rd */}
          <div className="hidden sm:flex items-end justify-center gap-6 lg:gap-10">
            <PrizeCardContainer prize={PRIZES[1]} delay={0.2} isCenter={false} />
            <PrizeCardContainer prize={PRIZES[0]} delay={0.1} isCenter={true} />
            <PrizeCardContainer prize={PRIZES[2]} delay={0.3} isCenter={false} />
          </div>
        </div>

        {/* Additional Perks & Chief Guest (2 Side-by-Side Glass Cards in Advisory Board Card Style) */}
        <div className="max-w-5xl mx-auto mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Valedictory Chief Guest */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 120, damping: 15 }}
            className="relative rounded-[20px] sm:rounded-[26px] p-[1.5px] overflow-hidden group cursor-pointer w-full shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
          >
            {/* Glowing Gradient Border */}
            <div className="absolute inset-0 rounded-[20px] sm:rounded-[26px] bg-gradient-to-r from-blue-500/40 via-cyan-400/30 to-purple-500/40 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Inner Card Content */}
            <div className="relative z-10 bg-[#070D22]/85 backdrop-blur-2xl group-hover:bg-[#0A1230]/95 transition-all duration-500 rounded-[18px] sm:rounded-[24px] p-3.5 sm:p-5 flex items-start gap-3 sm:gap-5 text-left h-full w-full border border-blue-500/30">
              {/* Left Avatar */}
              <div className="relative w-16 h-16 sm:w-28 sm:h-28 flex-shrink-0 z-10">
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0B1536] border-2 border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 z-10">
                  <Image
                    src="/team/shasunder.jpg"
                    alt="Shanmuga Sundaram"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="flex flex-col flex-1 h-full min-h-[64px] sm:min-h-[112px] z-10 min-w-0">
                <div>
                  <h3 className="font-heading font-bold text-white text-sm sm:text-lg group-hover:text-[#00F0FF] transition-colors leading-tight mb-0.5 sm:mb-1 truncate">
                    Shanmuga Sundaram
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-cyan-400 font-mono font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2">
                    Valedictory Chief Guest
                  </p>
                </div>

                <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-1.5 sm:mb-3 flex-1 font-medium">
                  Associate Director - Delivery. 18+ years driving product engineering &amp; delivery programs across enterprise environments.
                </p>

                {/* Bottom link */}
                <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2 border-t border-blue-500/20">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-semibold text-cyan-400 opacity-80 group-hover:opacity-100 transition-all duration-300">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Guest of Honor</span>
                  </div>
                  <a
                    href="https://in.linkedin.com/in/shasunder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-cyan-400 hover:text-white transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Internship Opportunity by Inexpensive Coders */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120, damping: 15 }}
            className="relative rounded-[20px] sm:rounded-[26px] p-[1.5px] overflow-hidden group cursor-pointer w-full shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
          >
            {/* Glowing Gradient Border */}
            <div className="absolute inset-0 rounded-[20px] sm:rounded-[26px] bg-gradient-to-r from-purple-500/40 via-pink-400/30 to-indigo-500/40 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Inner Card Content */}
            <div className="relative z-10 bg-[#070D22]/85 backdrop-blur-2xl group-hover:bg-[#0A1230]/95 transition-all duration-500 rounded-[18px] sm:rounded-[24px] p-3.5 sm:p-5 flex items-start gap-3 sm:gap-5 text-left h-full w-full border border-purple-500/30">
              {/* Left Logo - Inexpensive Coders */}
              <div className="relative w-16 h-16 sm:w-28 sm:h-28 flex-shrink-0 z-10">
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white p-1.5 sm:p-2 border-2 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:border-purple-400 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 z-10 flex items-center justify-center">
                  <Image
                    src="/inexpensive_coders.png"
                    alt="Inexpensive Coders"
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="flex flex-col flex-1 h-full min-h-[64px] sm:min-h-[112px] z-10 min-w-0">
                <div>
                  <h3 className="font-heading font-bold text-white text-sm sm:text-lg group-hover:text-purple-300 transition-colors leading-tight mb-0.5 sm:mb-1 truncate">
                    Internship Opportunity
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-purple-300 font-mono font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2">
                    Inexpensive Coders
                  </p>
                </div>

                <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-1.5 sm:mb-3 flex-1 font-medium">
                  Exclusive Internship Opportunities for ALL Participants offered by <strong className="text-purple-300 font-bold">Inexpensive Coders</strong>.
                </p>

                {/* Bottom bar */}
                <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2 border-t border-purple-500/20">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-semibold text-purple-300">
                    <Building2 className="w-3 h-3 text-pink-400" />
                    <span>Inexpensive Coders</span>
                  </div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <span className="text-purple-300 group-hover:text-white text-xs sm:text-sm leading-none transform group-hover:translate-x-0.5 transition-all">→</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function PrizeCardContainer({ prize, delay, isCenter }: { prize: typeof PRIZES[0]; delay: number; isCenter: boolean }) {
  const Icon = prize.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className={`relative w-full max-w-sm mx-auto group ${isCenter ? 'sm:mb-6 sm:scale-[1.02] z-20' : 'z-10'}`}
    >
      {/* Animated Gradient Border wrapper */}
      <div className={`relative rounded-[24px] sm:rounded-[32px] p-[1.5px] transition-transform duration-500 hover:-translate-y-2 ${prize.glow}`}>
        <div className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] bg-gradient-to-b ${prize.borderGradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500 ${isCenter ? 'animate-pulse' : ''}`} />
        
        {isCenter && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-500/30 border border-amber-400/50 text-amber-300 text-[9px] sm:text-[10px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1.5 sm:gap-2 whitespace-nowrap z-30 backdrop-blur-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 animate-pulse" />
            Grand Prize
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 animate-pulse" />
          </div>
        )}

        <div className={`relative bg-[#070D22]/90 backdrop-blur-2xl border border-blue-500/30 rounded-[22px] sm:rounded-[30px] h-full overflow-hidden p-5 sm:p-8 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.8)]`}>
          
          {/* Inner subtle glow */}
          <div className={`absolute inset-0 ${prize.bgGradient} opacity-30`} />
          
          {/* Subtle Background Watermark Icon */}
          <div className={`absolute -right-8 -bottom-8 opacity-[0.05] ${prize.iconColor} transform group-hover:scale-125 group-hover:opacity-[0.12] transition-all duration-700 pointer-events-none origin-bottom-right`}>
            <Icon className="w-36 h-36 sm:w-64 sm:h-64" strokeWidth={1} />
          </div>

          <div className={`relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-[14px] sm:rounded-[20px] bg-gradient-to-br ${prize.iconGradient} flex items-center justify-center text-white shadow-[0_0_25px_rgba(0,240,255,0.3)] group-hover:scale-110 transition-transform duration-500 mb-3 sm:mb-6`}>
             <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2} />
             {/* Sparkle effect on hover */}
             <div className="absolute inset-0 rounded-[14px] sm:rounded-[20px] bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </div>
          
          <p className={`text-[10px] sm:text-xs font-black ${prize.iconColor} mb-1 sm:mb-2 uppercase tracking-[0.2em] sm:tracking-[0.25em]`}>{prize.place}</p>
          <p className={`font-black text-2xl xs:text-3xl sm:text-4xl lg:text-4xl mb-3 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-br ${prize.textGradient} drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]`}>
            {prize.amount}
          </p>
          
          <ul className="space-y-2 sm:space-y-4 w-full relative z-10">
            {prize.perks.map((p: string, i: number) => (
              <motion.li 
                key={p} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3 + (i * 0.1) }}
                className="text-[11px] xs:text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2 sm:gap-3 bg-[#0B1536]/80 py-1.5 xs:py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-blue-500/20 shadow-inner backdrop-blur-sm"
              >
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-[0_0_8px] ${prize.dotColor}`} />
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
