'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, ArrowRight, Gift } from 'lucide-react';
import styles from './FreeTrialForm.module.css';

const PROGRAMS = [
  { id: 'reformer', labelTr: 'Reformer Pilates', labelEn: 'Reformer Pilates' },
  { id: 'mat',      labelTr: 'Mat Pilates',       labelEn: 'Mat Pilates' },
  { id: 'klinik',   labelTr: 'Klinik Pilates',    labelEn: 'Clinical Pilates' },
  { id: 'fitness',  labelTr: 'Fitness & PT',       labelEn: 'Fitness & PT' },
];

export default function FreeTrialForm() {
  const { language } = useLanguage();
  const [program, setProgram] = useState('');
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const isValid = program && name.trim().length > 1 && phone.trim().length > 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);

    // Build WhatsApp message with the registration details
    const selectedProgram = PROGRAMS.find(p => p.id === program);
    const progLabel = language === 'tr' ? selectedProgram?.labelTr : selectedProgram?.labelEn;
    const msg = language === 'tr'
      ? `Merhaba Nalan Hanım! Ücretsiz deneme dersine kayıt olmak istiyorum.\n\n👤 İsim: ${name}\n📞 Telefon: ${phone}\n🏋️ Program: ${progLabel}`
      : `Hi Nalan! I would like to register for a free trial class.\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🏋️ Program: ${progLabel}`;

    // Simulate a brief loading state then open WhatsApp + show success
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(`https://api.whatsapp.com/send?phone=905444798807&text=${encodeURIComponent(msg)}`, '_blank');
    }, 800);
  };

  return (
    <section className={styles.section} id="ucretsiz-deneme">
      <div className={`container ${styles.container}`}>

        {/* Badge */}
        <div className={styles.badge}>
          <Gift size={16} />
          <span>{language === 'tr' ? 'Sınırlı Kontenjan' : 'Limited Spots'}</span>
        </div>

        <h2 className={`display-text ${styles.heading}`}>
          {language === 'tr' ? 'Ücretsiz Deneme Dersine Kaydol' : 'Register for a Free Trial Class'}
        </h2>
        <p className={`text-lg ${styles.subheading}`}>
          {language === 'tr'
            ? 'İlk dersinizi ücretsiz deneyin. Kayıt formunu doldurun, size 24 saat içinde dönelim.'
            : 'Try your first class for free. Fill the form and we will reach you within 24 hours.'}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>

            {/* Step 1: Pick program */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                {language === 'tr' ? 'Hangi programı denemek istersiniz?' : 'Which program do you want to try?'}
              </label>
              <div className={styles.programGrid}>
                {PROGRAMS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className={`${styles.programBtn} ${program === p.id ? styles.programSelected : ''}`}
                    onClick={() => setProgram(p.id)}
                  >
                    {language === 'tr' ? p.labelTr : p.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Personal info */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="trial-name" className={styles.label}>
                  {language === 'tr' ? 'Adınız Soyadınız' : 'Full Name'}
                </label>
                <input
                  id="trial-name"
                  type="text"
                  className={styles.input}
                  placeholder={language === 'tr' ? 'Adınızı girin…' : 'Enter your name…'}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="trial-phone" className={styles.label}>
                  {language === 'tr' ? 'Telefon Numaranız' : 'Phone Number'}
                </label>
                <input
                  id="trial-phone"
                  type="tel"
                  className={styles.input}
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn ${styles.submitBtn} ${!isValid ? styles.disabled : ''}`}
              disabled={!isValid || loading}
            >
              {loading
                ? (language === 'tr' ? 'Gönderiliyor…' : 'Sending…')
                : (language === 'tr' ? 'Şimdi Kaydol — Ücretsiz' : 'Register Now — Free')}
              {!loading && <ArrowRight size={18} />}
            </button>

            <p className={styles.note}>
              {language === 'tr'
                ? '* Formunuz WhatsApp üzerinden iletilecek. Kişisel bilgileriniz güvende.'
                : '* Your form will be sent via WhatsApp. Your info is safe.'}
            </p>

          </form>
        ) : (
          <div className={styles.success}>
            <CheckCircle2 size={56} className={styles.successIcon} />
            <h3 className="text-h3">
              {language === 'tr' ? 'Kaydınız Alındı! 🎉' : 'Registration Received! 🎉'}
            </h3>
            <p className="text-body-lg">
              {language === 'tr'
                ? 'WhatsApp mesajınız hazırlandı. En kısa sürede size dönüş yapacağız!'
                : 'Your WhatsApp message is ready. We will get back to you shortly!'}
            </p>
            <button className={`btn ${styles.resetBtn}`} onClick={() => { setSubmitted(false); setProgram(''); setName(''); setPhone(''); }}>
              {language === 'tr' ? 'Yeni Kayıt' : 'New Registration'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
