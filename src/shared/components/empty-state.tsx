import type { Icon } from '@tabler/icons-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

interface EmptyStateProps {
  icon: Icon;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: IconComponent,
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrap} accessible accessibilityRole="text">
      <View style={[styles.iconWrap, { backgroundColor: theme.colors.primarySoft }]}>
        <IconComponent size={36} color={theme.colors.primary} strokeWidth={1.8} />
      </View>
      <Text style={[theme.typography.body, styles.title, { color: theme.colors.textPrimary }]}>
        {title}
      </Text>
      <Text
        style={[theme.typography.caption, styles.subtitle, { color: theme.colors.textSecondary }]}
      >
        {subtitle}
      </Text>
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={[styles.action, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={[theme.typography.button, { color: theme.colors.textOnAccent }]}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    marginTop: -40,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 19,
  },
  action: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: 44,
    minWidth: 120,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
