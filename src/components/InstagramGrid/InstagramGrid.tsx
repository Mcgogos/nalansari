import React from 'react';
import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './InstagramGrid.module.css';

export default function InstagramGrid() {
  const { t } = useLanguage();
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>{t('ig.title')}</h2>
        
        <div className={styles.grid}>
          {/* Large Item (Video Placeholder) */}
          <div className={`${styles.gridItem} ${styles.itemLarge}`}>
            <video src="/videos/trambolin.mp4" className={styles.media} autoPlay loop muted playsInline />
            <div className={styles.overlay}>
              <Camera size={32} className={styles.instagramIcon} />
            </div>
          </div>
          
          {/* Small Photo 1 */}
          <div className={styles.gridItem}>
            <video src="/videos/reformer.mp4" className={styles.media} autoPlay loop muted playsInline />
            <div className={styles.overlay}>
              <Camera size={24} className={styles.instagramIcon} />
            </div>
          </div>
          
          {/* Vertical Photo */}
          <div className={`${styles.gridItem} ${styles.itemVertical}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" alt="Instagram Photo Vertical" className={styles.media} loading="lazy" />
            <div className={styles.overlay}>
              <Camera size={32} className={styles.instagramIcon} />
            </div>
          </div>
          
          {/* Quote Card */}
          <div className={`${styles.gridItem} ${styles.itemQuote}`}>
            <p className={styles.quoteText}>
              &quot;{t('ig.quote.p1')}<span>{t('ig.quote.p2')}</span><span dangerouslySetInnerHTML={{ __html: t('ig.quote.p3') }}></span><span>{t('ig.quote.p4')}</span>{t('ig.quote.p5')}&quot;
            </p>
          </div>
          
          {/* Small Photo 2 */}
          <div className={styles.gridItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Instagram Photo 2" className={styles.media} loading="lazy" />
            <div className={styles.overlay}>
              <Camera size={24} className={styles.instagramIcon} />
            </div>
          </div>
        </div>
        
        <div className={styles.ctaContainer}>
          <Link href="https://www.instagram.com/ns.fithouse.pilates.fitness?stkn=emo0Nnd5YWZraGJr" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            {t('ig.cta')} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
