'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, MapPin, X } from 'lucide-react';

const CONVENORS = [
  { name: 'Meera Bai C', phone: '9944560889' },
  { name: 'Indulekha K V', phone: '7561078733' },
];

const STUDENT_ORGANIZERS = [
  { name: 'Harsath G', phone: '9047023266' },
  { name: 'Sivaprakash M', phone: '8838939801' },
];

function ContactCard({ person }: { person: { name: string; phone: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left bg-white rounded-xl px-4 py-3 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(37,99,235,0.1)] group"
      >
        <p className="font-heading font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
          {person.name}
        </p>
        <p className="text-xs text-slate-400 font-mono mt-0.5">+91 {person.phone}</p>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full mt-2 z-50 w-full bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Contact {person.name.split(' ')[0]}</p>
                <button onClick={() => setOpen(false)}>
                  <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700 transition-colors" />
                </button>
              </div>
              <a
                href={`https://wa.me/91${person.phone}?text=Hi%2C%20I%20have%20a%20query%20regarding%20HACKSPARK%2026%20Hackathon.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-slate-100 group/wa"
                onClick={() => setOpen(false)}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 group-hover/wa:text-emerald-700 transition-colors">WhatsApp</p>
                  <p className="text-xs text-slate-400">Send a message</p>
                </div>
              </a>
              <a
                href={`tel:+91${person.phone}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group/call"
                onClick={() => setOpen(false)}
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 group-hover/call:text-blue-700 transition-colors">Call</p>
                  <p className="text-xs text-slate-400">+91 {person.phone}</p>
                </div>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-16 sm:py-20 relative bg-slate-50">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-blue-700">Contact Us</span>
          </div>
          <h2 className="section-heading text-slate-900">
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Touch
            </span>
          </h2>
          <p className="section-subheading mt-4 text-slate-600">
            Have questions? Reach out to our coordinators directly via WhatsApp or call.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Email + Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="bg-white rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 border border-slate-200 hover:border-blue-200 transition-colors shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="form-label text-blue-600 tracking-widest">Email</p>
                <a href="mailto:hackspark26@niitm.ac.in" className="text-xs sm:text-sm text-slate-700 hover:text-blue-600 transition-colors break-all font-medium">
                  hackspark26@niitm.ac.in
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 border border-slate-200 hover:border-blue-200 transition-colors shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              </div>
              <div>
                <p className="form-label text-blue-600 tracking-widest">Venue</p>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  NIITM Campus, Nehru Nagar<br />
                  Thirumalayampalayam<br />
                  Coimbatore - 641105
                </p>
              </div>
            </div>
          </motion.div>

          {/* Convenors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm"
          >
            <p className="form-label text-blue-600 tracking-widest mb-3">Convenors</p>
            <div className="space-y-2">
              {CONVENORS.map((p) => (
                <ContactCard key={p.phone} person={p} />
              ))}
            </div>
          </motion.div>

          {/* Student Organizers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm sm:col-span-2 md:col-span-1"
          >
            <p className="form-label text-blue-600 tracking-widest mb-3">Student Organizers</p>
            <div className="space-y-2">
              {STUDENT_ORGANIZERS.map((p) => (
                <ContactCard key={p.phone} person={p} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
