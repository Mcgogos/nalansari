import React from 'react';
import styles from './Maintenance.module.css';

export default function Maintenance() {
  return (
    <div className={styles.maintenanceWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/maintenance.png"
        alt="Hizmete geçici olarak ara verilmiştir. Muse Creative House - Web Hizmeti Bilgilendirmesi"
        className={styles.image}
      />
    </div>
  );
}
