import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/shared/theme';

interface DetailInfoRowProps {
  label: string;
  value: string;
  monospace?: boolean;
  accessory?: ReactNode;
  isLast?: boolean;
}

export function DetailInfoRow({ label, value, monospace, accessory, isLast }: DetailInfoRowProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.row,
        !isLast && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text style={[theme.typography.captionMedium, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
      <View style={styles.valueRow}>
        <Text
          style={[
            theme.typography.body,
            theme.tabularNums,
            monospace && styles.mono,
            { color: theme.colors.textPrimary },
          ]}
        >
          {value}
        </Text>
        {accessory}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    minHeight: 44,
    gap: 12,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mono: {
    letterSpacing: 0.3,
  },
});
