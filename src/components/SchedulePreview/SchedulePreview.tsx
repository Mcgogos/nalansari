import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './SchedulePreview.module.css';

// Config data structure for easy modification later
const scheduleData = [
  { id: 1, time: '09:00', name: 'PILATES', capacityKey: 'schedule.capacity' },
  { id: 2, time: '12:00', name: 'REFORMER', capacityKey: 'schedule.capacity5' },
  { id: 3, time: '18:00', name: 'FITNESS', capacityKey: 'schedule.free' },
  { id: 4, time: '19:30', name: 'PERSONAL TRAINING', capacityKey: 'schedule.pt' },
];

export default function SchedulePreview() {
  const { t } = useLanguage();
  return (
    <section className={styles.section} id="schedule">
      <div className="container">
        <h2 className={styles.title}>{t('schedule.title')}</h2>
        
        <div className={styles.scheduleList}>
          {scheduleData.map((item) => (
            <div key={item.id} className={styles.scheduleItem}>
              <div className={styles.time}>{item.time}</div>
              <div className={styles.className}>{item.name}</div>
              <div className={styles.capacity}>{t(item.capacityKey as any)}</div>
              <Link href="#planla" className={styles.ctaButton}>
                {t('schedule.cta')} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
