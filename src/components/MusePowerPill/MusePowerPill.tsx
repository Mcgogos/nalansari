import React from 'react';
import styles from './MusePowerPill.module.css';

export default function MusePowerPill() {
  return (
    <a 
      href="https://musecreativehouse.com" 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.musePowerPill}
      aria-label="Muse Creative House"
    >
      <span className={styles.musePillLogo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/muse-logo.jpg" alt="Muse Logo" />
      </span>
      <span className={styles.musePillText}>
        <strong>MUSE CREATIVE HOUSE</strong>
        <span className={styles.musePillSub}>
          <i className={styles.redDot}></i> DESIGNER
        </span>
      </span>
    </a>
  );
}
