import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/shared/theme';

interface StatusBadgeProps {
  label: string;
}

export function StatusBadge({ label }: StatusBadgeProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <View
      style={[styles.pill, { backgroundColor: theme.colors.successSoft }]}
      accessible
      accessibilityLabel={t('a11y.statusLabel', { status: label })}
    >
      <View style={[styles.dot, { backgroundColor: theme.colors.success }]} />
      <Text style={[theme.typography.captionMedium, { color: theme.colors.success }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
