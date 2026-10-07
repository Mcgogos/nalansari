'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ReviewsAndVoice.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { Star, Play, Pause, Quote, ExternalLink } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Selin A.',
    date: '2 weeks ago',
    dateTr: '2 hafta önce',
    textEn: "I suffered from chronic back and neck pain from long hours at my desk. After 3 months of Reformer therapy with Nalan, my pain is completely gone and my posture is reformed!",
    textTr: "Masa başı çalışmaktan oluşan boyun ve bel ağrılarım Nalan Hoca ile 3 aylık Reformer terapisi sonrası tamamen bitti. Duruşum ve sırt sağlığım mükemmel seviyeye ulaştı. Nalan Hanım'ın ilgisi harika!",
    hasVoice: true,
  },
  {
    id: 2,
    name: 'Merve K.',
    date: '1 month ago',
    dateTr: '1 ay önce',
    textEn: "The cleanest and most peaceful Pilates studio in Kocaeli! Nalan's professional technique and energy are unmatched. My core strength has doubled.",
    textTr: "Körfez'de pilates ve fitness için tek adres! Nalan Hanım'ın tekniği, enerjisi ve profesyonelliği harika. Duruş bozukluğum belirgin şekilde düzeldi, stüdyo son derece hijyenik.",
    hasVoice: false,
  },
  {
    id: 3,
    name: 'Deniz T.',
    date: '2 months ago',
    dateTr: '2 ay önce',
    textEn: "Started Clinical Pilates after herniated disc surgery on my doctor's recommendation. After 2 months, my back pain is totally resolved. Thank you Nalan Sarı!",
    textTr: "Bel fıtığı operasyonu sonrası doktorumun yönlendirmesiyle Klinik Pilatese başladım. 2. aydan itibaren bel ağrılarımdan eser kalmadı. Kendinizi güvenle emanet edebilirsiniz.",
    hasVoice: true,
  },
  {
    id: 4,
    name: 'Büşra G.',
    date: '3 months ago',
    dateTr: '3 ay önce',
    textEn: "Personalized training programs shaped my posture and body completely. Lessons are so enjoyable that time flies. Best experience ever!",
    textTr: "Kişiye özel antrenman programı sayesinde hem sıkılaştım hem de sırtımdaki postür bozukluğu düzeldi. Dersler o kadar keyifli geçiyor ki zamanın nasıl aktığını anlamıyorum.",
    hasVoice: false,
  },
  {
    id: 5,
    name: 'Gamze U.',
    date: '4 months ago',
    dateTr: '4 ay önce',
    textEn: "Modern reformer machines, spotless hygiene, and true personal space. Nalan is deeply experienced and motivating.",
    textTr: "Kocaeli'de gidilebilecek en kaliteli ve nezih pilates stüdyosu. Aletler gıcır gıcır ve kişisel alana büyük saygı var. Nalan Hoca son derece deneyimli ve motive edici.",
    hasVoice: false,
  },
  {
    id: 6,
    name: 'Hande Y.',
    date: '5 months ago',
    dateTr: '5 ay önce',
    textEn: "Joined Reformer classes for postpartum recovery and core strengthening. Results are amazing! My body reshaped in just 3 months.",
    textTr: "Özellikle doğum sonrası toparlanma ve core bölgesi güçlendirme için Reformer derslerine katıldım. Sonuçlar inanılmaz! 3 ayda vücudum yeniden şekillendi.",
    hasVoice: true,
  }
];

export default function ReviewsAndVoice() {
  const { language } = useLanguage();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audioRef.current.addEventListener('ended', () => setPlayingId(null));
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = (id: number) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      setPlayingId(id);
      audioRef.current?.play().catch(e => console.log('Audio play error:', e));
    }
  };

  return (
    <section className={styles.section} id="reviews">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <div className={styles.googleBadge}>
            <span className={styles.googleG}>G</span>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FABB05" color="#FABB05" />)}
            </div>
            <span className="text-caption">5.0</span>
          </div>

          <h2 className="display-text">{language === 'tr' ? 'Danışanlarımızın Deneyimleri' : 'Client Experiences'}</h2>
          <p className="text-lg">
            {language === 'tr' 
              ? "Google Haritalar üzerindeki gerçek danışan yorumlarımız ve stüdyomuzda dönüşüm yaşayan misafirlerimizin hikayeleri."
              : "Real Google Maps client reviews and stories of transformation at our studio."}
          </p>

          <a 
            href="https://www.google.com/maps/search/?api=1&query=Nalan+Sari+Pilates+Fitness+Kocaeli" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.googleLinkBtn}
          >
            {language === 'tr' ? "Google'da Tüm Yorumları İnceleyin (5.0 ★★★★★)" : "View All Google Reviews (5.0 ★★★★★)"}
            <ExternalLink size={14} />
          </a>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            {REVIEWS.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                
                <div className={styles.cardTop}>
                  <div className={styles.avatar}>
                    {review.name.charAt(0)}
                  </div>
                  <div className={styles.meta}>
                    <h4 className="text-h4">{review.name}</h4>
                    <span className={`text-caption ${styles.date}`}>{language === 'tr' ? review.dateTr : review.date}</span>
                  </div>
                  <div className={styles.cardIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Review" width={24} height={24} />
                  </div>
                </div>

                <div className={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#FABB05" color="#FABB05" />)}
                </div>

                <p className={`text-body ${styles.reviewText}`}>
                  <Quote size={16} className={styles.quoteIcon} />
                  {language === 'tr' ? review.textTr : review.textEn}
                </p>

                {review.hasVoice && (
                  <div className={styles.voiceNote}>
                    <button 
                      className={styles.playBtn} 
                      onClick={() => togglePlay(review.id)}
                      aria-label={playingId === review.id ? "Pause voice note" : "Play voice note"}
                    >
                      {playingId === review.id ? <Pause size={18} /> : <Play size={18} className={styles.playIconOffset} />}
                    </button>
                    <div className={styles.waveform}>
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`${styles.bar} ${playingId === review.id ? styles.barAnimated : ''}`}
                          style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                    <span className={`text-caption ${styles.duration}`}>0:12</span>
                  </div>
                )}
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
