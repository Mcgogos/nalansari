import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Trainers.module.css';

const trainers = [
  {
    id: 1,
    name: 'NALAN SARI',
    expertise: 'Founder & Master Trainer',
    infoKey: 'trainers.t1.desc',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'DENİZ KAYA',
    expertise: 'Pilates Instructor',
    infoKey: 'trainers.t2.desc',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'CAN YILMAZ',
    expertise: 'Fitness Coach',
    infoKey: 'trainers.t3.desc',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80'
  }
];

export default function Trainers() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="trainers">
      <div className="container">
        <h2 className={styles.title}>{t('trainers.title')}</h2>
        
        <div className={styles.cardsContainer}>
          {trainers.map((trainer) => (
            <div key={trainer.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.mustardLine}></div>
              <h3 className={styles.name}>{trainer.name}</h3>
              <p className={styles.expertise}>{trainer.expertise}</p>
              <p className={styles.info}>{t(trainer.infoKey as any)}</p>
              <span className={styles.cta}>{t('trainers.cta')} &rarr;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
