export const SUPPORTED_LOCALES = ['en', 'zh', 'id', 'ja', 'ms', 'ko'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const LOCALE_META: Record<SupportedLocale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  zh: { native: '中文（简体）', english: 'Mandarin (Simplified)' },
  id: { native: 'Bahasa Indonesia', english: 'Indonesian' },
  ja: { native: '日本語', english: 'Japanese' },
  ms: { native: 'Bahasa Melayu', english: 'Malay' },
  ko: { native: '한국어', english: 'Korean' },
};

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
