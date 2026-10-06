'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './SplashScreen.module.css';

// ─── Floating Particle Ring ───────────────────────────────────────────────────
const ParticleRing = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 0.6;
      const spread = (Math.random() - 0.5) * 0.5;
      positions[i * 3]     = Math.cos(angle) * radius + spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius + spread;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#D4A72C" size={0.018} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
};

// ─── 3D Torus Knot (Gold Accent) ────────────────────────────────────────────
const GoldKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.9, 0.22, 200, 20, 2, 3]} />
      <meshStandardMaterial
        color="#D4A72C"
        metalness={0.95}
        roughness={0.1}
        emissive="#7A5A00"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

// ─── Scene ───────────────────────────────────────────────────────────────────
const Scene = () => (
  <>
    <ambientLight intensity={0.3} color="#FFF5D6" />
    <directionalLight position={[4, 8, 4]} intensity={2} color="#FFE580" />
    <pointLight position={[-5, 3, -3]} intensity={60} color="#D4A72C" />
    <pointLight position={[5, -3, 3]} intensity={40} color="#FF9500" />
    <spotLight position={[0, 6, 0]} intensity={80} color="#FFFFFF" angle={0.4} penumbra={1} />
    <GoldKnot />
    <ParticleRing />
  </>
);

// ─── Component ───────────────────────────────────────────────────────────────
interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLDivElement>(null);
  const logoRef       = useRef<HTMLDivElement>(null);
  const titleRef      = useRef<HTMLHeadingElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);

  const isWebGLSupported = typeof window !== 'undefined' ? (() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch { return false; }
  })() : true;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({ onComplete });

    if (isReducedMotion) {
      tl.to(containerRef.current, { opacity: 0, duration: 0.6, delay: 0.3 });
      return () => { tl.kill(); };
    }

    // Phase 1 – canvas burst in
    tl.fromTo(canvasRef.current,
      { opacity: 0, scale: 0.6, rotation: -15 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.2)' }
    )
    // Phase 2 – logo pops up with spring
    .fromTo(logoRef.current,
      { opacity: 0, scale: 0, rotation: -90 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.0, ease: 'elastic.out(1, 0.55)' },
      '-=0.5'
    )
    // Phase 3 – divider line draws in
    .fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    // Phase 4 – title sweeps up
    .fromTo(titleRef.current,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
      '-=0.1'
    )
    // Phase 5 – subtitle fades
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    // Hold…
    .to({}, { duration: 1.0 })
    // Phase 6 – cinematic zoom-out & fade
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.08,
      duration: 0.8,
      ease: 'power2.inOut'
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.splashContainer}>
      {/* 3D Canvas background */}
      {isWebGLSupported && (
        <div ref={canvasRef} className={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>
      )}

      {/* Central content */}
      <div className={styles.centerContent}>
        {/* Big NS logo */}
        <div ref={logoRef} className={styles.logoMark}>
          <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" className={styles.nsSvg}>
            {/* N – outline style: stroke mustard, fill transparent */}
            <text x="4" y="88"
              fontFamily="'Inter', sans-serif"
              fontSize="90"
              fontWeight="700"
              fill="#0A0A0A"
              stroke="#D4A72C"
              strokeWidth="4"
            >N</text>
            {/* S – solid mustard */}
            <text x="80" y="88"
              fontFamily="'Inter', sans-serif"
              fontSize="90"
              fontWeight="700"
              fill="#D4A72C"
            >S</text>
          </svg>
        </div>

        {/* Divider */}
        <div ref={lineRef} className={styles.dividerLine} />

        {/* Name */}
        <h1 ref={titleRef} className={styles.title}>NALAN SARI</h1>

        {/* Tagline */}
        <p ref={subtitleRef} className={styles.subtitle}>
          PILATES &nbsp;·&nbsp; FITNESS &nbsp;·&nbsp; WELLNESS
        </p>
      </div>
    </div>
  );
}
