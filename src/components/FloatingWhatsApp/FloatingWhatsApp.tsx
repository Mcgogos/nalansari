'use client';

import React, { useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [exploded, setExploded] = useState(false);

  const handleClick = () => {
    if (exploded) return;
    setExploded(true);

    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create N and S particles
    const letters = ['N', 'S', 'N', 'S', 'N', 'S', 'N', 'S', 'N', 'S', 'N', 'S'];
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 9999; overflow: hidden;
    `;
    document.body.appendChild(container);

    letters.forEach((letter, i) => {
      const el = document.createElement('span');
      el.textContent = letter;
      el.style.cssText = `
        position: absolute;
        left: ${centerX}px;
        top: ${centerY}px;
        transform: translate(-50%, -50%);
        color: #EAB308;
        font-family: Georgia, serif;
        font-weight: 900;
        font-size: ${14 + Math.random() * 18}px;
        opacity: 1;
        pointer-events: none;
        will-change: transform, opacity;
      `;
      container.appendChild(el);

      const angle = (i / letters.length) * 2 * Math.PI + (Math.random() - 0.5) * 0.8;
      const dist = 120 + Math.random() * 220;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const rotation = (Math.random() - 0.5) * 720;
      const duration = 600 + Math.random() * 500;
      const delay = Math.random() * 150;

      // Use Web Animations API
      el.animate(
        [
          { transform: `translate(-50%, -50%) rotate(0deg)`, opacity: 1 },
          { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rotation}deg)`, opacity: 0 },
        ],
        { duration, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
      );
    });

    // Open WhatsApp after animation
    setTimeout(() => {
      const waUrl = `https://api.whatsapp.com/send?phone=905444798807&text=${encodeURIComponent(t('wa.defaultMessage'))}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        document.body.removeChild(container);
        setExploded(false);
      }, 600);
    }, 750);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`${styles.floatingBtn} ${exploded ? styles.exploded : ''}`}
      aria-label="WhatsApp üzerinden bize ulaşın"
    >
      <span className={styles.waIcon}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.853L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.032-1.388l-.36-.214-3.732.973.997-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/>
        </svg>
      </span>
      <span className={styles.text}>{t('wa.text')}</span>
    </button>
  );
}
