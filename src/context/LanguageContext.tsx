"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, Language, TranslationKey } from '../i18n/dictionaries';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ns_lang') as Language;
    if (stored && (stored === 'tr' || stored === 'en')) {
      setLanguage(stored); // eslint-disable-line react-hooks/set-state-in-effect
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('ns_lang', lang);
  };

  const t = (key: TranslationKey): string => {
    return (dictionaries[language] as Record<string, string>)[key] || key;
  };

  // Prevent hydration mismatch by not rendering anything that depends on language until mounted
  // However, returning children directly might cause mismatch if children render text immediately.
  // To be safe in Next.js app router client components, we just return children. 
  // We'll accept a small flash if user selected EN, but default is TR which matches server render.

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
