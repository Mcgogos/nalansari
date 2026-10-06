import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  return (
    <Link 
      href="https://wa.me/905444798807" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label="WhatsApp üzerinden bize ulaşın"
    >
      <MessageCircle size={24} />
      <span className={styles.text}>{t('wa.text')} &rarr;</span>
    </Link>
  );
}
