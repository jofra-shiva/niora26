'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/utils/constants';

export default function RegisterPage() {
  useEffect(() => {
    // Auto redirect to Google Form
    window.location.href = GOOGLE_FORM_URL;
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#050914] text-white relative overflow-hidden">
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.18),transparent_65%),radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_55%)]" />

      {/* Cyber Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-md w-full text-center bg-[#070D22]/90 backdrop-blur-2xl rounded-2xl p-8 border border-cyan-400/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cyan-400/50 bg-white p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Image src="/logoo.png" alt="HackSpark Logo" fill className="object-cover rounded-full" />
          </div>
          <span className="font-heading font-black text-2xl text-white tracking-wider">
            HackSpark <span className="text-[#00F0FF]">&apos;26</span>
          </span>
        </div>

        <h1 className="font-heading font-black text-2xl text-white mb-2">Redirecting to Registration...</h1>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          You are being redirected to the official HackSpark &apos;26 Google Registration Form.
        </p>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-black text-sm text-white bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#00F0FF] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] w-full uppercase tracking-wider"
        >
          <span>Open Registration Form</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="mt-6 pt-4 border-t border-cyan-500/20">
          <Link href="/" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
            <span>Return to Home</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
