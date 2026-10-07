'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './BackgroundMusicPlayer.module.css';

// Relaxing luxury spa & ambient lounge background track
const MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3';

export default function BackgroundMusicPlayer() {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35; // Soft ambient volume
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio autoplay prevented by browser:', err);
      });
    }
  };

  return (
    <button 
      onClick={toggleMusic} 
      className={`${styles.musicBtn} ${isPlaying ? styles.active : ''}`}
      aria-label={isPlaying ? "Müziği Durdur" : "Müziği Başlat"}
      title={isPlaying ? "Müziği Durdur" : "Müziği Başlat"}
    >
      <div className={styles.iconWrap}>
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </div>

      <span className={styles.label}>
        {isPlaying 
          ? (language === 'tr' ? 'Müzik Çalıyor' : 'Music Playing')
          : (language === 'tr' ? 'Arka Plan Müziği' : 'Background Music')}
      </span>

      {/* Animated Equalizer Waveform */}
      {isPlaying && (
        <div className={styles.equalizer}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      )}
    </button>
  );
}
