'use client';
import React, { useState } from 'react';
import styles from './OnboardingQuiz.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type Goal = 'posture' | 'weight' | 'pain' | 'flexibility';
type Experience = 'beginner' | 'intermediate' | 'advanced';

export default function OnboardingQuiz() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  
  const startQuiz = () => setStep(1);
  const backStep = () => setStep(step - 1);

  const handleGoalSelect = (selectedGoal: Goal) => {
    setGoal(selectedGoal);
    setStep(2);
  };

  const handleExperienceSelect = (selectedExp: Experience) => {
    setExperience(selectedExp);
    setStep(3); // Result page
  };

  const getRecommendation = () => {
    if (goal === 'pain') return language === 'tr' ? 'Klinik Pilates' : 'Clinical Pilates';
    if (goal === 'weight') return language === 'tr' ? 'Fitness & PT' : 'Fitness & PT';
    if (experience === 'beginner') return language === 'tr' ? 'Başlangıç Mat Pilates' : 'Beginner Mat Pilates';
    return language === 'tr' ? 'Reformer Terapisi' : 'Reformer Therapy';
  };

  const whatsappMessage = language === 'tr'
    ? `Merhaba Nalan Hanım, web sitenizdeki testi çözdüm. Hedefim: ${goal}, Seviyem: ${experience}. Önerilen program: ${getRecommendation()}. Bu konuda detaylı bilgi alabilir miyim?`
    : `Hi Nalan, I took the quiz on your website. Goal: ${goal}, Level: ${experience}. Recommended program: ${getRecommendation()}. Can I get more details?`;

  return (
    <section className={styles.section} id="quiz">
      <div className={`container ${styles.container}`}>
        <div className={styles.quizWrapper}>
          
          {step === 0 && (
            <div className={styles.stepContent}>
              <h2 className="display-text">{language === 'tr' ? 'Sizin İçin En Doğru Program Hangisi?' : 'Which Program Is Right For You?'}</h2>
              <p className="text-lg">
                {language === 'tr' 
                  ? "Sadece 2 soruyla hedeflerinize ve seviyenize en uygun antrenman modelini keşfedin."
                  : "Discover the perfect workout model for your goals and level in just 2 questions."}
              </p>
              <button onClick={startQuiz} className={`btn ${styles.startBtn}`}>
                {language === 'tr' ? 'Teste Başla' : 'Start Quiz'} <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 1 && (
            <div className={styles.stepContent}>
              <button onClick={backStep} className={styles.backBtn}><ChevronLeft size={24} /></button>
              <h3 className="text-h2">{language === 'tr' ? 'Öncelikli hedefiniz nedir?' : 'What is your primary goal?'}</h3>
              
              <div className={styles.optionsGrid}>
                <button className={`${styles.optionBtn} ${goal === 'posture' ? styles.selected : ''}`} onClick={() => handleGoalSelect('posture')}>
                  <span className="text-lg">{language === 'tr' ? 'Duruş Bozukluğunu Düzeltmek' : 'Fix Posture'}</span>
                </button>
                <button className={`${styles.optionBtn} ${goal === 'weight' ? styles.selected : ''}`} onClick={() => handleGoalSelect('weight')}>
                  <span className="text-lg">{language === 'tr' ? 'Kilo Vermek ve Sıkılaşmak' : 'Lose Weight & Tone'}</span>
                </button>
                <button className={`${styles.optionBtn} ${goal === 'pain' ? backStep : ''}`} onClick={() => handleGoalSelect('pain')}>
                  <span className="text-lg">{language === 'tr' ? 'Ağrılardan Kurtulmak (Bel/Boyun)' : 'Relieve Pain (Back/Neck)'}</span>
                </button>
                <button className={`${styles.optionBtn} ${goal === 'flexibility' ? styles.selected : ''}`} onClick={() => handleGoalSelect('flexibility')}>
                  <span className="text-lg">{language === 'tr' ? 'Esneklik ve Denge' : 'Flexibility & Balance'}</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <button onClick={backStep} className={styles.backBtn}><ChevronLeft size={24} /></button>
              <h3 className="text-h2">{language === 'tr' ? 'Spor geçmişiniz nasıl?' : 'What is your fitness experience?'}</h3>
              
              <div className={styles.optionsGrid}>
                <button className={`${styles.optionBtn} ${experience === 'beginner' ? styles.selected : ''}`} onClick={() => handleExperienceSelect('beginner')}>
                  <span className="text-lg">{language === 'tr' ? 'Yeni Başlıyorum (Hiç spor yapmadım)' : 'Beginner (Never worked out)'}</span>
                </button>
                <button className={`${styles.optionBtn} ${experience === 'intermediate' ? styles.selected : ''}`} onClick={() => handleExperienceSelect('intermediate')}>
                  <span className="text-lg">{language === 'tr' ? 'Ara Sıra Yapıyorum (Biraz tecrübem var)' : 'Intermediate (Some experience)'}</span>
                </button>
                <button className={`${styles.optionBtn} ${experience === 'advanced' ? styles.selected : ''}`} onClick={() => handleExperienceSelect('advanced')}>
                  <span className="text-lg">{language === 'tr' ? 'Düzenli Spor Yapıyorum (İleriyim)' : 'Advanced (Workout regularly)'}</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`${styles.stepContent} ${styles.resultContent}`}>
              <CheckCircle2 size={64} className={styles.successIcon} />
              <h4 className="text-h4">{language === 'tr' ? 'Sizin İçin En İdeal Program' : 'Your Ideal Program'}</h4>
              <h2 className="display-text">{getRecommendation()}</h2>
              <p className="text-body-lg">
                {language === 'tr' 
                  ? "Hedefleriniz ve seviyeniz doğrultusunda sizin için harika bir yol haritamız var. Hemen bize ulaşın ve ilk dersinizi planlayalım."
                  : "Based on your goals and level, we have a perfect roadmap for you. Contact us now to schedule your first session."}
              </p>
              
              <div className={styles.resultActions}>
                <Link href={`https://wa.me/905444798807?text=${encodeURIComponent(whatsappMessage)}`} className={`btn ${styles.whatsappBtn}`}>
                  {language === 'tr' ? 'WhatsApp Üzerinden Bilgi Al' : 'Get Info via WhatsApp'}
                </Link>
                <button onClick={() => setStep(0)} className={styles.restartBtn}>
                  <span className="text-nav">{language === 'tr' ? 'Testi Tekrar Çöz' : 'Retake Quiz'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          {step > 0 && step < 3 && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(step / 2) * 100}%` }}></div>
              </div>
              <span className="text-caption">{step} / 2</span>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}
