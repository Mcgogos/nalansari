'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nGroupRef    = useRef<HTMLDivElement>(null);
  const sGroupRef    = useRef<HTMLDivElement>(null);
  const alanRef      = useRef<HTMLSpanElement>(null);
  const ariRef       = useRef<HTMLSpanElement>(null);
  const impactRef    = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tl = gsap.timeline({ onComplete });

    if (reduced) {
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, delay: 0.3 });
      return () => { tl.kill(); };
    }

    // ── Ensure elements are visible for GSAP animation ──────────────────────
    gsap.set(nGroupRef.current, { opacity: 1 });
    gsap.set(sGroupRef.current, { opacity: 1 });

    // ── Phase 0: Ambient BG glow ──────────────────────────────────────────
    tl.to(bgRef.current, { opacity: 1, duration: 0.4 })

    // ── Phase 1: N sprints in from LEFT (-120vw -> -6vw), S from RIGHT (120vw -> 6vw) ─
    .to(nGroupRef.current, {
      x: '-6vw',
      rotation: 6,
      duration: 0.95,
      ease: 'power3.out'
    }, 0.1)
    .to(sGroupRef.current, {
      x: '6vw',
      rotation: -6,
      duration: 0.95,
      ease: 'power3.out'
    }, 0.1)

    // ── Phase 2: Collision Slam at Center ─────────────────────────────────
    .to(nGroupRef.current, {
      x: '-1vw',
      rotation: 0,
      duration: 0.25,
      ease: 'power4.in'
    }, 1.05)
    .to(sGroupRef.current, {
      x: '1vw',
      rotation: 0,
      duration: 0.25,
      ease: 'power4.in'
    }, 1.05)

    // ── Phase 3: Impact Burst ─────────────────────────────────────────────
    .to(impactRef.current, {
      scale: 1.2,
      opacity: 1,
      duration: 0.12,
      ease: 'power2.out'
    }, 1.27)
    .to(impactRef.current, {
      scale: 3.5,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out'
    }, 1.39)

    // ── Phase 4: Settle & Spring open for full text alignment ────────────
    .to(nGroupRef.current, {
      x: '0vw',
      duration: 0.4,
      ease: 'back.out(2)'
    }, 1.35)
    .to(sGroupRef.current, {
      x: '0vw',
      duration: 0.4,
      ease: 'back.out(2)'
    }, 1.35)

    // ── Phase 5: "alan" reveals to right of N, "arı" reveals to right of S ─
    .to(alanRef.current, {
      opacity: 1,
      width: 'auto',
      scaleX: 1,
      duration: 0.65,
      ease: 'power3.out'
    }, 1.75)
    .to(ariRef.current, {
      opacity: 1,
      width: 'auto',
      scaleX: 1,
      duration: 0.65,
      ease: 'power3.out'
    }, 1.87)

    // ── Phase 6: Subtitle tagline reveal ──────────────────────────────────
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 2.35)

    // ── Hold ──────────────────────────────────────────────────────────────
    .to({}, { duration: 1.3 })

    // ── Phase 7: Exit transition ──────────────────────────────────────────
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.7,
      ease: 'power2.inOut'
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.splashContainer}>

      {/* Radial glow background */}
      <div ref={bgRef} className={styles.bgGradient} style={{ opacity: 0 }} />
      <div className={styles.gridLines} />

      {/* ── Main Name Assembly ── */}
      <div className={styles.nameContainer}>

        {/* N + "alan" Group (Initially off-screen left) */}
        <div 
          ref={nGroupRef} 
          className={styles.wordGroup}
          style={{ transform: 'translateX(-120vw) rotate(-12deg)', opacity: 0 }}
        >
          <span className={styles.bigLetterN}>N</span>
          <span 
            ref={alanRef} 
            className={styles.suffixAlan}
            style={{ opacity: 0, width: 0, transform: 'scaleX(0)', transformOrigin: 'left center' }}
          >
            alan
          </span>
        </div>

        {/* Impact Flash Point */}
        <div 
          ref={impactRef} 
          className={styles.impactFlash}
          style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }}
        />

        {/* S + "arı" Group (Initially off-screen right) */}
        <div 
          ref={sGroupRef} 
          className={`${styles.wordGroup} ${styles.wordGroupS}`}
          style={{ transform: 'translateX(120vw) rotate(12deg)', opacity: 0 }}
        >
          <span className={styles.bigLetterS}>S</span>
          <span 
            ref={ariRef} 
            className={styles.suffixAri}
            style={{ opacity: 0, width: 0, transform: 'scaleX(0)', transformOrigin: 'left center' }}
          >
            arı
          </span>
        </div>

      </div>

      {/* Subtitle */}
      <p 
        ref={subtitleRef} 
        className={styles.subtitle}
        style={{ opacity: 0, transform: 'translateY(15px)' }}
      >
        PILATES &nbsp;·&nbsp; FITNESS &nbsp;·&nbsp; WELLNESS
      </p>

    </div>
  );
}
