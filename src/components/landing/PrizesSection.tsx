'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';

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
    perks: ['Cash Prize', 'Winner Trophy', 'Merit Certificate', 'Internship Opportunity'],
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
    <section id="prizes" className="py-24 relative overflow-hidden bg-slate-50">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-slate-50" />
      
      {/* Decorative Glowing Orbs */}
      <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-bl from-blue-400/10 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gradient-to-r from-amber-200/20 via-yellow-100/20 to-orange-200/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Premium Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-slate-700">
              Prize Pool
            </span>
          </div>
          <h2 className="section-heading text-slate-900 mb-4">
            Win <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">₹20,000</span>
          </h2>
          <p className="section-subheading text-slate-600 mx-auto">
            Compete, build, and win. Top teams take home massive cash prizes, premium trophies, and exclusive internship opportunities.
          </p>
        </motion.div>

        {/* Podium-style layout */}
        <div className="flex flex-col lg:flex-row items-end justify-center gap-8 lg:gap-10 mt-12 max-w-5xl mx-auto">
          {/* 2nd Place */}
          <PrizeCardContainer prize={PRIZES[1]} delay={0.2} isCenter={false} />
          {/* 1st Place */}
          <PrizeCardContainer prize={PRIZES[0]} delay={0.1} isCenter={true} />
          {/* 3rd Place */}
          <PrizeCardContainer prize={PRIZES[2]} delay={0.3} isCenter={false} />
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
      className={`relative w-full max-w-sm mx-auto group ${isCenter ? 'lg:mb-8 lg:scale-[1.08] z-20' : 'z-10'}`}
    >
      {/* Animated Gradient Border wrapper */}
      <div className={`relative rounded-[32px] p-[2px] transition-transform duration-500 hover:-translate-y-2 ${prize.glow} bg-slate-200/50`}>
        <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-b ${prize.borderGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${isCenter ? 'animate-pulse' : ''}`} />
        
        {isCenter && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200/80 text-amber-700 text-[10px] font-black tracking-[0.2em] uppercase shadow-sm flex items-center gap-2 whitespace-nowrap z-30">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500 animate-pulse" />
            Grand Prize
            <Star className="w-3 h-3 fill-amber-500 text-amber-500 animate-pulse" />
          </div>
        )}

        <div className={`relative bg-white/95 backdrop-blur-xl rounded-[30px] h-full overflow-hidden ${isCenter ? 'p-10' : 'p-8'} flex flex-col items-center`}>
          
          {/* Inner subtle glow */}
          <div className={`absolute inset-0 ${prize.bgGradient} opacity-50`} />
          
          {/* Subtle Background Watermark Icon */}
          <div className={`absolute -right-8 -bottom-8 opacity-[0.03] ${prize.iconColor} transform group-hover:scale-125 group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none origin-bottom-right`}>
            <Icon className="w-64 h-64" strokeWidth={1} />
          </div>

          <div className={`relative w-20 h-20 shrink-0 rounded-[24px] bg-gradient-to-br ${prize.iconGradient} flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform duration-500 mb-8`}>
             <Icon className="w-10 h-10" strokeWidth={2} />
             {/* Sparkle effect on hover */}
             <div className="absolute inset-0 rounded-[24px] bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </div>
          
          <p className={`text-xs font-black ${prize.iconColor} mb-3 uppercase tracking-[0.25em]`}>{prize.place}</p>
          <p className={`font-black text-4xl sm:text-5xl mb-10 text-transparent bg-clip-text bg-gradient-to-br ${prize.textGradient}`}>
            {prize.amount}
          </p>
          
          <ul className="space-y-4 w-full relative z-10">
            {prize.perks.map((p: string, i: number) => (
              <motion.li 
                key={p} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3 + (i * 0.1) }}
                className="text-sm font-semibold text-slate-700 flex items-center gap-3 bg-white/60 py-2.5 px-4 rounded-xl border border-slate-100 shadow-sm backdrop-blur-sm"
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
