"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax & Mouse movement interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !bgRef.current || !textRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse coordinates (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      // Subtle background movement
      gsap.to(bgRef.current, {
        x: xPos * -15, // move opposite to mouse
        y: yPos * -15,
        duration: 1,
        ease: 'power2.out'
      });
      
      // Extremely subtle text movement
      gsap.to(textRef.current, {
        x: xPos * 5,
        y: yPos * 5,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    // Only apply hover interactions on desktop
    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.backgroundWrapper} ref={bgRef}>
        <video 
          className={styles.backgroundVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/fitness.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.overlay}></div>
      
      <div className={`container ${styles.content}`}>
        <div className={styles.textContent} ref={textRef}>
          <p className={`text-lg ${styles.subtitle}`}>{t('hero.subtitle')}</p>
          <h1 className={`display-text ${styles.title}`} dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
          <p className={`text-lg ${styles.description}`}>
            {t('hero.desc')}
          </p>
          
          <div className={styles.actions}>
            <Link href="#ucretsiz-deneme" className={styles.primaryCta}>
              {t('hero.cta.primary')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
