import Link from 'next/link';
import Image from 'next/image';
import { Code2, Mail, MapPin, Globe, Heart } from 'lucide-react';
import { EVENT_NAME, COLLEGE_NAME, COLLEGE_AFFILIATION, DEPARTMENT } from '@/lib/utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-500/30 bg-[#03060E] text-white mt-auto relative overflow-hidden">
      {/* Top glowing accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent" />
      <div className="section-container py-8 sm:py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-1 xs:col-span-2">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-6">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-cyan-400/40 bg-white p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Image src="/logoo.png" alt="HackSpark Logo" fill className="object-cover" />
              </div>
              <span className="font-logo text-lg sm:text-xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">HackSpark &apos;26</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs mb-2.5 sm:mb-4 font-medium">
              Code Beyond Limits. Build the Future. A 24-hour hackathon organized by {DEPARTMENT}, {COLLEGE_NAME}.
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium">{COLLEGE_AFFILIATION}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-xs sm:text-sm text-[#00F0FF] mb-2.5 sm:mb-4 uppercase tracking-widest drop-shadow-[0_0_8px_#00F0FF]">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/#about' },
                { label: 'Prizes', href: '/#prizes' },
                { label: 'Timeline', href: '/#timeline' },
                { label: 'Theme', href: '/#problems' },
                { label: 'Register', href: '/register' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs sm:text-sm text-slate-300 hover:text-[#00F0FF] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-xs sm:text-sm text-[#00F0FF] mb-2.5 sm:mb-4 uppercase tracking-widest drop-shadow-[0_0_8px_#00F0FF]">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                <span className="text-[11px] sm:text-sm">Nehru Nagar, Thirumalayampalayam, Coimbatore - 641105</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:hackspark26@niitm.ac.in" className="text-[11px] sm:text-sm hover:text-[#00F0FF] transition-colors break-all">
                  hackspark26@niitm.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1 font-mono tracking-wider flex-wrap">
            MADE WITH <Heart className="w-3 h-3 text-[#00F0FF] fill-cyan-400 inline" /> BY NIITM MCA DEPARTMENT · © {year} HackSpark &apos;26
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="text-[10px] sm:text-xs text-slate-400 hover:text-[#00F0FF] transition-colors font-mono uppercase tracking-widest">Privacy</Link>
            <Link href="/terms" className="text-[10px] sm:text-xs text-slate-400 hover:text-[#00F0FF] transition-colors font-mono uppercase tracking-widest">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
