'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Code, Coffee, Presentation, Rocket, Trophy, Lightbulb, Pizza, Users } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    time: 'Day 1 · 09:00 AM',
    title: 'Registration & Check-in',
    desc: 'Participants arrive, complete registration, and collect their event kits.',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500',
    glow: 'shadow-blue-500/40',
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    time: 'Day 1 · 10:00 AM',
    title: 'Inauguration & Kick-off',
    desc: 'Official inauguration and the formal beginning of the event.',
    icon: Rocket,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500',
    glow: 'shadow-indigo-500/40',
    gradient: 'from-indigo-600 to-blue-500'
  },
  {
    time: 'Day 1 · 01:00 PM',
    title: 'Lunch Break',
    desc: 'Take a break and fuel up for the project development phase.',
    icon: Pizza,
    color: 'text-amber-500',
    bg: 'bg-amber-500',
    glow: 'shadow-amber-500/40',
    gradient: 'from-amber-500 to-orange-400'
  },
  {
    time: 'Day 1 · 06:00 PM',
    title: 'Mentorship Round 1',
    desc: 'Expert mentors will visit the teams, review their progress, provide feedback, and offer design and technical guidance.',
    icon: Lightbulb,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500',
    glow: 'shadow-emerald-500/40',
    gradient: 'from-emerald-600 to-teal-400'
  },
  {
    time: 'Day 1 · 08:00 PM',
    title: 'Dinner',
    desc: 'Dinner served at the venue for all participants.',
    icon: Coffee,
    color: 'text-orange-500',
    bg: 'bg-orange-500',
    glow: 'shadow-orange-500/40',
    gradient: 'from-orange-600 to-red-400'
  },
  {
    time: 'Day 1 · 10:30 PM',
    title: 'Midnight Munchies',
    desc: 'Refreshment break for participants to keep the momentum going.',
    icon: Coffee,
    color: 'text-rose-500',
    bg: 'bg-rose-500',
    glow: 'shadow-rose-500/40',
    gradient: 'from-rose-600 to-pink-500'
  },
  {
    time: 'Day 2 · 07:00 AM',
    title: 'Submission Deadline',
    desc: 'Final project submission deadline. Enjoy a quick breakfast before presentations!',
    icon: Code,
    color: 'text-purple-500',
    bg: 'bg-purple-500',
    glow: 'shadow-purple-500/40',
    gradient: 'from-purple-600 to-indigo-500'
  },
  {
    time: 'Day 2 · 08:00 AM',
    title: 'Project Presentation',
    desc: 'Teams present and demonstrate their completed projects before the evaluation panel.',
    icon: Presentation,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500',
    glow: 'shadow-cyan-500/40',
    gradient: 'from-cyan-600 to-blue-500'
  },
  {
    time: 'Day 2 · 10:00 AM',
    title: 'Valedictory & Prize Distribution',
    desc: 'Final event closing ceremony, winner announcement, and prize distribution.',
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
      className={`relative flex items-center justify-between w-full mb-12 sm:mb-20 ${
        isRight ? 'sm:flex-row-reverse' : 'sm:flex-row'
      } flex-row-reverse`}
    >
      {/* Desktop empty spacer for alternating layout */}
      <div className="hidden sm:block sm:w-5/12" />

      {/* Mask to hide timeline line below the last item */}
      {isLast && (
        <div className="absolute top-1/2 left-[28px] sm:left-1/2 transform -translate-x-1/2 w-12 bottom-[-200px] bg-slate-50 z-[15]" />
      )}

      {/* Center Icon */}
      <div className="absolute left-[28px] sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg ${event.glow} p-[3px] overflow-hidden bg-slate-200/60`}
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

          <div className={`relative z-10 w-full h-full rounded-full bg-gradient-to-br ${event.gradient} flex items-center justify-center text-white border-[3px] border-white`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </div>
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: isRight ? 50 : -50 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isRight ? 50 : -50 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="w-full sm:w-5/12 ml-[70px] sm:ml-0"
      >
        <div className="relative rounded-[20px] p-[2px] overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 bg-slate-200/50">
          
          {/* Animated Border Fill */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={isInView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            className={`absolute top-0 left-0 w-full bg-gradient-to-b ${event.gradient} z-0`}
          />

          <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-[18px] p-5 sm:p-6 h-full overflow-hidden">
            {/* Subtle hover gradient blob */}
            <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${event.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-3`}>
              <span className={`w-2 h-2 rounded-full ${event.bg} animate-pulse`} />
              <span className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>
                {event.time}
              </span>
            </div>
            
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 transition-colors">
              {event.title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
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
    <section id="timeline" className="pt-8 pb-32 relative bg-slate-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-black tracking-widest uppercase text-slate-700">
              Event Schedule
            </span>
          </div>
          <h2 className="section-heading mb-4 text-slate-900">
            24 Hours, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Minute by Minute</span>
          </h2>
          <p className="section-subheading mt-4 text-slate-600 mx-auto max-w-2xl">
            Organized by NIITM in collaboration with Nehru College of Management. From kickoff to valedictory — here's how HackSpark '26 unfolds.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Static background line */}
          <div className="absolute left-[28px] sm:left-1/2 transform sm:-translate-x-1/2 top-0 bottom-0 w-1 sm:w-1.5 bg-slate-200/60 rounded-full" />
          
          {/* Animated progress line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[28px] sm:left-1/2 transform sm:-translate-x-1/2 top-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 origin-top rounded-full z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
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
