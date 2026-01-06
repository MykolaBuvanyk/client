import 'server-only';
import type { Locale } from '@/i18n.config';

const dictionaries = {
  uk: () => import('@/dictionaries/uk.json').then((module) => module.default),
  en: () => import('@/dictionaries/uk.json').then((module) => module.default),
  de: () => import('@/dictionaries/uk.json').then((module) => module.default),
  it: () => import('@/dictionaries/uk.json').then((module) => module.default),
  es: () => import('@/dictionaries/uk.json').then((module) => module.default),
  pl: () => import('@/dictionaries/uk.json').then((module) => module.default),
  ru: () => import('@/dictionaries/uk.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
