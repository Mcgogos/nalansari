import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './BrandStory.module.css';

export default function BrandStory() {
  const { t } = useLanguage();
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.grid}`}>
        <div className={styles.imageWrapper}>
          <video 
            src="/videos/reformer-terapi.mp4" 
            className={styles.image}
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </div>
        
        <div className={styles.contentWrapper}>
          <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: t('story.title') }}></h2>
          <p className={styles.manifesto}>
            &quot;{t('story.p1')}&quot;
          </p>
          
          <div className={styles.founderInfo}>
            <span className={styles.name}>Nalan Sarı</span>
            <span className={styles.role}>Founder / Instructor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
