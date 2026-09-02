'use client';

import { motion } from 'framer-motion';
import { Brain, Cpu, Wallet, Shield, HeartPulse, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const PROBLEMS = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Solve real-world problems using predictive models, generative AI, and computer vision.',
    delay: 0.1,
    gradient: 'from-blue-600 to-blue-500',
    accent: 'blue-500',
  },
  {
    icon: Cpu,
    title: 'IoT & Smart Systems',
    description: 'Build connected devices and automated systems for smart homes, cities, and industries.',
    delay: 0.2,
    gradient: 'from-indigo-600 to-purple-600',
    accent: 'indigo-500',
  },
  {
    icon: Wallet,
    title: 'FinTech & Web3',
    description: 'Innovate the future of finance with blockchain, decentralized apps, and smart contracts.',
    delay: 0.3,
    gradient: 'from-cyan-500 to-blue-500',
    accent: 'cyan-500',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Develop solutions to protect data privacy, prevent attacks, and secure digital identities.',
    delay: 0.4,
    gradient: 'from-emerald-500 to-teal-500',
    accent: 'emerald-500',
  },
  {
    icon: HeartPulse,
    title: 'HealthTech',
    description: 'Transform healthcare accessibility, patient monitoring, and medical data analysis.',
    delay: 0.5,
    gradient: 'from-rose-500 to-pink-500',
    accent: 'rose-500',
  },
  {
    icon: Sparkles,
    title: 'Open Innovation',
    description: 'Have a crazy idea? Build anything that solves a unique problem creatively.',
    delay: 0.6,
    gradient: 'from-amber-500 to-orange-500',
    accent: 'amber-500',
  }
];

export default function ProblemsSection() {
  return (
    <section id="problems" className="pt-8 pb-16 sm:pb-24 relative overflow-hidden bg-slate-50/50">
      {/* Background Grid Pattern with Radial Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-60 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-blue-700">
              Problem Statements
            </span>
          </div>
          <h2 className="section-heading mb-4 text-slate-900">Choose Your Challenge</h2>
          <p className="section-subheading text-slate-600">
            Tackle the most pressing issues of our time across 6 diverse tracks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {PROBLEMS.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: prob.delay }}
                className="group relative h-full flex"
              >
                <div className="relative w-full h-full bg-white border border-slate-200/80 rounded-[26px] p-5 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden z-10">
                  
                  {/* Top Subtle Gradient Line Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-${prob.accent} to-transparent`} />
                  
                  {/* Subtle Background Icon */}
                  <div className={`absolute right-0 bottom-0 opacity-[0.04] text-slate-900 group-hover:text-${prob.accent} group-hover:opacity-10 transition-colors duration-500 pointer-events-none`}>
                    <Icon className="w-48 h-48" strokeWidth={1} />
                  </div>

                  {/* Header (Icon + Text) */}
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <div className={`w-14 h-14 shrink-0 rounded-[20px] bg-gradient-to-br ${prob.gradient} flex items-center justify-center text-white shadow-md shadow-slate-200 group-hover:scale-[1.05] transition-transform duration-300`}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    
                    <h3 className="font-bold text-2xl leading-tight tracking-tight text-slate-900">
                      {prob.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed font-medium relative z-10 mb-4">
                    {prob.description}
                  </p>

                  <div className="flex items-center text-blue-600 text-xs font-mono uppercase tracking-widest font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10 mt-auto pt-2">
                    <Link href="/register" className="flex items-center hover:text-blue-800">
                      <span>Register Track</span>
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link href="/login" className="btn-primary px-8 py-3 text-base group">
            Ready to Build? Login Now
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
