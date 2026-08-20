import { IconChevronRight, IconLanguage, IconUserCircle } from '@tabler/icons-react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LOCALE_META, type SupportedLocale } from '@/shared/i18n/locales';
import { useTheme } from '@/shared/theme';

export default function ProfileTab() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentLocaleMeta = LOCALE_META[i18n.language as SupportedLocale] ?? LOCALE_META.en;

  return (
    <View
      style={[styles.screen, { backgroundColor: theme.colors.bg, paddingTop: insets.top + 16 }]}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primarySoft }]}>
          <IconUserCircle size={40} color={theme.colors.primary} strokeWidth={1.6} />
        </View>
        <Text style={[theme.typography.largeTitle, { color: theme.colors.textPrimary }]}>
          {t('common.tabProfile')}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
      >
        <Pressable
          onPress={() => router.push('/language')}
          accessibilityRole="button"
          accessibilityLabel={`${t('language.title')}, ${currentLocaleMeta.native}`}
          style={styles.row}
        >
          <View style={[styles.rowIcon, { backgroundColor: theme.colors.primarySoft }]}>
            <IconLanguage size={18} color={theme.colors.primary} strokeWidth={2} />
          </View>
          <View style={styles.rowText}>
            <Text style={[theme.typography.body, { color: theme.colors.textPrimary }]}>
              {t('language.title')}
            </Text>
            <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
              {currentLocaleMeta.native}
            </Text>
          </View>
          <IconChevronRight size={18} color={theme.colors.textSecondary} strokeWidth={2} />
        </Pressable>
      </View>

      <Text
        style={[theme.typography.caption, styles.footnote, { color: theme.colors.textSecondary }]}
      >
        {t('common.comingSoonSubtitle')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  header: { alignItems: 'center', marginBottom: 28, gap: 12 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, minHeight: 44 },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, gap: 2 },
  footnote: { textAlign: 'center', marginTop: 20 },
});
