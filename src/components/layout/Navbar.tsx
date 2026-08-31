'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/firebase/auth';
import { logActivity } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Problems', href: '/#problems' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Prizes', href: '/#prizes' },
  { label: 'Our Team', href: '/#team' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('/');
  const pathname = usePathname();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === '/') {
        const sections = ['team', 'prizes', 'timeline', 'problems', 'about'];
        let current = '/';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200) {
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

  return (
    <>
      {/* Floating bottom pill navbar */}
      <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full max-w-3xl"
        >
          <div
            className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(37,99,235,0.08)] border border-slate-200/80'
                : 'bg-white/85 backdrop-blur-lg shadow-[0_8px_24px_rgba(0,0,0,0.10),0_2px_6px_rgba(37,99,235,0.06)] border border-slate-100'
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group outline-none shrink-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-200">
                <Image src="/logoo.png" alt="HackSpark Logo" fill className="object-cover" />
              </div>
              <span className="font-heading font-semibold text-base text-slate-900 tracking-tight hidden sm:block">
                HackSpark <span className="text-blue-600 font-medium">&apos;26</span>
              </span>
            </Link>

            {/* Desktop Nav links */}
            <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-slate-100/80 border border-slate-200/60">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === '/' ? activeHash === link.href : pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 outline-none ${
                      isActive
                        ? 'text-white bg-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-white'
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
                  <Link href="/dashboard" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-200 shadow-sm">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 bottom-[80px] z-40 lg:hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_-4px_32px_rgba(0,0,0,0.12)] p-3"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === '/' ? activeHash === link.href : pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors border ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600 border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-slate-100 mt-3 pt-4 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 text-center border border-blue-100">
                      Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-500 text-center hover:bg-red-50 hover:text-red-600 transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white text-center">
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
