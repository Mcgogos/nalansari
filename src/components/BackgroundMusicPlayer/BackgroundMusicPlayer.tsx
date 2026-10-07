'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';
import styles from './BackgroundMusicPlayer.module.css';

const BG_MUSIC_URL = '/kiasmos-looped.mp3';
const VOICEOVER_URL = '/voiceover-surum1.mp3';

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoiceoverActive, setIsVoiceoverActive] = useState(false);
  
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Initialize Kiasmos Background Music
    const bgAudio = new Audio(BG_MUSIC_URL);
    bgAudio.loop = true;
    bgAudio.volume = 0.18; // Soft background ambient level during voiceover
    bgAudioRef.current = bgAudio;

    // 2. Initialize SÜRÜM 1 Voiceover
    const voiceAudio = new Audio(VOICEOVER_URL);
    voiceAudio.volume = 0.95;
    voiceAudioRef.current = voiceAudio;

    // When voiceover ends, boost background music back to normal ambient volume
    voiceAudio.addEventListener('ended', () => {
      setIsVoiceoverActive(false);
      if (bgAudioRef.current) {
        bgAudioRef.current.volume = 0.32; // Swell back to full ambient volume
      }
    });

    // Attempt autoplay
    const startAll = () => {
      if (!bgAudioRef.current || !voiceAudioRef.current) return;
      
      // Start background music
      bgAudioRef.current.play().then(() => {
        setIsPlaying(true);
        // Start voiceover over background music
        voiceAudioRef.current?.play().then(() => {
          setIsVoiceoverActive(true);
        }).catch(() => {});
      }).catch(() => {
        // Autoplay policy waiting for user interaction
      });
    };

    startAll();

    // Fallback: Start both on first click/touch anywhere
    const handleFirstInteraction = () => {
      if (bgAudioRef.current && bgAudioRef.current.paused) {
        bgAudioRef.current.play().then(() => {
          setIsPlaying(true);
          voiceAudioRef.current?.play().then(() => {
            setIsVoiceoverActive(true);
          }).catch(() => {});
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
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
        voiceAudioRef.current = null;
      }
    };
  }, []);

  const toggleAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bgAudioRef.current) return;

    if (isPlaying) {
      bgAudioRef.current.pause();
      if (voiceAudioRef.current) voiceAudioRef.current.pause();
      setIsPlaying(false);
      setIsVoiceoverActive(false);
    } else {
      bgAudioRef.current.play().then(() => {
        setIsPlaying(true);
        if (voiceAudioRef.current && voiceAudioRef.current.currentTime < voiceAudioRef.current.duration) {
          voiceAudioRef.current.play().then(() => {
            setIsVoiceoverActive(true);
          }).catch(() => {});
        }
      }).catch(() => {});
    }
  };

  const replayVoiceover = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!voiceAudioRef.current) return;
    
    voiceAudioRef.current.currentTime = 0;
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.18; // Duck background music volume
      if (bgAudioRef.current.paused) {
        bgAudioRef.current.play();
        setIsPlaying(true);
      }
    }
    voiceAudioRef.current.play().then(() => {
      setIsVoiceoverActive(true);
      setIsPlaying(true);
    }).catch(() => {});
  };

  return (
    <div className={styles.playerWrapper}>
      {/* Main Toggle Button */}
      <button 
        onClick={toggleAll} 
        className={`${styles.tinyMusicBtn} ${isPlaying ? styles.playing : ''}`}
        aria-label={isPlaying ? "Sesi Kapat" : "Sesi Aç"}
        title={isPlaying ? "Sesi Kapat" : "Sesi Aç"}
      >
        {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
        {isPlaying && (
          <span className={styles.miniWave}>
            <span></span>
            <span></span>
          </span>
        )}
      </button>

      {/* Replay Voiceover Quick Button */}
      {isPlaying && (
        <button 
          onClick={replayVoiceover} 
          className={`${styles.voiceBtn} ${isVoiceoverActive ? styles.voiceActive : ''}`}
          title="Tanıtım Seslendirmesini Tekrar Dinle (SÜRÜM 1)"
        >
          <Mic size={12} />
          <span className={styles.voiceLabel}>
            {isVoiceoverActive ? "Seslendirme Çalıyor…" : "Seslendirme"}
          </span>
        </button>
      )}
    </div>
  );
}
