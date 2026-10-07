"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ConversionForm.module.css';

const stepsConfig = [
  {
    id: 1,
    titleKey: 'form.step1.title',
    optionsKeys: ['form.step1.opt1', 'form.step1.opt2', 'form.step1.opt3', 'form.step1.opt4', 'form.step1.opt5']
  },
  {
    id: 2,
    titleKey: 'form.step2.title',
    optionsKeys: ['form.step2.opt1', 'form.step2.opt2', 'form.step2.opt3', 'form.step2.opt4', 'form.step2.opt5', 'form.step2.opt6']
  },
  {
    id: 3,
    titleKey: 'form.step3.title',
    optionsKeys: ['form.step3.opt1', 'form.step3.opt2', 'form.step3.opt3']
  }
];

export default function ConversionForm() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    interest: '',
    goal: '',
    experience: '',
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const msg = `Merhaba Nalan Hanım! Ön değerlendirme formunu doldurdum:\n\n👤 İsim: ${formData.name}\n📞 Telefon: ${formData.phone}\n🎯 İlgi: ${formData.interest}\n💪 Hedef: ${formData.goal}\n⭐ Deneyim: ${formData.experience}`;
    window.open(`https://api.whatsapp.com/send?phone=905444798807&text=${encodeURIComponent(msg)}`, '_blank');
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.interest !== '';
    if (currentStep === 2) return formData.goal !== '';
    if (currentStep === 3) return formData.experience !== '';
    return formData.name !== '' && formData.phone !== '';
  };

  return (
    <section className={styles.section} id="planla">
      <div className="container">
        <div className={styles.formContainer}>
          
          {!isSubmitted ? (
            <>
              <div className={styles.header}>
                <h2 className={styles.title}>{t('form.title')}</h2>
                <p className={styles.subtitle}>{t('form.subtitle')}</p>
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressLine}></div>
                <div 
                  className={styles.progressActiveLine} 
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>
                {[1, 2, 3, 4].map((step) => (
                  <div 
                    key={step} 
                    className={`${styles.progressDot} ${currentStep === step ? styles.active : ''} ${currentStep > step ? styles.completed : ''}`}
                  ></div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {currentStep <= 3 && (
                  <div>
                    <h3 className={styles.stepTitle}>{t(stepsConfig[currentStep - 1].titleKey as any)}</h3>
                    <div className={styles.optionsGrid}>
                      {stepsConfig[currentStep - 1].optionsKeys.map((optKey) => {
                        const fieldName = currentStep === 1 ? 'interest' : currentStep === 2 ? 'goal' : 'experience';
                        const optValue = t(optKey as any);
                        const isSelected = formData[fieldName as keyof typeof formData] === optValue;
                        return (
                          <button
                            key={optKey}
                            type="button"
                            className={`${styles.optionBtn} ${isSelected ? styles.selected : ''}`}
                            onClick={() => handleOptionSelect(fieldName, optValue)}
                          >
                            {optValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h3 className={styles.stepTitle}>{t('form.step4.title')}</h3>
                    <div className={styles.inputGroup}>
                      <input 
                        type="text" 
                        placeholder={t('form.input.name')}
                        className={styles.input}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                      <input 
                        type="tel" 
                        placeholder={t('form.input.phone')} 
                        className={styles.input}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                      <textarea 
                        placeholder={t('form.input.message')} 
                        className={styles.input}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className={styles.navButtons}>
                  {currentStep > 1 && (
                    <button type="button" className={styles.backBtn} onClick={handleBack}>
                      {t('form.btn.back')}
                    </button>
                  )}
                  
                  {currentStep < 4 ? (
                    <button 
                      type="button" 
                      className={styles.nextBtn} 
                      onClick={handleNext}
                      disabled={!isStepValid()}
                    >
                      {t('form.btn.next')} <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className={styles.submitBtn}
                      disabled={!isStepValid()}
                    >
                      {t('form.btn.submit')} <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className={styles.successMessage}>
              <h3 className={styles.successTitle}>{t('form.success.title')}</h3>
              <p className={styles.successDesc}>{t('form.success.desc')}</p>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}
