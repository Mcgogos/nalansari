import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
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
            <Link href="#pilates" className={`nav-link ${styles.footerLink}`}>{t('nav.services')}</Link>
            <Link href="#schedule" className={`nav-link ${styles.footerLink}`}>{t('nav.schedule')}</Link>
            <Link href="#about" className={`nav-link ${styles.footerLink}`}>{t('nav.about')}</Link>
            <Link href="#trainers" className={`nav-link ${styles.footerLink}`}>{t('nav.trainers')}</Link>
          </div>
          
          <div className={styles.footerNav}>
            <Link href="https://www.instagram.com/ns.fithouse.pilates.fitness?stkn=emo0Nnd5YWZraGJr" className={`nav-link ${styles.footerLink}`} target="_blank" rel="noopener noreferrer">Instagram</Link>
            <Link href={`https://wa.me/905444798807?text=${encodeURIComponent(t('wa.defaultMessage'))}`} className={`nav-link ${styles.footerLink}`}>WhatsApp</Link>
            <Link href="#ucretsiz-deneme" className={`nav-link ${styles.footerLink}`}>{t('loc.contact.label')}</Link>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            &copy; {new Date().getFullYear()} Nalan Sarı Pilates & Fitness. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
