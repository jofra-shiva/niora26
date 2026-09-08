'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/firebase/auth';
import { logActivity } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Theme', href: '/#problems' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Prizes', href: '/#prizes' },
  { label: 'Advisory Board', href: '/#advisory' },
  { label: 'Our Team', href: '/#team' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('/');
  const pathname = usePathname();
  const { user, profile } = useAuth();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === '/') {
        const sections = ['team', 'advisory', 'prizes', 'timeline', 'problems', 'about'];
        let current = '/';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 160) {
              current = `/#${section}`;
              break;
            }
          }
        }
        setActiveHash(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      if (user) {
        await logActivity({
          userId: user.uid,
          userName: profile?.fullName,
          activityType: 'LOGOUT',
          description: 'User logged out',
        });
      }
      await logout();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Error logging out');
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/') {
      if (href === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveHash('/');
        return;
      }
      if (href.startsWith('/#')) {
        e.preventDefault();
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          const navOffset = 90;
          const y = element.getBoundingClientRect().top + window.scrollY - navOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Navbar Container - Always Fixed Floating Rounded Pill Dock */}
      <div className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-300">
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full max-w-6xl xl:max-w-7xl"
        >
          <div className="flex items-center justify-between relative overflow-hidden bg-[#050914]/90 backdrop-blur-2xl gap-2 sm:gap-4 px-4 sm:px-6 xl:px-7 py-2.5 sm:py-3 rounded-full border border-blue-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
            {/* Scroll Progress Line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 z-10 origin-left"
              style={{ scaleX }}
            />

            {/* Left Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group outline-none shrink-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-blue-400/50 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-105">
                <Image src="/logoo.png" alt="HackSpark Logo" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight flex items-center gap-1">
                HackSpark
                <span className="text-[#00F0FF] font-black">&apos;26</span>
              </span>
            </Link>

            {/* Desktop Nav links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 bg-[#0A1026]/90 border border-blue-500/25 rounded-full shadow-inner shrink-0">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === '/' ? activeHash === link.href : pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-2.5 xl:px-4 py-1.5 rounded-full text-[11px] xl:text-xs font-bold transition-all duration-200 outline-none whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-white bg-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.6)] font-black'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-xs font-bold text-cyan-400 hover:text-cyan-200 transition-colors whitespace-nowrap">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors whitespace-nowrap">
                    Logout
                  </button>
                </>
              ) : (
                <a href="https://forms.gle/mjS16iuhAF7CTpMMA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 xl:px-6 py-2.5 rounded-full font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] uppercase tracking-wider whitespace-nowrap">
                  REGISTER NOW
                </a>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-slate-300 hover:text-white transition-colors rounded-full bg-blue-950/60 border border-blue-500/30"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[75px] z-40 lg:hidden rounded-2xl bg-[#060B19]/95 backdrop-blur-2xl border border-blue-500/30 shadow-[0_8px_40px_rgba(0,0,0,0.8)] p-4 text-white"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === '/' ? activeHash === link.href : pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                      isActive 
                        ? 'bg-blue-600/30 text-blue-300 border-blue-500/40 shadow-sm' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-blue-500/20 mt-3 pt-4 flex flex-col gap-2.5">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-bold bg-blue-600/30 text-blue-300 text-center border border-blue-500/30">
                      Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="px-4 py-3 rounded-xl text-sm font-bold text-red-400 text-center hover:bg-red-500/10 transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <a href="https://forms.gle/mjS16iuhAF7CTpMMA" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-base font-black bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center shadow-md flex items-center justify-center gap-2">
                    REGISTER NOW <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
