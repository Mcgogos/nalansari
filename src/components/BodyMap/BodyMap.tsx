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

export default function BodyMap({ embedded = false }: { embedded?: boolean }) {
  const { language } = useLanguage();
  const [activeZone, setActiveZone] = useState<BodyZone | null>(null);

  const activeData = activeZone ? ZONES_DATA[activeZone] : null;

  return (
    <section className={embedded ? styles.sectionEmbedded : styles.section} id="bodymap">
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
              {/* Realistic Female Silhouette Image */}
              <image href="/images/body-map.jpg" x="-100" y="0" width="600" height="800" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.9, mixBlendMode: 'screen' }} />
              
              {/* Interactive Zones - Neck */}
              <circle cx="200" cy="130" r="40" className={`${styles.zone} ${activeZone === 'neck' ? styles.active : ''}`} onClick={() => setActiveZone('neck')} />
              {/* Interactive Zones - Back/Shoulders */}
              <ellipse cx="200" cy="220" rx="70" ry="50" className={`${styles.zone} ${activeZone === 'back' ? styles.active : ''}`} onClick={() => setActiveZone('back')} />
              {/* Interactive Zones - Core */}
              <ellipse cx="200" cy="350" rx="60" ry="60" className={`${styles.zone} ${activeZone === 'core' ? styles.active : ''}`} onClick={() => setActiveZone('core')} />
              {/* Interactive Zones - Legs */}
              <path d="M140 450 L160 750 Q200 770 240 750 L260 450 Z" className={`${styles.zone} ${activeZone === 'legs' ? styles.active : ''}`} onClick={() => setActiveZone('legs')} />
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
