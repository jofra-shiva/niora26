'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ProblemsSection from '@/components/landing/ProblemsSection';
import TimelineSection from '@/components/landing/TimelineSection';
import PrizesSection from '@/components/landing/PrizesSection';
import TeamSection from '@/components/landing/TeamSection';
import FAQSection from '@/components/landing/FAQSection';
import ContactSection from '@/components/landing/ContactSection';

const IntroAnimation = dynamic(
  () => import('@/components/landing/IntroAnimation'),
  { ssr: false }
);

const INTRO_SHOWN_KEY = 'hackspark26-intro-shown';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Show intro only once per session
    const alreadyShown = sessionStorage.getItem(INTRO_SHOWN_KEY);
    if (!alreadyShown) {
      setShowIntro(true);
    } else {
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setContentVisible(true);
    sessionStorage.setItem(INTRO_SHOWN_KEY, 'true');
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <div
        className="min-h-screen flex flex-col"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProblemsSection />
          <TimelineSection />
          <PrizesSection />
          <TeamSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
