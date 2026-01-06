export const i18n = {
  defaultLocale: 'en',
  locales: ['uk', 'en', 'de', 'pl', 'it', 'es', 'ru'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
