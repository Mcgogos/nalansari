'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './BeforeAfterSlider.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronsLeftRight } from 'lucide-react';
/* eslint-disable @next/next/no-img-element */

export default function BeforeAfterSlider({ embedded = false }: { embedded?: boolean }) {
  const { language } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className={embedded ? styles.sectionEmbedded : styles.section}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <h2 className="display-text">{language === 'tr' ? 'Gerçek Dönüşümler' : 'Real Transformations'}</h2>
          <p className="text-lg">
            {language === 'tr' 
              ? "Düzenli klinik pilates ve reformer terapisi ile duruş bozukluklarının nasıl düzeltildiğine tanık olun."
              : "Witness how posture issues are corrected with regular clinical pilates and reformer therapy."}
          </p>
        </div>

        <div className={styles.sliderWrapper}>
          <div 
            className={styles.comparisonContainer}
            ref={containerRef}
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* After Image (Background) */}
            <div className={styles.imageContainer}>
              <img src="/images/before-after/after.jpg" alt="After Transformation" className={styles.image} draggable={false} />
              <div className={styles.labelAfter}>{language === 'tr' ? 'SONRA' : 'AFTER'}</div>
            </div>

            {/* Before Image (Foreground, Clipped) */}
            <div 
              className={`${styles.imageContainer} ${styles.foreground}`}
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img src="/images/before-after/before.jpg" alt="Before Transformation" className={styles.image} draggable={false} />
              <div className={styles.labelBefore}>{language === 'tr' ? 'ÖNCE' : 'BEFORE'}</div>
            </div>

            {/* Slider Handle */}
            <div 
              className={styles.handle} 
              style={{ left: `${sliderPosition}%` }}
            >
              <div className={styles.handleLine}></div>
              <div className={styles.handleButton}>
                <ChevronsLeftRight size={20} color="var(--color-deep-black)" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
