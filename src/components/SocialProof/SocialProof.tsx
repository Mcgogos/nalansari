import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './SocialProof.module.css';

const testimonial = {
  quote: "Stüdyoya ilk adım attığım günden beri bedenimdeki değişimi sadece ben değil, herkes fark ediyor. Klasik bir spor salonundan çok daha fazlası; gerçekten premium bir deneyim.",
  author: "Elif B.",
  program: "Reformer Pilates"
};

export default function SocialProof() {
  const { t } = useLanguage();
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>{t('social.title')}</h2>
        
        <div className={styles.testimonialsWrapper}>
          <div className={styles.testimonial}>
            <Quote size={48} className={styles.quoteIcon} />
            <blockquote className={styles.quoteText}>
              &quot;{t('social.quote')}&quot;
            </blockquote>
            
            <div className={styles.authorInfo}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className={styles.authorName}>{testimonial.author}</span>
              <span className={styles.program}>{testimonial.program}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
