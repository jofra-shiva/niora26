'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Code, Coffee, Presentation, Rocket, Trophy, Lightbulb, Pizza, Users, Mail, CreditCard, FileText } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    time: 'September 25',
    title: 'Registration & PPT Submission',
    desc: 'Complete registration and submit your PPT within this date.',
    icon: FileText,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500',
    glow: 'shadow-indigo-500/40',
    gradient: 'from-indigo-600 to-violet-500'
  },
  {
    time: 'September 27',
    title: 'Shortlist Confirmation',
    desc: 'Selected teams will receive an official confirmation email to proceed to the next stage.',
    icon: Mail,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500',
    glow: 'shadow-emerald-500/40',
    gradient: 'from-emerald-500 to-teal-400'
  },
  {
    time: 'September 28',
    title: 'Payment & Confirm',
    desc: 'Complete the payment process to officially secure your spot for the main hackathon event.',
    icon: CreditCard,
    color: 'text-amber-500',
    bg: 'bg-amber-500',
    glow: 'shadow-amber-500/40',
    gradient: 'from-amber-500 to-orange-400'
  },
  {
    time: 'Day 1 · 08-09-2026 · 09:00 AM',
    title: 'Check-in',
    desc: 'Participants arrive, complete check-in, and collect their event kits.',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500',
    glow: 'shadow-blue-500/40',
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    time: 'Day 1 · 08-09-2026 · 10:00 AM',
    title: 'Inauguration & Kick-off',
    desc: 'Official inauguration and the formal beginning of the event.',
    icon: Rocket,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500',
    glow: 'shadow-indigo-500/40',
    gradient: 'from-indigo-600 to-blue-500'
  },
  {
    time: 'Day 1 · 08-09-2026 · 01:00 PM',
    title: 'Lunch Break',
    desc: 'Take a break and fuel up for the project development phase.',
    icon: Pizza,
    color: 'text-amber-500',
    bg: 'bg-amber-500',
    glow: 'shadow-amber-500/40',
    gradient: 'from-amber-500 to-orange-400'
  },
  {
    time: 'Day 1 · 08-09-2026 · 06:00 PM',
    title: 'Mentorship Round 1',
    desc: 'Expert mentors will visit the teams, review their progress, provide feedback, and offer design and technical guidance.',
    icon: Lightbulb,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500',
    glow: 'shadow-emerald-500/40',
    gradient: 'from-emerald-600 to-teal-400'
  },
  {
    time: 'Day 1 · 08-09-2026 · 08:00 PM',
    title: 'Dinner',
    desc: 'Dinner served at the venue for all participants.',
    icon: Coffee,
    color: 'text-orange-500',
    bg: 'bg-orange-500',
    glow: 'shadow-orange-500/40',
    gradient: 'from-orange-600 to-red-400'
  },
  {
    time: 'Day 1 · 08-09-2026 · 10:30 PM',
    title: 'Midnight Munchies',
    desc: 'Refreshment break for participants to keep the momentum going.',
    icon: Coffee,
    color: 'text-rose-500',
    bg: 'bg-rose-500',
    glow: 'shadow-rose-500/40',
    gradient: 'from-rose-600 to-pink-500'
  },
  {
    time: 'Day 2 · 09-09-2026 · 01:00 AM',
    title: 'Mentorship Round 2',
    desc: 'Mentors check in on your progress, help debug issues, and guide you toward the final stretch.',
    icon: Lightbulb,
    color: 'text-violet-500',
    bg: 'bg-violet-500',
    glow: 'shadow-violet-500/40',
    gradient: 'from-violet-600 to-fuchsia-500'
  },
  {
    time: 'Day 2 · 09-09-2026 · 04:00 AM',
    title: 'Recharge Break',
    desc: 'Take a quick power nap or grab some early morning tea to stay awake!',
    icon: Coffee,
    color: 'text-pink-500',
    bg: 'bg-pink-500',
    glow: 'shadow-pink-500/40',
    gradient: 'from-pink-600 to-rose-400'
  },
  {
    time: 'Day 2 · 09-09-2026 · 07:00 AM',
    title: 'Submission Deadline',
    desc: 'Final project submission deadline. Enjoy a quick breakfast before presentations!',
    icon: Code,
    color: 'text-purple-500',
    bg: 'bg-purple-500',
    glow: 'shadow-purple-500/40',
    gradient: 'from-purple-600 to-indigo-500'
  },
  {
    time: 'Day 2 · 09-09-2026 · 08:00 AM',
    title: 'Project Presentation',
    desc: 'Teams present and demonstrate their completed projects before the evaluation panel.',
    icon: Presentation,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500',
    glow: 'shadow-cyan-500/40',
    gradient: 'from-cyan-600 to-blue-500'
  },
  {
    time: 'Day 2 · 09-09-2026 · 10:00 AM',
    title: 'Valedictory & Prize Distribution',
    desc: 'Final event closing ceremony, winner announcement, and prize distribution graced by Valedictory Chief Guest Shanmuga Sundaram.',
    icon: Trophy,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500',
    glow: 'shadow-yellow-500/40',
    gradient: 'from-yellow-500 to-amber-500'
  },
];

