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
        className="w-full text-left bg-[#0B1536]/80 rounded-xl px-4 py-3 border border-blue-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] group backdrop-blur-xl"
      >
        <p className="font-heading font-semibold text-white group-hover:text-[#00F0FF] transition-colors text-sm">
          {person.name}
        </p>
        <p className="text-xs text-cyan-400/60 font-mono mt-0.5">+91 {person.phone}</p>
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
              className="absolute left-0 top-full mt-2 z-50 w-full bg-[#070D22] rounded-xl border border-blue-500/40 shadow-[0_0_30px_rgba(0,240,255,0.15)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-blue-500/20">
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Contact {person.name.split(' ')[0]}</p>
                <button onClick={() => setOpen(false)}>
                  <X className="w-3.5 h-3.5 text-slate-400 hover:text-white transition-colors" />
                </button>
              </div>
              <a
                href={`https://wa.me/91${person.phone}?text=Hi%2C%20I%20have%20a%20query%20regarding%20HACKSPARK%2026%20Hackathon.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-900/30 transition-colors border-b border-blue-500/20 group/wa"
                onClick={() => setOpen(false)}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover/wa:text-emerald-400 transition-colors">WhatsApp</p>
                  <p className="text-xs text-slate-500">Send a message</p>
                </div>
              </a>
              <a
                href={`tel:+91${person.phone}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/30 transition-colors group/call"
                onClick={() => setOpen(false)}
              >
                <div className="w-7 h-7 rounded-lg bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover/call:text-cyan-400 transition-colors">Call</p>
                  <p className="text-xs text-slate-500">+91 {person.phone}</p>
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
    <section id="contact" className="py-16 sm:py-20 relative bg-[#050914] text-white overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,240,255,0.1),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%)]" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,240,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070D22]/80 border border-blue-500/30 mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-[#00F0FF]">Contact Us</span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3">
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#00F0FF] to-[#8B5CF6]">
              Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium mt-4 max-w-xl mx-auto">
            Have questions? Reach out to our coordinators directly via WhatsApp or call.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

          {/* Email + Venue + Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Email */}
            <div className="bg-[#0B1536]/80 backdrop-blur-xl rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 border border-blue-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-900/50 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-cyan-400 mb-1">Email</p>
                <a href="mailto:hackspark26@niitm.ac.in" className="text-xs sm:text-sm text-slate-300 hover:text-[#00F0FF] transition-colors break-all font-medium block">
                  hackspark26@niitm.ac.in
                </a>
                <a href="mailto:niitmhackathonmca@gmail.com" className="text-xs sm:text-sm text-slate-300 hover:text-[#00F0FF] transition-colors break-all font-medium block mt-1">
                  niitmhackathonmca@gmail.com
                </a>
              </div>
            </div>

            {/* Venue */}
            <div className="bg-[#0B1536]/80 backdrop-blur-xl rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 border border-blue-500/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-purple-900/50 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-purple-400 mb-1">Venue</p>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  NIITM Campus, Nehru Nagar<br />
                  Thirumalayampalayam<br />
                  Coimbatore - 641105
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-[#0B1536]/80 backdrop-blur-xl rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 border border-pink-500/30 hover:border-pink-400/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-pink-900/40 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-pink-400 mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/niitm_mba_mca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-slate-300 hover:text-pink-400 transition-colors break-all font-medium"
                >
                  @niitm_mba_mca
                </a>
              </div>
            </div>
          </motion.div>

          {/* Convenors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0B1536]/80 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-blue-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">Convenors</p>
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
            className="bg-[#0B1536]/80 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-blue-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)] sm:col-span-2 md:col-span-1"
          >
            <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">Student Organizers</p>
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
