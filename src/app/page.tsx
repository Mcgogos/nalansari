"use client";

import React, { useState } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { BrandStory } from '@/components/BrandStory';
import { Services } from '@/components/Services';
import { Trainers } from '@/components/Trainers';
import { SocialProof } from '@/components/SocialProof';
import { InstagramGrid } from '@/components/InstagramGrid';
import { ConversionForm } from '@/components/ConversionForm';
import { Location, Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function Home() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <>
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      {/* Hide the main content initially to ensure a smooth transition from the splash screen if needed, 
          but our splash unmounts and Hero animates in natively. */}
      <main style={{ opacity: splashFinished ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navigation />
        <Hero />
        <BrandStory />
        <Services />
        <Trainers />
        <SocialProof />
        <InstagramGrid />
        <ConversionForm />
        <Location />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
}
