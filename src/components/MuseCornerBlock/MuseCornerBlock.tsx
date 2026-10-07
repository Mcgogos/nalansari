import React from 'react';
import styles from './MuseCornerBlock.module.css';

export default function MuseCornerBlock() {
  return (
    <a
      href="https://musecreativehouse.com"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.museCornerBlock}
      aria-label="Muse Creative House"
    >
      <div className={styles.topRow}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/muse-logo.jpg" alt="Muse" className={styles.logoImg} />
        <span className={styles.museCornerTop}>MUSE / 2026</span>
      </div>
      <strong>MUSE<br/>CREATIVE<br/>HOUSE</strong>
      <span className={styles.museCornerBottom}>STAMP — BELİRGİN</span>
    </a>
  );
}
