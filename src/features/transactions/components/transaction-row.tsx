import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/shared/theme';
import type { Transaction } from '../types/transaction.types';
import { formatTransactionShortDate } from '../utils/format-date';
import { getTransactionDirection } from '../utils/transaction-direction';
import { getCategoryVisual } from '../utils/category-icon';
import { resolveTransferLabel } from '../utils/resolve-transfer-label';
import { AmountText } from './amount-text';

interface TransactionRowProps {
  transaction: Transaction;
  onPress: (refId: string) => void;
}

function TransactionRowBase({ transaction, onPress }: TransactionRowProps) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const direction = getTransactionDirection(transaction.amount);
  const visual = getCategoryVisual(transaction.transferName, direction, theme.colors);
  const label = resolveTransferLabel(transaction.transferName, t);
  const shortDate = formatTransactionShortDate(transaction.transferDate, i18n.language);
  const IconComponent = visual.icon;

  const a11yLabel = `${label}, ${transaction.recipientName}, ${shortDate}`;

  return (
    <Pressable
      onPress={() => onPress(transaction.refId)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      hitSlop={4}
    >
      <View style={[styles.iconBadge, { backgroundColor: visual.bg }]}>
        <IconComponent size={18} color={visual.fg} strokeWidth={2} />
      </View>
      <View style={styles.info}>
        <Text
          style={[theme.typography.body, { color: theme.colors.textPrimary }]}
          numberOfLines={1}
        >
          {label}
        </Text>
        <Text
          style={[theme.typography.caption, { color: theme.colors.textSecondary }]}
          numberOfLines={1}
        >
          {transaction.recipientName} · {shortDate}
        </Text>
      </View>
      <AmountText amount={transaction.amount} variant="list" />
    </Pressable>
  );
}

export const TransactionRow = memo(TransactionRowBase, (prev, next) => {
  return (
    prev.transaction.refId === next.transaction.refId &&
    prev.transaction.amount === next.transaction.amount &&
    prev.transaction.transferDate === next.transaction.transferDate &&
    prev.onPress === next.onPress
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    minHeight: 44,
  },
  pressed: {
    opacity: 0.6,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
