"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import styles from './StudioExperience.module.css';

const hotspots = [
  { id: 1, x: 25, y: 60, titleKey: 'studio.pilates', descKey: 'studio.pilates.desc' },
  { id: 2, x: 50, y: 40, titleKey: 'studio.fitness', descKey: 'studio.fitness.desc' },
  { id: 3, x: 75, y: 70, titleKey: 'studio.pt', descKey: 'studio.pt.desc' },
];

export default function StudioExperience() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (imageRef.current && containerRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20, // Parallax effect
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: true
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className={styles.section} id="studio">
      <div className="container">
        <h2 className={styles.title}>{t('studio.title')}</h2>
        
        <div className={styles.imageWrapper} ref={containerRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            ref={imageRef}
            src="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80" 
            alt="Studio Interior" 
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.overlay}></div>
          
          {hotspots.map((spot) => (
            <div 
              key={spot.id} 
              className={styles.hotspot}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              0{spot.id}
              
              <div className={styles.infoCard}>
                <h4 className={styles.infoTitle}>{t(spot.titleKey as any)}</h4>
                <p className={styles.infoDesc}>{t(spot.descKey as any)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
