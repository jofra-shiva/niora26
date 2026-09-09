'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Wallet, Shield, HeartPulse, Sparkles, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

const PROBLEMS = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Solve real-world problems using predictive models, generative AI, and computer vision.',
    modalDescription: `Dive into the forefront of technological innovation by solving real-world problems using Artificial Intelligence and Machine Learning.
You can build intelligent systems that address critical challenges such as:
• Government scheme recommendation systems.
• Road accident risk & traffic management.
• Smart hospital queue management.
• Crop disease detection & smart farming.
• Optimized waste collection systems.`,
    delay: 0.1,
    gradient: 'from-blue-600 to-blue-500',
    accent: 'blue-500',
    statements: [
      {
        title: 'AI-Based Government Scheme Eligibility & Recommendation System',
        desc: "Many people are unaware of the government schemes and financial benefits they are eligible for. This project uses AI and Machine Learning to analyze a person's age, income, occupation, education, location, and other details to identify suitable government schemes. The system can also use NLP and OCR to understand user queries and documents, making government benefits more accessible to everyone."
      },
      {
        title: 'AI-Powered Road Accident Risk Prediction System',
        desc: 'Road accidents frequently occur due to dangerous road conditions, heavy traffic, weather, and human factors. This project uses Machine Learning to analyze historical accident data, traffic density, weather conditions, road conditions, and time-based patterns to identify accident-prone areas and predict risk levels. The system can help authorities take preventive action before accidents occur.'
      },
      {
        title: 'AI-Based Smart Hospital Queue & Emergency Management System',
        desc: 'Overcrowding and long waiting times are major problems in hospitals, especially in emergency departments. This project uses AI to analyze patient symptoms, medical information, doctor availability, and hospital workload to predict patient priority and waiting time. It can intelligently organize queues and help hospitals allocate doctors and resources more efficiently.'
      },
      {
        title: 'AI-Powered Crop Disease Detection & Smart Farming Assistant',
        desc: 'Farmers often struggle to identify crop diseases at an early stage and make the right decisions about treatment and selling their produce. This project uses Computer Vision to detect diseases from crop or leaf images and Machine Learning to provide suitable recommendations. It can also analyze weather, soil conditions, and market trends to help farmers make better farming and selling decisions.'
      },
      {
        title: 'AI-Based Smart Waste Collection & Route Optimization System',
        desc: 'Traditional waste collection systems often follow fixed routes, which can result in unnecessary trips and overflowing garbage bins. This project uses AI and Machine Learning to predict when garbage bins are likely to become full based on historical collection patterns, sensor data, and location information. The system then generates optimized collection routes to reduce fuel consumption, operational costs, and environmental impact.'
      }
    ]
  },
  {
    icon: Cpu,
    title: 'IoT & Smart Systems',
    description: 'Build connected devices and automated systems for smart homes, cities, and industries.',
    modalDescription: `Build connected devices and automated systems for smart homes, cities, and industries.
You can build innovative hardware-software integrations such as:
• Smart water leakage detection & shutoff.
• IoT-based air quality monitoring network.
• Intelligent street lighting systems.
• Wearable real-time elderly fall detection.
• Automated smart parking allocation.`,
    delay: 0.2,
    gradient: 'from-indigo-600 to-purple-600',
    accent: 'indigo-500',
    statements: [
      { title: 'Smart Water Leakage Detection and Shutoff System.', desc: '' },
      { title: 'IoT-based Air Quality Monitoring and Alert Network.', desc: '' },
      { title: 'Intelligent Street Lighting for Energy Efficiency.', desc: '' },
      { title: 'Wearable Device for Real-time Elderly Fall Detection.', desc: '' },
      { title: 'Automated Smart Parking Allocation System.', desc: '' }
    ]
  },
  {
    icon: Wallet,
    title: 'FinTech & Web3',
    description: 'Innovate the future of finance with blockchain, decentralized apps, and smart contracts.',
    modalDescription: `Innovate the future of finance with blockchain, decentralized apps, and smart contracts.
You can build next-generation financial tools such as:
• Decentralized peer-to-peer micro-lending.
• AI-driven personal finance assistants.
• Real-time digital transaction fraud detection.
• Smart contract-based transparent charity.
• Blockchain-verified supply chains.`,
    delay: 0.3,
    gradient: 'from-cyan-500 to-blue-500',
    accent: 'cyan-500',
    statements: [
      { title: 'Decentralized Peer-to-Peer Micro-Lending Platform.', desc: '' },
      { title: 'AI-driven Personal Finance and Budgeting Assistant.', desc: '' },
      { title: 'Fraud Detection in Real-time Digital Transactions.', desc: '' },
      { title: 'Smart Contract-based Transparent Charity Donation System.', desc: '' },
      { title: 'Blockchain-verified Supply Chain for Counterfeit Prevention.', desc: '' }
    ]
  },
  {
    icon: Shield,
    title: 'Cyber Security',
    description: 'Develop solutions to protect data privacy, prevent attacks, and secure digital identities.',
    modalDescription: `Develop solutions to protect data privacy, prevent attacks, and secure digital identities.
You can build robust security architectures such as:
• Zero-trust network access systems.
• AI-based phishing email detection.
• Secure decentralized password managers.
• Automated web vulnerability scanning.
• Behavioral biometrics authentication.`,
    delay: 0.4,
    gradient: 'from-emerald-500 to-teal-500',
    accent: 'emerald-500',
    statements: [
      { title: 'Zero-Trust Network Access for Remote Workforces.', desc: '' },
      { title: 'AI-based Phishing Email Detection and Isolation.', desc: '' },
      { title: 'Secure and Decentralized Password Manager.', desc: '' },
      { title: 'Automated Vulnerability Scanning for Web Applications.', desc: '' },
      { title: 'Behavioral Biometrics for Continuous Authentication.', desc: '' }
    ]
  },
  {
    icon: HeartPulse,
    title: 'HealthTech',
    description: 'Transform healthcare accessibility, patient monitoring, and medical data analysis.',
    modalDescription: `Transform healthcare accessibility, patient monitoring, and medical data analysis.
You can build life-saving medical applications such as:
• AI-powered rural telemedicine platforms.
• Real-time patient vital monitoring.
• AI mental health support chatbots.
• Secure blockchain electronic health records.
• Non-invasive dietary tracking systems.`,
    delay: 0.5,
    gradient: 'from-rose-500 to-pink-500',
    accent: 'rose-500',
    statements: [
      { title: 'Telemedicine Platform for Rural Areas with AI Diagnostics.', desc: '' },
      { title: 'Real-time Patient Vital Monitoring and Alerting.', desc: '' },
      { title: 'AI-powered Mental Health Chatbot and Support System.', desc: '' },
      { title: 'Blockchain for Secure Electronic Health Records.', desc: '' },
      { title: 'Non-invasive Dietary Tracking via Computer Vision.', desc: '' }
    ]
  },
  {
    icon: Sparkles,
    title: 'Open Innovation',
    description: 'Have a crazy idea? Build anything that solves a unique problem creatively.',
    modalDescription: `Have a crazy idea? Build anything that solves a unique problem creatively.
You can explore unstructured and wild ideas such as:
• Tech for empowering marginalized communities.
• Carbon footprint tracking for climate change.
• Accessibility tools for people with disabilities.
• Gamified and immersive EdTech platforms.
• Disaster response and resource allocation.`,
    delay: 0.6,
    gradient: 'from-amber-500 to-orange-500',
    accent: 'amber-500',
    statements: [
      { title: 'Tech for Social Good: Empowering Marginalized Communities.', desc: '' },
      { title: 'Climate Change Mitigation and Carbon Footprint Tracking.', desc: '' },
      { title: 'Enhancing Accessibility tools for People with Disabilities.', desc: '' },
      { title: 'Next-Gen EdTech for Gamified and Immersive Learning.', desc: '' },
      { title: 'Disaster Response and Resource Allocation System.', desc: '' }
    ]
  }
];

