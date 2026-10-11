'use client';

import React from 'react';
import styles from './ReviewsAndVoice.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { Star, Quote, ExternalLink } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Selin A.',
    date: '2 weeks ago',
    dateTr: '2 hafta önce',
    textEn: "I suffered from chronic back and neck pain from long hours at my desk. After 3 months of Reformer therapy with Nalan, my pain is completely gone!",
    textTr: "Masa başı çalışmaktan oluşan boyun ve bel ağrılarım Nalan Hoca ile 3 aylık Reformer terapisi sonrası tamamen bitti. Nalan Hanım'ın ilgisi mükemmel!",
  },
  {
    id: 2,
    name: 'Merve K.',
    date: '1 month ago',
    dateTr: '1 ay önce',
    textEn: "The cleanest and most peaceful Pilates studio in Kocaeli! Nalan's professional technique and energy are unmatched. My core strength doubled.",
    textTr: "Körfez'de pilates ve fitness için tek adres! Nalan Hanım'ın tekniği ve enerjisi harika. Duruşum belirgin şekilde düzeldi, stüdyo çok hijyenik.",
  },
  {
    id: 3,
    name: 'Deniz T.',
    date: '2 months ago',
    dateTr: '2 ay önce',
    textEn: "Started Clinical Pilates after herniated disc surgery. After 2 months, my back pain is totally resolved. Thank you Nalan Sarı!",
    textTr: "Bel fıtığı operasyonu sonrası doktorumun yönlendirmesiyle başladım. 2. aydan itibaren bel ağrılarımdan eser kalmadı. Çok memnunum.",
  },
  {
    id: 4,
    name: 'Büşra G.',
    date: '3 months ago',
    dateTr: '3 ay önce',
    textEn: "Personalized training programs shaped my body completely. Lessons are so enjoyable that time flies. Best Pilates studio!",
    textTr: "Kişiye özel antrenman programı sayesinde hem sıkılaştım hem de sırtımdaki postür bozukluğu düzeldi. Dersler inanılmaz keyifli geçiyor.",
  },
  {
    id: 5,
    name: 'Hande Y.',
    date: '5 months ago',
    dateTr: '5 ay önce',
    textEn: "Joined Reformer classes for postpartum recovery. Results are amazing! My body reshaped and tightened in just 3 months.",
    textTr: "Özellikle doğum sonrası toparlanma ve core bölgesi güçlendirme için katıldım. Sonuçlar harika! 3 ayda vücudum yeniden şekillendi.",
  }
];

export default function ReviewsAndVoice() {
  const { language } = useLanguage();

  return (
    <section className={styles.section} id="reviews">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <div className={styles.googleBadge}>
            <span className={styles.googleG}>G</span>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={15} fill="#FABB05" color="#FABB05" />)}
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
                    <h4 className={styles.clientName}>{review.name}</h4>
                    <span className={`text-caption ${styles.date}`}>{language === 'tr' ? review.dateTr : review.date}</span>
                  </div>
                  <div className={styles.cardIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Review" width={20} height={20} />
                  </div>
                </div>

                <div className={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="#FABB05" color="#FABB05" />)}
                </div>

                <p className={styles.reviewText}>
                  <Quote size={14} className={styles.quoteIcon} />
                  {language === 'tr' ? review.textTr : review.textEn}
                </p>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
