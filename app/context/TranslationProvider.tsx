'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n.config';

type Dictionary = {
  [key: string]: Record<string, string | string[]>;
};

// Оновлення типу: додано другий необов'язковий аргумент
interface TranslationContextType {
  t: (
    key: string,
    options?: Record<string, string | number>,
  ) => string | string[];
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({
  children,
  dictionary,
}: {
  children: ReactNode;
  dictionary: any;
}) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(
    (pathname.split('/')[1] as Locale) || 'uk',
  );

  useEffect(() => {
    const pathLocale = pathname.split('/')[1] as Locale;
    if (pathLocale && pathLocale !== locale) {
      setLocale(pathLocale);
    }
  }, [pathname, locale]);

  // Оновлення функції: додано параметр options та логіку інтерполяції
  const t = (
    key: string,
    options?: Record<string, string | number>,
  ): string | string[] => {
    const keys = key.split('.');
    let result: any = dictionary;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Ключ не знайдено — повертаємо сам ключ
      }
    }

    if (typeof result === 'string') {
      let interpolatedString = result;
      // Логіка для заміни заповнювачів
      if (options) {
        for (const [optionKey, value] of Object.entries(options)) {
          interpolatedString = interpolatedString.replace(
            `{${optionKey}}`,
            String(value),
          );
        }
      }
      return interpolatedString;
    } else if (Array.isArray(result)) {
      return result;
    }

    console.warn(`t(${key}) повертає об'єкт (не рядок):`, result);
    return key;
  };

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
