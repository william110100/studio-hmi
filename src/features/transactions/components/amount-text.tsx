import { Text, type TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/theme';
import { formatTransactionAmount } from '../utils/format-currency';

interface AmountTextProps {
  amount: number;
  variant: 'list' | 'xl';
  style?: TextStyle;
}

export function AmountText({ amount, variant, style }: AmountTextProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formatted, sign, direction } = formatTransactionAmount(amount);
  const color = direction === 'credit' ? theme.colors.credit : theme.colors.debit;
  const textStyle = variant === 'xl' ? theme.typography.amountXL : theme.typography.amountList;

  const spokenSign = direction === 'credit' ? t('a11y.plus') : t('a11y.minus');
  const spokenDirection = direction === 'credit' ? t('a11y.credited') : t('a11y.debited');

  return (
    <Text
      style={[textStyle, theme.tabularNums, { color }, style]}
      accessibilityLabel={`${spokenSign} ${formatted}, ${spokenDirection}`}
    >
      {sign} {formatted}
    </Text>
  );
}
