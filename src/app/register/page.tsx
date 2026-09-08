'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Code2 } from 'lucide-react';
import { registerWithEmail } from '@/lib/firebase/auth';
import { createUserProfile, logActivity } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const user = await registerWithEmail(data.email, data.password, data.fullName);

      // Create Firestore profile doc
      await createUserProfile(user.uid, {
        fullName: data.fullName,
        email: data.email,
        role: 'participant',
      });

      // Set session cookie
      const token = await user.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      await logActivity({
        userId: user.uid,
        userName: data.fullName,
        activityType: 'ACCOUNT_CREATED',
        description: 'New account created',
      });

      toast.success('Account created successfully!');
      router.push('/register/complete');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('email-already-in-use')) {
        toast.error('This email is already registered. Please log in.');
      } else if (msg.includes('weak-password')) {
        toast.error('Password is too weak. Use at least 8 characters.');
      } else if (msg.includes('API key') || msg.includes('api-key') || msg.includes('placeholder') || msg.includes('400') || msg.includes('Bad Request')) {
        toast.error('Firebase API key is missing! Please configure your .env.local file with real Firebase credentials.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative bg-[#050914] text-white overflow-hidden">
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.15),transparent_65%),radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_55%)]" />

      {/* Cyber Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.4)] p-0.5 bg-white">
              <Image src="/logoo.png" alt="HackSpark Logo" width={38} height={38} className="object-cover rounded-full" />
            </div>
            <span className="font-heading font-black text-2xl text-white tracking-tight">
              HackSpark <span className="text-[#00F0FF]">'26</span>
            </span>
          </Link>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">Create Your Account</h1>
          <p className="text-xs font-mono font-bold text-cyan-300 mt-1 uppercase tracking-widest">Step 1 of 7 — Account Setup</p>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-blue-950/80 rounded-full overflow-hidden border border-blue-500/20">
            <div className="h-full w-[14%] rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] shadow-[0_0_10px_#00F0FF]" />
          </div>
        </div>

        <div className="bg-[#070D22]/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <input
                  {...register('fullName')}
                  placeholder="John Doe"
                  className="w-full bg-[#0B1536]/90 border border-blue-500/30 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-all"
                  autoComplete="name"
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@college.edu"
                  className="w-full bg-[#0B1536]/90 border border-blue-500/30 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-all"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <input
                  {...register('password')}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min 8 characters"
                  className="w-full bg-[#0B1536]/90 border border-blue-500/30 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-400 outline-none transition-all"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <input
                  {...register('confirmPassword')}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Repeat password"
                  className="w-full bg-[#0B1536]/90 border border-blue-500/30 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-all"
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-[#00F0FF] hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-[#00F0FF] hover:underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-black text-sm text-white bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] uppercase tracking-wider flex items-center justify-center gap-2 border border-blue-400/30 cursor-pointer"
              id="register-submit-btn"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-blue-500/20" />
            <span className="text-xs font-mono text-slate-400 uppercase">or</span>
            <div className="h-px flex-1 bg-blue-500/20" />
          </div>

          <p className="text-center text-sm text-slate-300">
            Already registered?{' '}
            <Link href="/login" className="text-[#00F0FF] font-bold hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
