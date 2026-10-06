"use client";

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './SplashScreen.module.css';

const AbstractShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
      <meshStandardMaterial 
        color="#111111" 
        roughness={0.7} 
        metalness={0.2} 
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      {/* Warm soft fill light */}
      <ambientLight intensity={0.5} color="#F3F0E8" />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#F3F0E8" />
      
      {/* Mustard Gold rim light */}
      <spotLight 
        position={[-5, 0, -5]} 
        intensity={100} 
        color="#D4A72C" 
        angle={0.5} 
        penumbra={1} 
      />
      <spotLight 
        position={[5, -5, 2]} 
        intensity={50} 
        color="#D4A72C" 
        angle={0.5} 
        penumbra={1} 
      />

      <AbstractShape />
    </>
  );
};

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const initialLineRef = useRef<HTMLDivElement>(null);
  
  const isWebGLSupported = typeof window !== 'undefined' ? (() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  })() : true;

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('nalansari_visited');
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const durationMultiplier = hasVisited || isReducedMotion ? 0.3 : 1;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('nalansari_visited', 'true');
        onComplete();
      }
    });

    if (durationMultiplier < 1) {
      // Fast fallback / revisit animation
      tl.to(containerRef.current, { opacity: 0, duration: 1, delay: 0.5 });
      return;
    }

    // Main 3.5s animation timeline
    // 0.0 - 0.5s: Initial mustard line
    tl.to(initialLineRef.current, {
      width: '100px',
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to(initialLineRef.current, {
      opacity: 0,
      duration: 0.2
    }, "+=0.1");

    // 0.5 - 1.2s: Canvas reveal
    tl.to(canvasRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5, // slightly longer for smooth feel
      ease: 'power3.out'
    }, "-=0.2");

    // 2.1s: Text reveal
    tl.to(titleRef.current, {
      opacity: 1,
      letterSpacing: '0.15em',
      marginRight: '-0.15em',
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8");

    tl.to(subtitleRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.6");

    // 3.1 - 3.7s: Fade out entire splash screen
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.5
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.splashContainer}>
      <div ref={initialLineRef} className={styles.initialLine} />
      
      {isWebGLSupported && (
        <div ref={canvasRef} className={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>
      )}

      <div className={styles.textContainer}>
        <h1 ref={titleRef} className={styles.title}>NALAN SARI</h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          PILATES · FITNESS · WELLNESS
        </p>
      </div>
    </div>
  );
}
