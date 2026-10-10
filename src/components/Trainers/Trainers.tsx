import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Trainers.module.css';

const trainers = [
  {
    id: 1,
    name: 'NALAN SARI',
    expertise: 'Founder & Master Trainer',
    infoKey: 'trainers.t1.desc',
    image: '/images/trainers/nalan-sari.jpg'
  },
  {
    id: 2,
    name: 'EĞİTMEN 2',
    expertise: 'Pilates Instructor',
    infoKey: 'trainers.t2.desc',
    image: '/images/trainers/trainer2.jpg'
  },
  {
    id: 3,
    name: 'EĞİTMEN 3',
    expertise: 'Fitness Coach',
    infoKey: 'trainers.t3.desc',
    image: '/images/trainers/trainer3.jpg'
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
                <Image 
                  src={trainer.image} 
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className={styles.image}
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
