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
        className="w-full text-left glass-card rounded-xl px-4 py-3 border border-indigo-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] group"
      >
        <p className="font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">
          {person.name}
        </p>
        <p className="text-xs text-indigo-300/60 font-mono mt-0.5">+91 {person.phone}</p>
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
              className="absolute left-0 top-full mt-2 z-50 w-full glass-card rounded-xl border border-indigo-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-indigo-500/20">
                <p className="text-xs font-mono text-indigo-300/80 uppercase tracking-widest">Contact {person.name.split(' ')[0]}</p>
                <button onClick={() => setOpen(false)}>
                  <X className="w-3.5 h-3.5 text-indigo-400 hover:text-white transition-colors" />
                </button>
              </div>
              <a
                href={`https://wa.me/91${person.phone}?text=Hi%2C%20I%20have%20a%20query%20regarding%20HACKSPARK%2026%20Hackathon.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-500/10 transition-colors group/wa border-b border-indigo-500/10"
                onClick={() => setOpen(false)}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover/wa:text-emerald-300 transition-colors">WhatsApp</p>
                  <p className="text-xs text-indigo-300/50">Send a message</p>
                </div>
              </a>
              <a
                href={`tel:+91${person.phone}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 transition-colors group/call"
                onClick={() => setOpen(false)}
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover/call:text-cyan-300 transition-colors">Call</p>
                  <p className="text-xs text-indigo-300/50">+91 {person.phone}</p>
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
    <section id="contact" className="py-20 relative">
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-primary text-xs px-4 py-1.5 mb-6 inline-flex border-indigo-500/40 bg-indigo-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(79,70,229,0.2)] tracking-widest uppercase text-indigo-200">Contact Us</span>
          <h2 className="section-heading text-white">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Touch</span></h2>
          <p className="section-subheading mt-4 text-indigo-100/70">
            Have questions? Reach out to our coordinators directly via WhatsApp or call.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email + Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="glass-card rounded-xl p-5 flex items-start gap-4 border-indigo-500/20 hover:border-cyan-400/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="form-label text-cyan-400 tracking-widest">Email</p>
                <a href="mailto:hackspark26@niitm.ac.in" className="text-sm text-indigo-100 hover:text-white transition-colors break-all">
                  hackspark26@niitm.ac.in
                </a>
              </div>
            </div>
            <div className="glass-card rounded-xl p-5 flex items-start gap-4 border-indigo-500/20 hover:border-violet-400/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="form-label text-cyan-400 tracking-widest">Venue</p>
                <p className="text-sm text-indigo-100">
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
            className="glass-card rounded-xl p-5 border-indigo-500/20"
          >
            <p className="form-label text-cyan-400 tracking-widest mb-3">Convenors</p>
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
            className="glass-card rounded-xl p-5 border-indigo-500/20"
          >
            <p className="form-label text-cyan-400 tracking-widest mb-3">Student Organizers</p>
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
