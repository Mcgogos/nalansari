"use client";

import React, { useState } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import OnboardingQuiz from '@/components/OnboardingQuiz/OnboardingQuiz';
import { BrandStory } from '@/components/BrandStory';
import { Services } from '@/components/Services';
import BodyMap from '@/components/BodyMap/BodyMap';
import BeforeAfterSlider from '@/components/BeforeAfterSlider/BeforeAfterSlider';
import TransformSection from '@/components/TransformSection/TransformSection';
import { Trainers } from '@/components/Trainers';
import ReviewsAndVoice from '@/components/ReviewsAndVoice/ReviewsAndVoice';
import { InstagramGrid } from '@/components/InstagramGrid';
import { ConversionForm } from '@/components/ConversionForm';
import { FreeTrialForm } from '@/components/FreeTrialForm';
import { Location, Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BackgroundMusicPlayer } from '@/components/BackgroundMusicPlayer';
import SchedulePreview from '@/components/SchedulePreview/SchedulePreview';

export default function Home() {
  const [splashFinished, setSplashFinished] = useState(false);

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
        <SchedulePreview />
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
