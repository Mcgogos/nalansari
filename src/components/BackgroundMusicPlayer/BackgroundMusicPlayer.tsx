'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './BackgroundMusicPlayer.module.css';

// Relaxing luxury spa & ambient lounge background track
const MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3';

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.30; // Soft luxury ambient volume
    audioRef.current = audio;

    // Attempt direct autoplay
    const attemptAutoplay = () => {
      if (!audioRef.current) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser until user interaction
      });
    };

    attemptAutoplay();

    // Fallback: Start audio automatically on the first click anywhere on the page
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <button 
      onClick={toggleMusic} 
      className={`${styles.tinyMusicBtn} ${isPlaying ? styles.playing : ''}`}
      aria-label={isPlaying ? "Müziği Kapat" : "Müziği Aç"}
      title={isPlaying ? "Müziği Kapat" : "Müziği Aç"}
    >
      {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
      {isPlaying && (
        <span className={styles.miniWave}>
          <span></span>
          <span></span>
        </span>
      )}
    </button>
  );
}
