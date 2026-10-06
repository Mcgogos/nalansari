import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Location() {
  const { t } = useLanguage();

  return (
    <section className={styles.locationSection} id="contact">
      <div className="container">
        <h2 className={styles.title}>{t('loc.title')}</h2>
        
        <div className={styles.locationGrid}>
          <div>
            <div className={styles.infoBlock}>
              <h4 className={styles.infoLabel}>{t('loc.address.label')}</h4>
              <p className={styles.infoText} dangerouslySetInnerHTML={{ __html: t('loc.address.val') }}></p>
            </div>
            
            <div className={styles.infoBlock}>
              <h4 className={styles.infoLabel}>{t('loc.hours.label')}</h4>
              <p className={styles.infoText} dangerouslySetInnerHTML={{ __html: t('loc.hours.val') }}></p>
            </div>
            
            <div className={styles.infoBlock}>
              <h4 className={styles.infoLabel}>{t('loc.contact.label')}</h4>
              <p className={styles.infoText}>0544 479 88 07<br/>info@nalansari.com</p>
            </div>
          </div>
          
          <div className={styles.mapContainer}>
            {/* Google Maps Embed Placeholder - styled dark via CSS filter */}
            <iframe 
              src="https://www.google.com/maps?q=Yavuz+Sultan+Selim,+Nergiz+Cd.,+41780+Körfez/Kocaeli&hl=tr&z=15&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
