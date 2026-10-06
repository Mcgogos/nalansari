"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './GoalSelector.module.css';

const goals = [
  { id: 'posture', labelKey: 'goal.posture', programs: ['Pilates', 'Personal Training'] },
  { id: 'strength', labelKey: 'goal.strength', programs: ['Fitness', 'Personal Training'] },
  { id: 'flexibility', labelKey: 'goal.flexibility', programs: ['Pilates'] },
];

export default function GoalSelector() {
  const { t } = useLanguage();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const activePrograms = selectedGoal 
    ? goals.find(g => g.id === selectedGoal)?.programs || []
    : [];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>{t('goal.title')}</h2>
        
        <div className={styles.optionsGrid}>
          {goals.map((goal) => (
            <button
              key={goal.id}
              className={`${styles.optionBtn} ${selectedGoal === goal.id ? styles.active : ''}`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              {t(goal.labelKey as any)}
            </button>
          ))}
        </div>

        <div className={`${styles.resultArea} ${selectedGoal ? styles.visible : ''}`}>
          <p className={styles.resultTitle}>{selectedGoal === 'flexibility' ? t('goal.flex.title') : selectedGoal === 'strength' ? t('goal.str.title') : t('goal.post.title')}</p>
          <div className={styles.recommendations}>
            {activePrograms.map((prog, index) => (
              <div key={index} className={styles.recCard}>
                <h3 className={styles.recTitle}>{prog}</h3>
              </div>
            ))}
          </div>
          <Link href="#planla" className={styles.ctaButton}>
            {t('nav.book')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
