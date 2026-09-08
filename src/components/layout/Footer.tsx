'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, ArrowUp, Calendar, Clock, Trophy, ExternalLink } from 'lucide-react';
import { EVENT_NAME, COLLEGE_NAME, COLLEGE_AFFILIATION, DEPARTMENT } from '@/lib/utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-cyan-500/30 bg-[#03060E] text-white mt-auto relative overflow-hidden">
      {/* Top glowing cyber accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] via-purple-500 to-transparent shadow-[0_0_12px_#00F0FF]" />
      
      {/* Subtle Background Glows for Desktop */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Institution (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-cyan-400/50 bg-white p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <Image src="/logoo.png" alt="HackSpark Logo" fill sizes="44px" className="object-cover" />
                </div>
                <div>
                  <span className="font-logo text-xl sm:text-2xl font-black text-white tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                    HackSpark <span className="text-[#00F0FF]">&apos;26</span>
                  </span>
                  <p className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">National Level Hackathon</p>
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-4 font-medium">
                Code Beyond Limits. Build the Future. A premier 24-hour national hackathon bringing together visionary developers, creators, and innovators.
              </p>
            </div>

            <p className="text-[11px] text-slate-400 font-medium leading-tight">
              Organized by {DEPARTMENT}, {COLLEGE_NAME}. {COLLEGE_AFFILIATION}.
            </p>
          </div>

          {/* Column 2: Event Highlights (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-[#00F0FF] mb-4 uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_8px_#00F0FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              Event Info
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Date:</span> 8th &amp; 9th Oct 2026
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Mode:</span> 24 Hours Offline
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Prize Pool:</span> Cash Prizes &amp; Trophies
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs">
                  NIITM Campus, Nehru Nagar, Thirumalayampalayam, Coimbatore - 641105
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-[#00F0FF] mb-4 uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_8px_#00F0FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              Connect With Us
            </h3>
            
            {/* Email Contact Links */}
            <div className="space-y-2 mb-4">
              <a 
                href="mailto:hackspark26@niitm.ac.in" 
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#091128] border border-cyan-500/20 hover:border-cyan-400/60 text-xs text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">hackspark26@niitm.ac.in</span>
              </a>
              <a 
                href="mailto:niitmhackathonmca@gmail.com" 
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#091128] border border-cyan-500/20 hover:border-cyan-400/60 text-xs text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">niitmhackathonmca@gmail.com</span>
              </a>
            </div>

            {/* Instagram Link Button */}
            <a 
              href="https://www.instagram.com/niitm_mba_mca?stkn=MWtqNDFzYjZjOTVlaA==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-pink-500/40 hover:border-pink-400 text-xs font-semibold text-white hover:text-pink-300 transition-all duration-300 shadow-sm group w-full justify-center"
            >
              <svg className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@niitm_mba_mca</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-pink-300" />
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-10 pt-6 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono tracking-wider">
            MADE WITH <span className="text-cyan-400">❤️</span> BY <span className="text-white font-semibold">NIITM MCA DEPARTMENT</span> · © {year} HackSpark &apos;26
          </p>

          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToTop} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091128] border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-400 hover:text-white transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)] group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
