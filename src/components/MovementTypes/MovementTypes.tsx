import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './MovementTypes.module.css';

const movements = [
  {
    id: 'pilates',
    titleKey: 'move.pilates.title',
    descKey: 'move.pilates.desc',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80'
  },
  {
    id: 'fitness',
    titleKey: 'move.fitness.title',
    descKey: 'move.fitness.desc',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'
  },
  {
    id: 'reformer',
    titleKey: 'move.reformer.title',
    descKey: 'move.reformer.desc',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80'
  }
];

export default function MovementTypes() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="movements">
      <div className="container">
        <h2 className={styles.title}>{t('move.title')}</h2>
        
        <div className={styles.cardsContainer}>
          {movements.map((item) => (
             <div key={item.id} className={styles.card}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={t(item.titleKey as any)} className={styles.cardImage} loading="lazy" />
                <div className={styles.overlay}></div>
                
                <div className={styles.content}>
                  <div className={styles.mustardLine}></div>
                  <h3 className={styles.cardTitle}>{t(item.titleKey as any)}</h3>
                  <p className={styles.cardDesc}>{t(item.descKey as any)}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
