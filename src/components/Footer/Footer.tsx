'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LegalModal from '@/components/LegalModal/LegalModal';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  const museWhatsAppContact = `https://wa.me/905302050606?text=${encodeURIComponent('Merhaba Muse Creative House, hizmetleriniz hakkında bilgi almak istiyorum.')}`;

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <h2 className={styles.footerBigText}>
            <span>{t('footer.title.1')}</span>
            <span>{t('footer.title.2')}</span>
            <span>{t('footer.title.3')}</span>
          </h2>
          
          <div className={styles.footerGrid}>
            <div>
              <h3 className={styles.brandName}>NALAN SARI</h3>
              <p className={styles.brandDesc}>PILATES · FITNESS · WELLNESS</p>
            </div>
            
            <div className={styles.footerNav}>
              <Link href="#services" className={`nav-link ${styles.footerLink}`}>{t('nav.services')}</Link>
              <Link href="#planla" className={`nav-link ${styles.footerLink}`}>{t('nav.schedule')}</Link>
              <Link href="#about" className={`nav-link ${styles.footerLink}`}>{t('nav.about')}</Link>
              <Link href="#trainers" className={`nav-link ${styles.footerLink}`}>{t('nav.trainers')}</Link>
            </div>
            
            <div className={styles.footerNav}>
              <Link href="https://www.instagram.com/nalansarifithouse/" className={`nav-link ${styles.footerLink}`} target="_blank" rel="noopener noreferrer">Instagram</Link>
              <Link href={`https://wa.me/905444798807?text=${encodeURIComponent(t('wa.defaultMessage'))}`} className={`nav-link ${styles.footerLink}`}>WhatsApp</Link>
              <Link href="#ucretsiz-deneme" className={`nav-link ${styles.footerLink}`}>{t('loc.contact.label')}</Link>
            </div>
          </div>
          
          {/* ── Footer Bottom Bar (Static, non-fixed, appears at page bottom) ── */}
          <div className={styles.bottomBar}>
            
            {/* Left Info & Legal Block */}
            <div className={styles.museInfoBlock}>
              <p className={styles.museCopyright}>
                &copy; 2026 Muse Creative House &nbsp;·&nbsp; Kocaeli / Körfez
              </p>
              <div className={styles.legalNav}>
                <button 
                  type="button" 
                  onClick={() => setLegalType('privacy')} 
                  className={styles.legalBtn}
                >
                  Privacy
                </button>
                <span className={styles.dotDivider}>•</span>
                <button 
                  type="button" 
                  onClick={() => setLegalType('terms')} 
                  className={styles.legalBtn}
                >
                  Terms
                </button>
                <span className={styles.dotDivider}>•</span>
                <a 
                  href={museWhatsAppContact} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.contactLink}
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Right Side: ROZET 1 THE POWER PILL (Static inline badge) */}
            <a 
              href="https://musecreativehouse.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.musePowerPillInline}
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

          </div>
        </div>
      </footer>

      {/* Legal Modal Popup for Privacy & Terms */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </>
  );
}
