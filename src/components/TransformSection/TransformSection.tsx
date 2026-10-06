'use client';
import React from 'react';
import BodyMap from '@/components/BodyMap/BodyMap';
import BeforeAfterSlider from '@/components/BeforeAfterSlider/BeforeAfterSlider';
import styles from './TransformSection.module.css';

export default function TransformSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sideBySide}>
        {/* Left: Body Map */}
        <div className={styles.panel}>
          <BodyMap embedded />
        </div>
        {/* Right: Before/After Slider */}
        <div className={styles.panel}>
          <BeforeAfterSlider embedded />
        </div>
      </div>
    </section>
  );
}
