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

    // ── Initial State Setup ─────────────────────────────────────────────────
    // N group starts off-screen LEFT
    gsap.set(nGroupRef.current, { x: '-120vw', rotation: -12, opacity: 1 });
    // S group starts off-screen RIGHT
    gsap.set(sGroupRef.current, { x: '120vw', rotation: 12, opacity: 1 });
    
    // Suffixes "alan" and "arı" start collapsed & invisible
    gsap.set(alanRef.current,   { opacity: 0, width: 0, scaleX: 0, transformOrigin: 'left center' });
    gsap.set(ariRef.current,    { opacity: 0, width: 0, scaleX: 0, transformOrigin: 'left center' });
    
    gsap.set(impactRef.current, { scale: 0, opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 15 });

    // ── Phase 0: Ambient BG glow ──────────────────────────────────────────
    tl.to(bgRef.current, { opacity: 1, duration: 0.4 })

    // ── Phase 1: N sprints in from LEFT, S from RIGHT ─────────────────────
    .to(nGroupRef.current, {
      x: '-6vw',
      rotation: 6,
      duration: 0.9,
      ease: 'power3.out'
    }, 0.1)
    .to(sGroupRef.current, {
      x: '6vw',
      rotation: -6,
      duration: 0.9,
      ease: 'power3.out'
    }, 0.1)

    // ── Phase 2: Collision Slam at Center ─────────────────────────────────
    .to(nGroupRef.current, {
      x: '-1vw',
      rotation: 0,
      duration: 0.25,
      ease: 'power4.in'
    }, 1.0)
    .to(sGroupRef.current, {
      x: '1vw',
      rotation: 0,
      duration: 0.25,
      ease: 'power4.in'
    }, 1.0)

    // ── Phase 3: Impact Burst ─────────────────────────────────────────────
    .to(impactRef.current, {
      scale: 1.2,
      opacity: 1,
      duration: 0.12,
      ease: 'power2.out'
    }, 1.22)
    .to(impactRef.current, {
      scale: 3.5,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out'
    }, 1.34)

    // ── Phase 4: Settle & Spring open for full text alignment ────────────
    .to(nGroupRef.current, {
      x: '0vw',
      duration: 0.4,
      ease: 'back.out(2)'
    }, 1.30)
    .to(sGroupRef.current, {
      x: '0vw',
      duration: 0.4,
      ease: 'back.out(2)'
    }, 1.30)

    // ── Phase 5: "alan" reveals to the right of N, "arı" reveals to right of S ─
    .to(alanRef.current, {
      opacity: 1,
      width: 'auto',
      scaleX: 1,
      duration: 0.65,
      ease: 'power3.out'
    }, 1.70)
    .to(ariRef.current, {
      opacity: 1,
      width: 'auto',
      scaleX: 1,
      duration: 0.65,
      ease: 'power3.out'
    }, 1.82)

    // ── Phase 6: Subtitle tagline reveal ──────────────────────────────────
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 2.3)

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
      <div ref={bgRef} className={styles.bgGradient} />
      <div className={styles.gridLines} />

      {/* ── Main Name Assembly ── */}
      <div className={styles.nameContainer}>

        {/* N + "alan" Group */}
        <div ref={nGroupRef} className={styles.wordGroup}>
          <span className={styles.bigLetterN}>N</span>
          <span ref={alanRef} className={styles.suffixAlan}>alan</span>
        </div>

        {/* Impact Flash Point */}
        <div ref={impactRef} className={styles.impactFlash} />

        {/* S + "arı" Group */}
        <div ref={sGroupRef} className={`${styles.wordGroup} ${styles.wordGroupS}`}>
          <span className={styles.bigLetterS}>S</span>
          <span ref={ariRef} className={styles.suffixAri}>arı</span>
        </div>

      </div>

      {/* Subtitle */}
      <p ref={subtitleRef} className={styles.subtitle}>
        PILATES &nbsp;·&nbsp; FITNESS &nbsp;·&nbsp; WELLNESS
      </p>

    </div>
  );
}
