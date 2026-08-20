import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { preferencesAsyncStorage } from '../lib/storage';
import type { SupportedLocale } from '../i18n/locales';

export type ThemePreference = 'system' | 'light' | 'dark';

interface PreferencesStore {
  locale: SupportedLocale | null;
  setLocale: (locale: SupportedLocale | null) => void;
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      locale: null,
      setLocale: (locale) => set({ locale }),
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'aeon-bank-preferences',
      storage: createJSONStorage(() => preferencesAsyncStorage),
    },
  ),
);
