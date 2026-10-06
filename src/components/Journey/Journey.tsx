"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Journey.module.css';

const steps = [
  { id: 1, titleKey: 'journey.step1.title', descKey: 'journey.step1.desc' },
  { id: 2, titleKey: 'journey.step2.title', descKey: 'journey.step2.desc' },
  { id: 3, titleKey: 'journey.step3.title', descKey: 'journey.step3.desc' },
  { id: 4, titleKey: 'journey.step4.title', descKey: 'journey.step4.desc' },
];

export default function Journey() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on scroll position inside the section
      const start = rect.top - windowHeight * 0.8;
      const end = rect.bottom - windowHeight * 0.2;
      const total = end - start;
      const current = -start;
      
      if (current >= 0 && current <= total) {
        setProgress((current / total) * 100);
      } else if (current > total) {
        setProgress(100);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getActiveStep = () => {
    if (progress < 25) return 1;
    if (progress < 50) return 2;
    if (progress < 75) return 3;
    return 4;
  };

  const activeStep = getActiveStep();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.title}>{t('journey.title')}</h2>
        
        <div className={styles.timeline}>
          <div className={styles.timelineLine}>
            <div 
              className={styles.timelineProgress} 
              style={isMobile ? { height: `${progress}%`, width: '100%' } : { width: `${progress}%`, height: '100%' }}
            />
          </div>
          
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`${styles.step} ${activeStep >= step.id ? styles.active : ''}`}
            >
              <div className={styles.stepNumber}>
                0{step.id}
              </div>
              <div>
                <h3 className={styles.stepTitle}>{t(step.titleKey as any)}</h3>
                <p className={styles.stepDesc}>{t(step.descKey as any)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
