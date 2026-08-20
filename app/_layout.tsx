import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { initI18n } from '@/shared/i18n';
import { usePreferencesStore } from '@/shared/store/preferences-store';
import { useTheme } from '@/shared/theme';
import type i18nextType from 'i18next';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [i18nInstance, setI18nInstance] = useState<typeof i18nextType | null>(null);

  useEffect(() => {
    function boot() {
      const locale = usePreferencesStore.getState().locale;
      setI18nInstance(initI18n(locale));
    }
    if (usePreferencesStore.persist.hasHydrated()) {
      boot();
      return;
    }
    const unsubscribe = usePreferencesStore.persist.onFinishHydration(boot);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (i18nInstance) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [i18nInstance]);

  if (!i18nInstance) return null;

  return (
    <I18nextProvider i18n={i18nInstance}>
      <SafeAreaProvider>
        <ThemedNavigator />
      </SafeAreaProvider>
    </I18nextProvider>
  );
}

function ThemedNavigator() {
  const theme = useTheme();
  return (
    <>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="transaction/[refId]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="language" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
