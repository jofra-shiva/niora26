'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="location" className="py-16 sm:py-20 relative bg-[#050914] text-white overflow-hidden">
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
            <span className="text-xs font-black tracking-widest uppercase text-[#00F0FF]">Location</span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3">
            Event{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#00F0FF] to-[#8B5CF6]">
              Venue
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium mt-4 max-w-xl mx-auto">
            Nehru Institute of Information Technology and Management Campus, Nehru Garden, Thirumalayampalayam, Coimbatore - 641105
          </p>
        </motion.div>

        {/* Embedded Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] relative group"
        >
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-20 pointer-events-none">
            <div className="bg-[#070D22]/95 backdrop-blur-xl border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,240,255,0.15)] max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#00F0FF] animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-base sm:text-lg tracking-wide">NIITM Campus</h3>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-mono mt-0.5">Hackathon Venue</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Nehru Institute of Information Technology and Management Campus,<br />
                Nehru Garden, Thirumalayampalayam,<br />
                Coimbatore - 641105
              </p>
            </div>
          </div>
          <iframe 
            src="https://maps.google.com/maps?q=Nehru+Institute+of+Information+Technology+and+Management+Campus,+Nehru+Garden,+Thirumalayampalayam,+Coimbatore&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter opacity-80 transition-all duration-700 hover:opacity-100 hover:filter-none relative z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}
