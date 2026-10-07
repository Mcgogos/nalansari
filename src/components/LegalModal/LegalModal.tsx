'use client';

import React from 'react';
import { X } from 'lucide-react';
import styles from './LegalModal.module.css';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {type === 'privacy' ? (
          <div className={styles.content}>
            <span className={styles.badge}>MUSE CREATIVE HOUSE</span>
            <h2>Gizlilik Politikası (Privacy Policy)</h2>
            <p className={styles.lastUpdated}>Son Güncelleme: 2026 · Kocaeli / Körfez</p>

            <div className={styles.body}>
              <h3>1. Veri Sorumlusu ve Genel İlke</h3>
              <p>
                Muse Creative House ve Nalan Sarı Pilates & Fitness olarak, web sitemizi ziyaret eden kullanıcılarımızın kişisel verilerinin korunmasına ve gizliliğine azami önem veriyoruz. İşbu politika 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca hazırlanmıştır.
              </p>

              <h3>2. Toplanan Kişisel Veriler</h3>
              <p>Sitemiz üzerinden ücretsiz deneme kaydı veya WhatsApp iletişimi gerçekleştirdiğinizde aşağıdaki verileriniz işlenebilir:</p>
              <ul>
                <li>Ad, Soyad ve Telefon Numarası</li>
                <li>Tercih edilen antrenman programı (Reformer, Mat, Klinik Pilates, Fitness)</li>
                <li>İletişim ve randevu zamanı tercihleri</li>
              </ul>

              <h3>3. Verilerin İşlenme Amacı</h3>
              <p>Toplanan kişisel verileriniz;</p>
              <ul>
                <li>Randevu ve ücretsiz deneme dersi süreçlerinin yürütülmesi,</li>
                <li>İletişim taleplerinize WhatsApp veya telefon üzerinden yanıt verilmesi,</li>
                <li>Hizmet kalitesinin artırılması amaçlarıyla işlenir.</li>
              </ul>

              <h3>4. Veri Güvenliği ve İletişim</h3>
              <p>
                Kişisel verileriniz üçüncü şahıslara satılmaz veya kiralanmaz. Yasal haklarınızı kullanmak veya verilerinizin güncellenmesini talep etmek için <strong>0530 205 06 06</strong> WhatsApp hattımız üzerinden Muse Creative House ile iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <span className={styles.badge}>MUSE CREATIVE HOUSE</span>
            <h2>Kullanım Koşulları (Terms of Use)</h2>
            <p className={styles.lastUpdated}>Son Güncelleme: 2026 · Kocaeli / Körfez</p>

            <div className={styles.body}>
              <h3>1. Şartların Kabulü</h3>
              <p>
                Bu web sitesini ziyaret ederek işbu Kullanım Koşullarını ve site üzerindeki yasal bildirimleri kayıtsız şartsız kabul etmiş sayılırsınız.
              </p>

              <h3>2. Fikri Mülkiyet Hakları</h3>
              <p>
                Web sitesinde yer alan tüm tasarım ögeleri, yazılım altyapısı, grafikler, "Muse Creative House" markası ve özel tipografi sistemleri Muse Creative House tarafınca tasarlanmış olup telif hakkı koruması altındadır. İzinsiz kopyalanamaz.
              </p>

              <h3>3. Hizmet ve Kayıt Şartları</h3>
              <p>
                Sitede sunulan ön kayıt formları bilgi alma amacı taşır. Kontenjan durumuna göre stüdyo yönetimi randevu saatlerini düzenleme hakkını saklı tutar.
              </p>

              <h3>4. İletişim ve Destek</h3>
              <p>
                Kullanım koşullarıyla ilgili her türlü soru için <strong>0530 205 06 06</strong> numaralı WhatsApp hattımız üzerinden doğrudan Muse Creative House ekibine ulaşabilirsiniz.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
