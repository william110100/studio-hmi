import { IconCheck, IconChevronLeft } from '@tabler/icons-react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePreferencesStore } from '@/shared/store/preferences-store';
import { LOCALE_META, SUPPORTED_LOCALES, type SupportedLocale } from '@/shared/i18n/locales';
import { useTheme } from '@/shared/theme';

export default function LanguageScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setLocale = usePreferencesStore((s) => s.setLocale);

  const onSelect = (locale: SupportedLocale) => {
    setLocale(locale);
    i18n.changeLanguage(locale);
    router.back();
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.nav, { paddingTop: insets.top + 6 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('common.back')}
          hitSlop={8}
          style={styles.navBtn}
        >
          <IconChevronLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
        </Pressable>
        <Text style={[theme.typography.body, styles.navTitle, { color: theme.colors.textPrimary }]}>
          {t('language.title')}
        </Text>
        <View style={styles.navBtn} />
      </View>
      <Text
        style={[theme.typography.caption, styles.subtitle, { color: theme.colors.textSecondary }]}
      >
        {t('language.subtitle')}
      </Text>

      <FlatList
        data={SUPPORTED_LOCALES}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: insets.bottom + 16 }}
        renderItem={({ item, index }) => {
          const meta = LOCALE_META[item];
          const selected = i18n.language === item;
          const isLast = index === SUPPORTED_LOCALES.length - 1;
          return (
            <Pressable
              onPress={() => onSelect(item)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${meta.native}, ${meta.english}`}
              style={[
                styles.row,
                !isLast && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.rowText}>
                <Text style={[theme.typography.body, { color: theme.colors.textPrimary }]}>
                  {meta.native}
                </Text>
                <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
                  {meta.english}
                </Text>
              </View>
              {selected && (
                <View style={[styles.checkDot, { backgroundColor: theme.colors.primary }]}>
                  <IconCheck size={13} color={theme.colors.textOnAccent} strokeWidth={3} />
                </View>
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  nav: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 8 },
  navBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  navTitle: { flex: 1, textAlign: 'center', fontWeight: '800' },
  subtitle: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    minHeight: 44,
  },
  rowText: { gap: 2 },
  checkDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
