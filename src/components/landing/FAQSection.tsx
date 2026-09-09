'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "Who can participate in HACKSPARK '26?",
    a: "HACKSPARK '26 is open to all college students — undergraduate and postgraduate. Students from any college, any course, and any discipline can participate.",
  },
  {
    q: 'What is the team size?',
    a: 'Teams must have a minimum of 2 members and a maximum of 5 members. Solo participation is not allowed.',
  },
  {
    q: 'What is the registration fee?',
    a: 'The registration fee is ₹500 per team (configurable). This covers food, accommodation, kit, and event access for the entire 24 hours.',
  },
  {
    q: 'Do we need to come with a project idea?',
    a: 'Problem statements will be revealed at the inauguration on 09 October 2026. Teams should arrive with general domain knowledge and be ready to innovate.',
  },
  {
    q: 'What should we bring?',
    a: 'Bring your laptop, charger, and any hardware components you may need. Ensure you have all required software installed before arriving.',
  },
  {
    q: 'Is accommodation provided?',
    a: 'Yes! Food and accommodation are arranged for all registered teams throughout the 24-hours event at the venue.',
  },
  {
    q: 'How are projects judged?',
    a: 'Projects are evaluated on Innovation & Creativity, Technical Complexity, Impact & Feasibility, Design/UX, and Presentation Quality.',
  },
  {
    q: 'Can team members be from different colleges?',
    a: 'Yes, cross-college teams are allowed! Your team members can be from different institutions.',
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-10 sm:py-20 relative bg-[#050914] text-white overflow-hidden">
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.12),transparent_65%),radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)]" />

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
          className="text-center mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#070D22]/85 border border-blue-500/30 backdrop-blur-xl mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-cyan-300">FAQ</span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6]">
              Questions
            </span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`bg-[#070D22]/85 rounded-xl sm:rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-300 ${
                open === i
                  ? 'border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.2)] bg-[#0A1332]/95'
                  : 'border-blue-500/30 hover:border-cyan-500/40 shadow-[0_5px_20px_rgba(0,0,0,0.6)]'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left gap-3 sm:gap-4"
              >
                <span className={`font-heading font-semibold text-xs xs:text-sm sm:text-base tracking-wide transition-colors ${
                  open === i ? 'text-[#00F0FF]' : 'text-white hover:text-[#00F0FF]'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  open === i ? 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-400/40' : 'bg-blue-950/60 text-slate-400 border border-blue-500/20'
                }`}>
                  {open === i
                    ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F0FF]" />
                    : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  }
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-blue-500/20 pt-2.5 sm:pt-4">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
