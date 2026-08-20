import { getTransactionDirection, type TransactionDirection } from './transaction-direction';

const MYR_FORMATTER = new Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
  currencyDisplay: 'symbol',
});

export interface FormattedAmount {
  formatted: string;
  sign: '+' | '-';
  direction: TransactionDirection;
}

export function formatTransactionAmount(amount: number): FormattedAmount {
  const direction = getTransactionDirection(amount);
  return {
    formatted: MYR_FORMATTER.format(Math.abs(amount)),
    sign: direction === 'credit' ? '+' : '-',
    direction,
  };
}
