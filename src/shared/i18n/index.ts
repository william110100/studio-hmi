import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LOCALE, isSupportedLocale } from './locales';
import en from './locales/en.json';
import id from './locales/id.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ms from './locales/ms.json';
import zh from './locales/zh.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  id: { translation: id },
  ja: { translation: ja },
  ms: { translation: ms },
  ko: { translation: ko },
};

function resolveInitialLanguage(storedOverride: string | null): string {
  if (storedOverride && isSupportedLocale(storedOverride)) {
    return storedOverride;
  }
  const deviceLanguageCode = Localization.getLocales()[0]?.languageCode ?? '';
  return isSupportedLocale(deviceLanguageCode) ? deviceLanguageCode : DEFAULT_LOCALE;
}

let initialized = false;

export function initI18n(storedOverride: string | null): typeof i18next {
  if (initialized) return i18next;
  initialized = true;

  // eslint-disable-next-line import/no-named-as-default-member
  i18next.use(initReactI18next).init({
    resources,
    lng: resolveInitialLanguage(storedOverride),
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  return i18next;
}

export default i18next;
