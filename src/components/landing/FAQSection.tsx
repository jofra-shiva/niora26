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
    <section id="faq" className="py-16 sm:py-20 relative bg-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-blue-700">FAQ</span>
          </div>
          <h2 className="section-heading text-slate-900">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Questions
            </span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${
                open === i
                  ? 'border-blue-200 shadow-[0_4px_20px_rgba(37,99,235,0.1)]'
                  : 'border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
              >
                <span className={`font-heading font-semibold text-sm sm:text-base tracking-wide transition-colors ${
                  open === i ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  open === i ? 'bg-blue-100' : 'bg-slate-100'
                }`}>
                  {open === i
                    ? <Minus className="w-4 h-4 text-blue-600" />
                    : <Plus className="w-4 h-4 text-slate-500" />
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
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                      <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 sm:pt-4">
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
