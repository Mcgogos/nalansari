'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './ReviewsAndVoice.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { Star, Play, Pause, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Ayşe Y.',
    date: '2 months ago',
    dateTr: '2 ay önce',
    textEn: "I suffered from chronic back pain for years. Just 3 months of reformer therapy completely changed my posture. Nalan is an incredible instructor.",
    textTr: "Yıllardır kronik bel ağrısı çekiyordum. Sadece 3 aylık reformer terapisi duruşumu tamamen değiştirdi. Nalan harika bir eğitmen.",
    hasVoice: true,
  },
  {
    id: 2,
    name: 'Zeynep K.',
    date: '1 week ago',
    dateTr: '1 hafta önce',
    textEn: "The studio is so clean and peaceful. It feels like a premium retreat. My core has never been this strong.",
    textTr: "Stüdyo inanılmaz temiz ve huzurlu. Premium bir inziva alanı gibi hissettiriyor. Merkez bölgem (core) hiç bu kadar güçlü olmamıştı.",
    hasVoice: false,
  },
  {
    id: 3,
    name: 'Burcu M.',
    date: '3 months ago',
    dateTr: '3 ay önce',
    textEn: "Lost 8 kilos and gained so much flexibility. Nalan's personalized programs are unmatched in the city.",
    textTr: "8 kilo verdim ve inanılmaz bir esneklik kazandım. Nalan'ın kişiye özel programlarının şehirde eşi benzeri yok.",
    hasVoice: true,
  },
  {
    id: 4,
    name: 'Elif S.',
    date: '5 months ago',
    dateTr: '5 ay önce',
    textEn: "Absolutely the best Pilates experience! The attention to detail in every movement makes all the difference.",
    textTr: "Kesinlikle en iyi Pilates deneyimi! Her hareketteki detaya verilen önem tüm farkı yaratıyor.",
    hasVoice: false,
  }
];

export default function ReviewsAndVoice() {
  const { language } = useLanguage();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // placeholder relaxing chime
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
              ? "Sadece sözlerimize değil, stüdyomuzda dönüşüm yaşayan misafirlerimizin gerçek hikayelerine kulak verin."
              : "Don't just take our word for it. Listen to the real stories of clients who transformed in our studio."}
          </p>
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
                      {/* CSS visual waveform */}
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
