'use client';
import React, { useState } from 'react';
import styles from './BodyMap.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type BodyZone = 'neck' | 'core' | 'back' | 'legs';

const ZONES_DATA: Record<BodyZone, { titleEn: string, titleTr: string, descEn: string, descTr: string, recEn: string, recTr: string }> = {
  neck: {
    titleEn: "Neck & Shoulders",
    titleTr: "Boyun ve Omuzlar",
    descEn: "Relieve tension from desk work and poor posture.",
    descTr: "Masa başı çalışmanın ve kötü duruşun yarattığı gerginliği giderin.",
    recEn: "Reformer Therapy",
    recTr: "Reformer Terapisi"
  },
  core: {
    titleEn: "Core",
    titleTr: "Karın (Core)",
    descEn: "Build a strong center for better balance and power.",
    descTr: "Daha iyi denge ve güç için sağlam bir merkez oluşturun.",
    recEn: "Mat Pilates",
    recTr: "Mat Pilates"
  },
  back: {
    titleEn: "Back",
    titleTr: "Sırt ve Bel",
    descEn: "Strengthen your spine and eliminate lower back pain.",
    descTr: "Omurganızı güçlendirin ve bel ağrılarından kurtulun.",
    recEn: "Clinical Pilates",
    recTr: "Klinik Pilates"
  },
  legs: {
    titleEn: "Legs & Glutes",
    titleTr: "Bacaklar ve Kalça",
    descEn: "Tone lower body and improve overall flexibility.",
    descTr: "Alt bedeninizi sıkılaştırın ve genel esnekliğinizi artırın.",
    recEn: "Fitness / PT",
    recTr: "Fitness / PT"
  }
};

export default function BodyMap() {
  const { language } = useLanguage();
  const [activeZone, setActiveZone] = useState<BodyZone | null>(null);

  const activeData = activeZone ? ZONES_DATA[activeZone] : null;

  return (
    <section className={styles.section} id="bodymap">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <h2 className="display-text">{language === 'tr' ? 'Vücudunuz Ne İstiyor?' : 'What Does Your Body Need?'}</h2>
          <p className="text-lg">
            {language === 'tr' 
              ? "Geliştirmek istediğiniz veya ağrı hissettiğiniz bölgeyi seçin, size en uygun programı önerelim."
              : "Select the area you want to improve or where you feel tension, and we'll recommend the best program."}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.mapContainer}>
            <svg viewBox="0 0 400 800" className={styles.svgMap}>
              {/* Abstract Human Silhouette */}
              <path d="M200 40 C170 40, 170 90, 200 90 C230 90, 230 40, 200 40 Z" fill="var(--color-charcoal)" />
              <path d="M150 110 Q200 80 250 110 L280 300 Q200 350 120 300 Z" fill="var(--color-charcoal)" />
              <path d="M160 300 L140 700 Q200 750 200 700 L200 300 Z" fill="var(--color-charcoal)" />
              <path d="M240 300 L260 700 Q200 750 200 700 L200 300 Z" fill="var(--color-charcoal)" />
              <path d="M150 110 L80 350 Q100 370 120 350 L160 150 Z" fill="var(--color-charcoal)" />
              <path d="M250 110 L320 350 Q300 370 280 350 L240 150 Z" fill="var(--color-charcoal)" />
              
              {/* Interactive Zones - Neck */}
              <circle cx="200" cy="100" r="40" className={`${styles.zone} ${activeZone === 'neck' ? styles.active : ''}`} onClick={() => setActiveZone('neck')} />
              {/* Interactive Zones - Back/Shoulders */}
              <ellipse cx="200" cy="180" rx="70" ry="50" className={`${styles.zone} ${activeZone === 'back' ? styles.active : ''}`} onClick={() => setActiveZone('back')} />
              {/* Interactive Zones - Core */}
              <ellipse cx="200" cy="280" rx="60" ry="50" className={`${styles.zone} ${activeZone === 'core' ? styles.active : ''}`} onClick={() => setActiveZone('core')} />
              {/* Interactive Zones - Legs */}
              <path d="M120 350 L140 650 Q200 650 200 350 Z" className={`${styles.zone} ${activeZone === 'legs' ? styles.active : ''}`} onClick={() => setActiveZone('legs')} />
              <path d="M280 350 L260 650 Q200 650 200 350 Z" className={`${styles.zone} ${activeZone === 'legs' ? styles.active : ''}`} onClick={() => setActiveZone('legs')} />
            </svg>
            
            {/* Pulsing Dots */}
            {!activeZone && (
              <>
                <div className={`${styles.pulseDot} ${styles.dotNeck}`}></div>
                <div className={`${styles.pulseDot} ${styles.dotBack}`}></div>
                <div className={`${styles.pulseDot} ${styles.dotCore}`}></div>
                <div className={`${styles.pulseDot} ${styles.dotLegs}`}></div>
              </>
            )}
          </div>

          <div className={styles.infoContainer}>
            {activeData ? (
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <h3 className="text-h3">{language === 'tr' ? activeData.titleTr : activeData.titleEn}</h3>
                  <div className={styles.badge}>
                    {language === 'tr' ? 'Öneri' : 'Recommendation'}
                  </div>
                </div>
                <p className={`text-body ${styles.cardDesc}`}>
                  {language === 'tr' ? activeData.descTr : activeData.descEn}
                </p>
                <div className={styles.recommendation}>
                  <h4 className="text-h4">{language === 'tr' ? activeData.recTr : activeData.recEn}</h4>
                </div>
                
                <Link href={`https://wa.me/905444798807?text=${encodeURIComponent(language === 'tr' ? `Merhaba, ${activeData.titleTr} bölgesi için ${activeData.recTr} hakkında bilgi almak istiyorum.` : `Hi, I'd like info about ${activeData.recEn} for my ${activeData.titleEn}.`)}`} className={`btn ${styles.ctaBtn}`}>
                  {language === 'tr' ? 'Detaylı Bilgi Al' : 'Get Details'} <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className={styles.placeholderCard}>
                <ChevronRight size={32} className={styles.placeholderIcon} />
                <p className="text-body-lg">
                  {language === 'tr' 
                    ? "Vücudunuzdaki bir bölgeyi seçerek analize başlayın." 
                    : "Select an area on the body to begin analysis."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