const TimelineCard = ({ event, index, isLast }: { event: typeof TIMELINE_EVENTS[0], index: number, isLast?: boolean }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "-100px" });
  const isRight = index % 2 === 0;
  const Icon = event.icon;

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex items-center justify-between w-full ${
        isLast ? 'mb-0' : 'mb-6 sm:mb-16 lg:mb-20'
      } ${
        isRight ? 'sm:flex-row-reverse' : 'sm:flex-row'
      } flex-row-reverse`}
    >
      {/* Desktop empty spacer for alternating layout */}
      <div className="hidden sm:block sm:w-5/12" />

      {/* Mask to hide timeline line below the last item */}
      {isLast && (
        <div className="absolute top-1/2 left-[20px] sm:left-1/2 transform -translate-x-1/2 w-10 sm:w-12 bottom-[-200px] bg-[#050914] z-[15]" />
      )}

      {/* Center Icon */}
      <div className="absolute left-[20px] sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className={`relative w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg ${event.glow} p-[2px] sm:p-[3px] overflow-hidden bg-slate-200/60`}
        >
          {/* Animated Icon Border Fill */}
          <div className="absolute inset-0 z-0">
             <motion.div 
               initial={{ height: "0%" }}
               animate={isInView ? { height: "100%" } : { height: "0%" }}
               transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
               className={`w-full bg-gradient-to-b ${event.gradient}`}
             />
          </div>

          <div className={`relative z-10 w-full h-full rounded-full bg-gradient-to-br ${event.gradient} flex items-center justify-center text-white border-[2px] sm:border-[3px] border-white`}>
            <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={2.5} />
          </div>
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: isRight ? 50 : -50 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isRight ? 50 : -50 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="w-full sm:w-5/12 ml-[46px] sm:ml-0"
      >
        <div className="relative rounded-[16px] sm:rounded-[20px] p-[2px] overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 bg-slate-200/50">
          
          {/* Animated Border Fill */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={isInView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            className={`absolute top-0 left-0 w-full bg-gradient-to-b ${event.gradient} z-0`}
          />

          <div className="relative z-10 bg-[#070D22]/85 border border-blue-500/30 backdrop-blur-xl rounded-[14px] sm:rounded-[18px] p-3.5 sm:p-5 lg:p-6 h-full overflow-hidden text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            {/* Subtle hover gradient blob */}
            <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${event.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
            
            <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#050914] border border-blue-500/20 mb-2 sm:mb-3`}>
              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${event.bg} animate-pulse`} />
              <span className={`text-[9px] sm:text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>
                {event.time}
              </span>
            </div>
            
            <h3 className="font-heading font-bold text-base sm:text-xl text-white mb-1 sm:mb-2">
              {event.title}
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {event.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="pt-8 sm:pt-12 pb-8 sm:pb-12 relative bg-[#050914] text-white overflow-hidden">
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

      <div className="section-container relative z-10 max-w-6xl mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-2 rounded-full bg-[#070D22]/80 border border-blue-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)] mb-4 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#00F0FF]">
              Event Schedule
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-3 sm:mb-4">
            24 Hours, <span className="bg-gradient-to-r from-[#2563EB] via-[#00F0FF] to-[#8B5CF6] bg-clip-text text-transparent">Minute by Minute</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-lg text-slate-300 mt-2 sm:mt-4 mx-auto max-w-2xl font-medium px-1">
            Organized by NIITM in association with Nehru College of Management. From kickoff to valedictory — here&apos;s how HackSpark &apos;26 unfolds.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Static background line */}
          <div className="absolute left-[20px] sm:left-1/2 transform sm:-translate-x-1/2 top-0 bottom-0 w-1 sm:w-1.5 bg-blue-950/60 rounded-full border border-blue-500/20" />
          
          {/* Animated progress line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[20px] sm:left-1/2 transform sm:-translate-x-1/2 top-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-b from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6] origin-top rounded-full z-10 shadow-[0_0_15px_rgba(0,240,255,0.6)]" 
          />

          <div className="pt-8">
            {TIMELINE_EVENTS.map((event, i) => (
              <TimelineCard key={event.title} event={event} index={i} isLast={i === TIMELINE_EVENTS.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
