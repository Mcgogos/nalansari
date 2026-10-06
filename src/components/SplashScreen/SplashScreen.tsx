'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './SplashScreen.module.css';

// ─── Pilates Ring (Torus) ──────────────────────────────────────────────────
const PilatesRing = ({
  position, rotation, scale, speed, color
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const baseRot = useRef(rotation);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = baseRot.current[0] + t * 0.4;
    ref.current.rotation.y = baseRot.current[1] + t * 0.7;
    ref.current.rotation.z = baseRot.current[2] + t * 0.2;
    const s = scale + Math.sin(state.clock.elapsedTime * speed * 1.5) * 0.04;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1, 0.06, 24, 80]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.05}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// ─── Floating Pilates Body Silhouette (particles forming a stretch pose) ──
const BodyParticles = () => {
  const ref = useRef<THREE.Points>(null);

  // Build positions that approximate a stretched body silhouette
  const positions = React.useMemo(() => {
    const pts: number[] = [];
    const count = 500;
    // Head
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      pts.push(Math.cos(a) * 0.22, 2.0 + Math.sin(a) * 0.22, 0);
    }
    // Spine
    for (let i = 0; i < 80; i++) {
      pts.push((Math.random() - 0.5) * 0.08, 1.7 - i * 0.04, 0);
    }
    // Arms (raised in a V – pilates teaser / bridge pose feeling)
    for (let i = 0; i < 80; i++) {
      const t = i / 80;
      // left arm up
      pts.push(-0.1 - t * 1.0, 1.3 + t * 0.8, 0);
      // right arm up
      pts.push(0.1 + t * 1.0, 1.3 + t * 0.8, 0);
    }
    // Hips
    for (let i = 0; i < 40; i++) {
      pts.push((Math.random() - 0.5) * 0.5, -0.4, 0);
    }
    // Legs (split – pilates V)
    for (let i = 0; i < 80; i++) {
      const t = i / 80;
      pts.push(-0.1 - t * 0.6, -0.4 - t * 1.5, 0);
      pts.push(0.1 + t * 0.6, -0.4 - t * 1.5, 0);
    }
    // Extra scatter around body
    for (let i = 0; i < count - pts.length / 3; i++) {
      pts.push(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 4.0,
        (Math.random() - 0.5) * 0.1
      );
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#D4A72C" size={0.05} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
};

// ─── Background orbit particles ────────────────────────────────────────────
const OrbitDust = () => {
  const ref = useRef<THREE.Points>(null);
  const geo = React.useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 2.5;
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geo, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8A6A10" size={0.012} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
};

// ─── Full 3D Scene ─────────────────────────────────────────────────────────
const Scene = () => (
  <>
    <ambientLight intensity={0.4} color="#FFF8E1" />
    <directionalLight position={[3, 6, 4]} intensity={2.5} color="#FFE580" />
    <pointLight position={[-4, 2, -2]} intensity={50} color="#D4A72C" />
    <pointLight position={[4, -3, 3]} intensity={30} color="#B8860B" />
    <spotLight position={[0, 8, 2]} intensity={60} color="#FFFFFF" angle={0.3} penumbra={1} />

    {/* Central body silhouette */}
    <BodyParticles />

    {/* Three Pilates rings at different angles */}
    <PilatesRing position={[0, 0, 0]}    rotation={[0.3, 0, 0]}         scale={1.8} speed={0.25} color="#D4A72C" />
    <PilatesRing position={[0, 0, 0]}    rotation={[0, 0.5, 1.2]}       scale={2.4} speed={0.18} color="#B8860B" />
    <PilatesRing position={[0, 0, 0]}    rotation={[1.0, 0.3, 0.5]}     scale={3.0} speed={0.12} color="#8A6A10" />

    {/* Ambient dust */}
    <OrbitDust />
  </>
);

// ─── Component ─────────────────────────────────────────────────────────────
interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);

  const isWebGL = typeof window !== 'undefined' ? (() => {
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
    catch { return false; }
  })() : true;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tl = gsap.timeline({ onComplete });

    if (reduced) {
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, delay: 0.3 });
      return () => { tl.kill(); };
    }

    // 1. Canvas fades in fast
    tl.fromTo(canvasRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' }
    )
    // 2. NS logo bounces in from bottom
    .fromTo(logoRef.current,
      { opacity: 0, y: 60, scale: 0.7 },
      { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'elastic.out(1, 0.6)' },
      '-=0.4'
    )
    // 3. Divider draws
    .fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    // 4. Title reveals
    .fromTo(titleRef.current,
      { opacity: 0, y: 20, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
      '-=0.1'
    )
    // 5. Subtitle
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    // Hold
    .to({}, { duration: 1.2 })
    // 6. Cinematic fade-out with slight scale
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.06,
      duration: 0.8,
      ease: 'power2.inOut'
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.splashContainer}>
      {/* 3D pilates scene */}
      {isWebGL && (
        <div ref={canvasRef} className={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Scene />
          </Canvas>
        </div>
      )}

      {/* Overlay gradient so text stays readable */}
      <div className={styles.overlay} />

      {/* Center content */}
      <div className={styles.centerContent}>
        {/* NS logo – geometric SVG matching original */}
        <div ref={logoRef} className={styles.logoMark}>
          <svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg" className={styles.nsSvg} aria-label="NS">
            {/* N – solid black */}
            <rect x="4"  y="8" width="15" height="84" fill="#F3F0E8" />
            <polygon points="4,8 19,8 64,76 64,92 49,92" fill="#F3F0E8" />
            <rect x="49" y="8" width="15" height="84" fill="#F3F0E8" />
            {/* S – mustard, overlapping N right leg */}
            <path d="
              M 64,8 L 97,8
              C 113,8 127,18 127,32
              C 127,46 115,52 99,55
              L 68,62
              C 55,65 46,71 46,76
              C 46,81 51,84 58,84
              L 97,84
              C 104,84 110,81 110,76
              L 127,76
              C 127,88 115,96 97,96
              L 58,96
              C 42,96 29,87 29,75
              C 29,63 41,57 57,53
              L 88,46
              C 101,43 110,37 110,32
              C 110,27 105,20 97,20
              L 64,20
              C 56,20 51,24 50,29
              L 34,29
              C 36,17 48,8 64,8 Z
            " fill="#D4A72C" />
          </svg>
        </div>

        <div ref={lineRef} className={styles.dividerLine} />
        <h1 ref={titleRef} className={styles.title}>NALAN SARI</h1>
        <p ref={subtitleRef} className={styles.subtitle}>PILATES &nbsp;·&nbsp; FITNESS &nbsp;·&nbsp; WELLNESS</p>
      </div>
    </div>
  );
}
