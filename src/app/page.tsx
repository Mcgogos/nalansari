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
import { Trainers } from '@/components/Trainers';
import ReviewsAndVoice from '@/components/ReviewsAndVoice/ReviewsAndVoice';
import { InstagramGrid } from '@/components/InstagramGrid';
import { ConversionForm } from '@/components/ConversionForm';
import { Location, Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function Home() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <>
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      <main style={{ opacity: splashFinished ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navigation />
        <Hero />
        <OnboardingQuiz />
        <BrandStory />
        <Services />
        <BodyMap />
        <BeforeAfterSlider />
        <Trainers />
        <ReviewsAndVoice />
        <InstagramGrid />
        <ConversionForm />
        <Location />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
}