export default function ProblemsSection() {
  const [selectedTrack, setSelectedTrack] = useState<typeof PROBLEMS[0] | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedTrack) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTrack]);

  return (
    <section id="problems" className="pt-12 pb-16 sm:pb-24 relative overflow-hidden bg-[#050914] text-white">
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.12),transparent_65%),radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_55%)]" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="section-container relative z-10 max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#070D22]/80 border border-blue-500/30 mb-4 sm:mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#00F0FF]">
              Problem Statements
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-3 sm:mb-4">Choose Your Challenge</h2>
          <p className="text-xs xs:text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto px-1">
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
                className="group relative h-full flex cursor-pointer"
                onClick={() => setSelectedTrack(prob)}
              >
                <div className="relative w-full h-full bg-[#070D22]/85 border border-blue-500/30 backdrop-blur-xl rounded-[22px] sm:rounded-[26px] p-5 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_12px_40px_rgba(0,240,255,0.2)] overflow-hidden z-10 text-white">
                  
                  {/* Top Subtle Gradient Line Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent`} />
                  
                  {/* Subtle Background Icon */}
                  <div className={`absolute right-0 bottom-0 opacity-[0.04] text-white group-hover:text-cyan-400 group-hover:opacity-10 transition-colors duration-500 pointer-events-none`}>
                    <Icon className="w-36 h-36 sm:w-48 sm:h-48" strokeWidth={1} />
                  </div>

                  {/* Header (Icon + Text) */}
                  <div className="flex items-center gap-3.5 sm:gap-4 mb-3 relative z-10">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-[20px] bg-gradient-to-br ${prob.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-[1.05] transition-transform duration-300`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                    </div>
                    
                    <h3 className="font-bold text-xl sm:text-2xl leading-tight tracking-tight text-white">
                      {prob.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium relative z-10 mb-4">
                    {prob.description}
                  </p>

                  <div className="flex items-center text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold opacity-100 translate-x-0 sm:opacity-0 sm:-translate-x-4 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300 relative z-10 mt-auto pt-2">
                    <span className="flex items-center hover:text-cyan-200">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modern Modal for Problem Statements */}
      <AnimatePresence>
        {selectedTrack && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 xs:p-4 sm:p-6 overscroll-contain">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[#050914]/80 backdrop-blur-md"
              onClick={() => setSelectedTrack(null)}
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-2xl bg-[#070D22] border border-blue-500/40 rounded-[24px] sm:rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-10 flex flex-col max-h-[85vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain custom-scrollbar text-white"
            >
              {/* Modal Header */}
              <div className="px-4 py-5 sm:px-8 sm:py-8 border-b border-blue-500/20 shrink-0">
                <button 
                  onClick={() => setSelectedTrack(null)}
                  className="absolute top-4 right-4 p-1.5 sm:top-6 sm:right-6 sm:p-2 rounded-full bg-blue-950/60 text-slate-300 hover:bg-blue-900/80 hover:text-white transition-colors z-10 border border-blue-500/30"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="flex items-center gap-3 sm:gap-4 pr-10">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${selectedTrack.gradient} flex items-center justify-center text-white shadow-md`}>
                    <selectedTrack.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                      {selectedTrack.title}
                    </h3>
                    <p className="text-[10px] sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest mt-0.5 sm:mt-1">
                      Track Description
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-8 shrink-0">
                <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#030712] border border-blue-500/20 flex items-start gap-3 sm:gap-4">
                  <selectedTrack.icon className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 text-cyan-400 mt-1" strokeWidth={1.5} />
                  <p className="text-slate-200 text-xs xs:text-sm sm:text-[19px] leading-relaxed font-medium whitespace-pre-wrap">
                    {selectedTrack.modalDescription || selectedTrack.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
