import Link from 'next/link';
import Image from 'next/image';
import { Code2, Mail, MapPin, Globe, Heart } from 'lucide-react';
import { EVENT_NAME, COLLEGE_NAME, COLLEGE_AFFILIATION, DEPARTMENT } from '@/lib/utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      <div className="section-container py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <Image src="/logoo.png" alt="HackSpark Logo" fill className="object-cover" />
              </div>
              <span className="font-logo text-xl text-slate-900">HackSpark '26</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs mb-3 sm:mb-4">
              Code Beyond Limits. Build the Future. A 24-hour hackathon organized by {DEPARTMENT}, {COLLEGE_NAME}.
            </p>
            <p className="text-xs text-slate-400">{COLLEGE_AFFILIATION}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-blue-700 mb-3 sm:mb-4 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/#about' },
                { label: 'Prizes', href: '/#prizes' },
                { label: 'Timeline', href: '/#timeline' },
                { label: 'Problems', href: '/#problems' },
                { label: 'Register', href: '/register' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-blue-700 mb-3 sm:mb-4 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 sm:gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Nehru Nagar, Thirumalayampalayam, Coimbatore - 641105</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="mailto:hackspark26@niitm.ac.in" className="text-xs sm:text-sm hover:text-blue-700 transition-colors break-all">
                  hackspark26@niitm.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs text-slate-400 flex items-center gap-1 font-mono tracking-wider text-center sm:text-left">
            MADE WITH <Heart className="w-3 h-3 text-blue-500 fill-blue-200" /> BY NIITM MCA DEPARTMENT · © {year} HackSpark '26
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-blue-600 transition-colors font-mono uppercase tracking-widest">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-blue-600 transition-colors font-mono uppercase tracking-widest">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
