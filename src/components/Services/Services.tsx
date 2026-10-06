import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Services.module.css';

const servicesList = [
  {
    title: 'REFORMER PILATES',
    descKey: 'services.reformer.desc',
    whoKey: 'services.reformer.who',
    benefitsKey: 'services.reformer.benefits',
  },
  {
    title: 'FITNESS',
    descKey: 'services.fitness.desc',
    whoKey: 'services.fitness.who',
    benefitsKey: 'services.fitness.benefits',
  },
  {
    title: 'METAVACU & ROLL',
    descKey: 'services.metavacu.desc',
    whoKey: 'services.metavacu.who',
    benefitsKey: 'services.metavacu.benefits',
  },
  {
    title: 'HAMİLE PİLATESİ',
    descKey: 'services.hamile.desc',
    whoKey: 'services.hamile.who',
    benefitsKey: 'services.hamile.benefits',
  },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.grid}>
          {servicesList.map((service, idx) => (
            <div key={idx} className={styles.serviceItem}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{t(service.descKey as any)}</p>
              
              <ul className={styles.detailsList}>
                <li><strong>{t('services.label.who')}</strong> {t(service.whoKey as any)}</li>
                <li><strong>{t('services.label.benefits')}</strong> {t(service.benefitsKey as any)}</li>
              </ul>
              
              <Link href="#planla" className={styles.ctaButton}>
                {t('services.cta')} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
