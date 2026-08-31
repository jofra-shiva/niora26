'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ClipboardList, CreditCard, Megaphone, Code2,
  BarChart3, Settings, LogOut, Menu, X, ChevronRight,
  Activity, MessageSquare, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/firebase/auth';
import { logActivity } from '@/lib/firebase/firestore';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const ADMIN_NAV = [
  { label: 'Overview', href: '/admin', icon: BarChart3 },
  { label: 'Participants', href: '/admin/participants', icon: Users },
  { label: 'Teams', href: '/admin/teams', icon: Users },
  { label: 'Registrations', href: '/admin/registrations', icon: ClipboardList },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Submissions', href: '/admin/submissions', icon: Code2 },
  { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Activity', href: '/admin/activity', icon: Activity },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login?from=/admin');
      else if (!isAdmin) router.push('/dashboard');
    }
  }, [user, loading, isAdmin, router]);

  const handleLogout = async () => {
    if (user) await logActivity({ userId: user.uid, activityType: 'LOGOUT', description: 'Admin logged out' });
    await logout();
    router.push('/');
    toast.success('Logged out');
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const Sidebar = () => (
    <>
      <div className="px-4 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 flex items-center justify-center bg-[#6a35ff] rounded-xl shadow-sm">
            <span className="font-logo text-2xl font-bold text-white">N</span>
          </div>
          <div>
            <span className="font-logo text-lg text-[#6a35ff] leading-none block">HackSpark '26</span>
            <span className="text-[10px] text-rose-500 font-semibold tracking-wider uppercase mt-0.5 block">Admin Panel</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xs font-bold">
            {(profile?.fullName || 'A').charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{profile?.fullName || 'Admin'}</p>
            <span className="badge-danger text-[10px]">Admin</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {ADMIN_NAV.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-slate-100 space-y-1">
        <Link href="/dashboard" className="sidebar-item text-indigo-500">
          <Users className="w-4 h-4" />
          Switch to Participant View
        </Link>
        <button onClick={handleLogout} className="sidebar-item w-full text-red-400 hover:text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex flex-col w-60 xl:w-64 bg-white border-r border-slate-100 fixed h-full z-20">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-100 z-40 flex flex-col lg:hidden"
            >
              <div className="absolute top-3 right-3">
                <button onClick={() => setSidebarOpen(false)} className="btn-ghost p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-60 xl:ml-64 flex flex-col min-h-screen">
        <header className="lg:hidden glass-card border-b border-white/50 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="btn-ghost p-2">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading font-bold text-sm">
            <span className="gradient-text">HackSpark '26</span>
            <span className="text-rose-500 text-xs ml-2">Admin</span>
          </span>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
