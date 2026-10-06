'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const nRef          = useRef<HTMLDivElement>(null);
  const sRef          = useRef<HTMLDivElement>(null);
  const impactRef     = useRef<HTMLDivElement>(null);
  const nalanRef      = useRef<HTMLSpanElement>(null);
  const sariRef       = useRef<HTMLSpanElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const bgRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tl = gsap.timeline({ onComplete });

    if (reduced) {
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, delay: 0.3 });
      return () => { tl.kill(); };
    }

    // ── Initial state ──────────────────────────────────────────────────────
    // N starts off-screen LEFT, tilted, doing a "running" approach
    gsap.set(nRef.current,      { x: '-120vw', rotation: -20, opacity: 1 });
    // S starts off-screen RIGHT, tilted opposite way
    gsap.set(sRef.current,      { x: '120vw',  rotation: 20,  opacity: 1 });
    gsap.set(impactRef.current, { scale: 0, opacity: 0 });
    gsap.set(nalanRef.current,  { opacity: 0, y: 20 });
    gsap.set(sariRef.current,   { opacity: 0, y: 20 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 10 });

    // ── Phase 0: BG brightens slightly ───────────────────────────────────
    tl.to(bgRef.current, { opacity: 1, duration: 0.4 })

    // ── Phase 1: N bounces/runs in from LEFT ─────────────────────────────
    .to(nRef.current, {
      x: '-8vw',          // just past center – will "overshoot" then settle
      rotation: 8,
      duration: 1.0,
      ease: 'power3.out'
    }, 0.1)

    // ── Phase 2: S sprints in from RIGHT simultaneously ──────────────────
    .to(sRef.current, {
      x: '8vw',
      rotation: -8,
      duration: 1.0,
      ease: 'power3.out'
    }, 0.1)

    // ── Phase 3: Both slam INTO center (collision) ───────────────────────
    .to(nRef.current, {
      x: '-2vw',
      rotation: 0,
      duration: 0.3,
      ease: 'power4.in'
    }, 1.0)
    .to(sRef.current, {
      x: '2vw',
      rotation: 0,
      duration: 0.3,
      ease: 'power4.in'
    }, 1.0)

    // ── Phase 4: Impact flash ────────────────────────────────────────────
    .to(impactRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.15,
      ease: 'power2.out'
    }, 1.28)
    .to(impactRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, 1.38)

    // ── Phase 5: Letters spring apart (gap opens) ────────────────────────
    .to(nRef.current, {
      x: '-18vw',
      duration: 0.5,
      ease: 'back.out(3)'
    }, 1.35)
    .to(sRef.current, {
      x: '18vw',
      duration: 0.5,
      ease: 'back.out(3)'
    }, 1.35)

    // ── Phase 6: Names appear below each letter ──────────────────────────
    .to(nalanRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.75)
    .to(sariRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.85)

    // ── Phase 7: Tagline ─────────────────────────────────────────────────
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 2.1)

    // ── Hold ─────────────────────────────────────────────────────────────
    .to({}, { duration: 1.3 })

    // ── Phase 8: Cinematic fade out ──────────────────────────────────────
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.75,
      ease: 'power2.inOut'
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.splashContainer}>

      {/* Animated gradient background */}
      <div ref={bgRef} className={styles.bgGradient} />

      {/* Background grid lines (subtle depth) */}
      <div className={styles.gridLines} />

      {/* ── Letters row ──────────────────────────────────────────────── */}
      <div className={styles.lettersRow}>

        {/* N – black, from left */}
        <div ref={nRef} className={styles.letterWrap}>
          {/* SVG N letter – geometric, sharp */}
          <svg viewBox="0 0 80 100" className={`${styles.letterSvg} ${styles.letterN}`} aria-hidden>
            {/* Left leg */}
            <rect x="2"  y="2" width="18" height="96" fill="#F3F0E8" />
            {/* Diagonal */}
            <polygon points="2,2 20,2 78,92 78,100 60,100" fill="#F3F0E8" />
            {/* Right leg */}
            <rect x="60" y="2" width="18" height="96" fill="#F3F0E8" />
          </svg>
          {/* "NALAN" text revealed below */}
          <span ref={nalanRef} className={styles.nameLabel}>NALAN</span>
        </div>

        {/* Impact flash at center */}
        <div ref={impactRef} className={styles.impactFlash} />

        {/* S – mustard, from right */}
        <div ref={sRef} className={styles.letterWrap}>
          {/* SVG S letter – smooth rounded */}
          <svg viewBox="0 0 80 100" className={`${styles.letterSvg} ${styles.letterS}`} aria-hidden>
            <path
              d="
                M 70,20
                C 70,9 61,2 49,2
                L 28,2
                C 14,2 8,11 8,22
                C 8,33 16,40 29,44
                L 53,52
                C 64,56 72,63 72,76
                C 72,89 63,98 50,98
                L 28,98
                C 14,98 6,89 6,78
                L 22,78
                C 22,82 26,85 31,85
                L 50,85
                C 56,85 62,81 62,76
                C 62,71 56,67 48,64
                L 24,56
                C 12,52 -5,44 -5,28
                C -5,12 8,2 28,2
              "
              fill="#D4A72C"
            />
          </svg>
          {/* "SARI" text revealed below */}
          <span ref={sariRef} className={`${styles.nameLabel} ${styles.nameLabelYellow}`}>SARI</span>
        </div>

      </div>

      {/* Tagline below letters */}
      <p ref={subtitleRef} className={styles.subtitle}>
        PILATES &nbsp;·&nbsp; FITNESS &nbsp;·&nbsp; WELLNESS
      </p>

    </div>
  );
}
