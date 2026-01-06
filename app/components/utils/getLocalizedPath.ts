import { Locale } from '@/i18n.config';

export function getLocalizedPath(path: string, lang: Locale): string {
  // Видаляємо можливий префікс мови з початку шляху,
  // щоб уникнути дублювання, наприклад, /ru/ru/blog.
  let cleanedPath =
    path.startsWith('/uk') ||
    path.startsWith('/en') ||
    path.startsWith('/de') ||
    path.startsWith('/it') ||
    path.startsWith('/es') ||
    path.startsWith('/pl') ||
    path.startsWith('/ru')
      ? path.substring(3)
      : path;

  // Видаляємо скісну риску на початку, якщо вона є,
  // для коректного з'єднання.
  if (cleanedPath.startsWith('/')) {
    cleanedPath = cleanedPath.substring(1);
  }

  // Якщо поточна мова — українська, повертаємо шлях без префікса.
  if (lang === 'en') {
    return `/${cleanedPath}`;
  }

  // Для інших мов, додаємо префікс.
  return `/${lang}/${cleanedPath}`;
}
