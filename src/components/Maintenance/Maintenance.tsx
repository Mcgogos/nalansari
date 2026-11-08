import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './Maintenance.module.css';

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Bilgilendirme | Nalan Sarı</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </Head>
      
      <div className={styles.maintenanceWrapper}>
        <main className={styles.card}>
          <div className={styles.brandLogo}>
            <Image
              src="/logo-mustard-ns.png"
              alt="NS Logo"
              width={32}
              height={32}
              priority
            />
          </div>

          <h1 className={styles.title}>BİLGİLENDİRME</h1>
          <div className={styles.divider}></div>
          <h2 className={styles.subtitle}>Web sitemiz şu anda geçici olarak hizmet dışıdır.</h2>
          
          <p className={styles.description}>
            Teknik ve operasyonel süreçler kapsamında web sitesi hizmetlerine geçici olarak ara verilmiştir.
          </p>

          <p className={styles.closing}>
            Anlayışınız için teşekkür ederiz.
          </p>
        </main>
      </div>
    </>
  );
}
