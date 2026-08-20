import {
  IconArrowBackUp,
  IconArrowDownLeft,
  IconArrowUpRight,
  IconFileInvoice,
  IconGift,
  type Icon,
} from '@tabler/icons-react-native';
import type { Theme } from '@/shared/theme';
import type { TransactionDirection } from './transaction-direction';

interface CategoryVisual {
  icon: Icon;
  bg: string;
  fg: string;
}

export function getCategoryVisual(
  transferName: string,
  direction: TransactionDirection,
  colors: Theme['colors'],
): CategoryVisual {
  switch (transferName) {
    case 'Salary Payment':
      return { icon: IconArrowDownLeft, bg: colors.categorySalaryBg, fg: colors.categorySalaryFg };
    case 'Invoice Payment':
      return { icon: IconFileInvoice, bg: colors.categoryInvoiceBg, fg: colors.categoryInvoiceFg };
    case 'Refund':
      return { icon: IconArrowBackUp, bg: colors.categoryRefundBg, fg: colors.categoryRefundFg };
    case 'Bonus Payment':
      return { icon: IconGift, bg: colors.categoryBonusBg, fg: colors.categoryBonusFg };
    default:
      return direction === 'credit'
        ? {
            icon: IconArrowDownLeft,
            bg: colors.categoryGenericInBg,
            fg: colors.categoryGenericInFg,
          }
        : {
            icon: IconArrowUpRight,
            bg: colors.categoryGenericOutBg,
            fg: colors.categoryGenericOutFg,
          };
  }
}
