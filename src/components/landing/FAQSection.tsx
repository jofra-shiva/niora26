'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Who can participate in HACKSPARK \'26?',
    a: 'HACKSPARK \'26 is open to all college students — undergraduate and postgraduate. Students from any college, any course, and any discipline can participate.',
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
    a: 'Yes! Food and accommodation are arranged for all registered teams throughout the 24-hour event at the venue.',
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
    <section id="faq" className="py-20 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-primary text-xs px-4 py-1.5 mb-6 inline-flex border-indigo-500/40 bg-indigo-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(79,70,229,0.2)] tracking-widest uppercase text-indigo-200">FAQ</span>
          <h2 className="section-heading text-white">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Questions</span></h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`glass-card rounded-xl overflow-hidden border border-indigo-500/20 transition-all duration-300 ${open === i ? 'shadow-[0_0_20px_rgba(34,211,238,0.15)] border-cyan-500/30' : 'hover:border-indigo-400/40'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <span className={`font-heading font-semibold text-sm sm:text-base tracking-wide transition-colors ${open === i ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-indigo-100 hover:text-white'}`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  open === i ? 'bg-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-indigo-500/10'
                }`}>
                  {open === i
                    ? <Minus className="w-4 h-4 text-cyan-400" />
                    : <Plus className="w-4 h-4 text-indigo-400" />
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
                    <div className="px-5 pb-5">
                      <p className="text-sm text-indigo-200/70 leading-relaxed border-t border-indigo-500/20 pt-4">
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
