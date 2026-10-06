"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navigation.module.css';

const navLinks: { labelKey: any; href: string }[] = [
  { labelKey: 'nav.services', href: '#pilates' },
  { labelKey: 'nav.schedule', href: '#schedule' },
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.trainers', href: '#trainers' },
];

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {/* 
            NS monogram – matches the original:
            N = solid black geometric letter
            S = solid mustard, overlapping into N
          */}
          <svg
            viewBox="0 0 130 100"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.nsLogo}
            aria-label="Nalan Sarı"
          >
            {/* ── N (black, geometric) ── */}
            {/* Left leg */}
            <rect x="4" y="8" width="16" height="84" fill="#0A0A0A" />
            {/* Diagonal stroke */}
            <polygon points="4,8 20,8 68,76 68,92 52,92" fill="#0A0A0A" />
            {/* Right leg */}
            <rect x="52" y="8" width="16" height="84" fill="#0A0A0A" />

            {/* ── S (mustard, overlapping N from ~x=52) ── */}
            {/*
              S is drawn as two arcs (top half + bottom half).
              We use a single path for the full S shape.
              x-origin shifted left to overlap the N's right leg.
            */}
            <path
              d="
                M 120,26
                C 120,14 110,8 97,8
                L 62,8
                C 49,8 42,14 42,24
                C 42,34 50,40 62,43
                L 97,50
                C 110,53 120,60 120,72
                C 120,84 110,92 97,92
                L 62,92
                C 49,92 42,86 42,74
                L 58,74
                C 58,78 62,80 66,80
                L 93,80
                C 98,80 104,77 104,72
                C 104,67 98,64 90,62
                L 55,55
                C 44,52 26,46 26,32
                C 26,18 38,8 55,8 
                L 97,8
                C 113,8 128,18 128,32
                Z
              "
              fill="#D4A72C"
            />
            {/* Bottom inner arc of S */}
            <path
              d="
                M 42,74
                C 42,84 50,92 62,92
                L 97,92
                C 111,92 126,84 126,72
                C 126,60 114,53 97,50
                L 62,43
                C 51,40 42,34 42,26
                L 58,26
                C 58,22 62,20 68,20
                L 93,20
                C 98,20 104,24 104,28
                L 120,28
                C 120,16 110,8 97,8
              "
              fill="#D4A72C"
            />
          </svg>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${styles.navLink}`}>
              {t(link.labelKey)}
            </Link>
          ))}
          <Link href="#planla" className={styles.ctaButton}>
            {t('nav.book')} <ArrowRight size={16} />
          </Link>
          
          <div className={styles.langToggle}>
            <button 
              className={`${styles.langBtn} ${language === 'tr' ? styles.active : ''}`}
              onClick={() => setLanguage('tr')}
            >TR</button>
            <span className={styles.langDivider}>|</span>
            <button 
              className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}
            >EN</button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div 
          className={`${styles.mobileMenuBtn} ${menuOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            {t(link.labelKey)}
          </Link>
        ))}
        <Link 
          href="#planla" 
          className={styles.ctaButton} 
          style={{ marginTop: '2rem' }}
          onClick={closeMenu}
        >
          {t('nav.book')} <ArrowRight size={16} />
        </Link>
        
        <div className={styles.langToggle}>
          <button 
            className={`${styles.langBtn} ${language === 'tr' ? styles.active : ''}`}
            onClick={() => { setLanguage('tr'); closeMenu(); }}
          >TR</button>
          <span className={styles.langDivider}>|</span>
          <button 
            className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
            onClick={() => { setLanguage('en'); closeMenu(); }}
          >EN</button>
        </div>
      </div>
    </nav>
  );
}
