"use client";

import React, { useState, useEffect } from 'react';
import { MAINTENANCE_MODE, ADMIN_BYPASS_QUERY, ADMIN_BYPASS_VALUE } from '@/config/maintenance';
import { Maintenance } from '@/components/Maintenance';
import { SplashScreen } from '@/components/SplashScreen';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import OnboardingQuiz from '@/components/OnboardingQuiz/OnboardingQuiz';
import { BrandStory } from '@/components/BrandStory';
import { Services } from '@/components/Services';
import TransformSection from '@/components/TransformSection/TransformSection';
import { Trainers } from '@/components/Trainers';
import ReviewsAndVoice from '@/components/ReviewsAndVoice/ReviewsAndVoice';
import { InstagramGrid } from '@/components/InstagramGrid';
import { ConversionForm } from '@/components/ConversionForm';
import { FreeTrialForm } from '@/components/FreeTrialForm';
import { Location, Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BackgroundMusicPlayer } from '@/components/BackgroundMusicPlayer';

export default function Home() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [isAdminBypass, setIsAdminBypass] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get(ADMIN_BYPASS_QUERY) === ADMIN_BYPASS_VALUE || params.get('admin') === '1') {
        setIsAdminBypass(true);
      }
    }
  }, []);

  // Merkezi bakım modu aktifken ziyaretçilere bilgilendirme ekranını göster
  if (MAINTENANCE_MODE && !isAdminBypass) {
    return <Maintenance />;
  }

  return (
    <>
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      <main style={{ opacity: splashFinished ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navigation />
        <Hero />
        <FreeTrialForm />
        <OnboardingQuiz />
        <BrandStory />
        <Services />
        <TransformSection />
        <Trainers />
        <ReviewsAndVoice />
        <InstagramGrid />
        <ConversionForm />
        <Location />
        <Footer />
        <FloatingWhatsApp />
        <BackgroundMusicPlayer />
      </main>
    </>
  );
}
