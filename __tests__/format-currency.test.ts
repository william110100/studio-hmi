import { formatTransactionAmount } from '@/features/transactions/utils/format-currency';

const NBSP = '\u00A0';
const RM = (digits: string) => `RM${NBSP}${digits}`;

describe('formatTransactionAmount', () => {
  it('formats a positive amount as a credit with a "+" sign', () => {
    const result = formatTransactionAmount(1500);
    expect(result.direction).toBe('credit');
    expect(result.sign).toBe('+');
    expect(result.formatted).toBe(RM('1,500.00'));
  });

  it('formats a negative amount as a debit with a "\u2212" sign and unsigned magnitude', () => {
    const result = formatTransactionAmount(-500);
    expect(result.direction).toBe('debit');
    expect(result.sign).toBe('\u2212');
    expect(result.formatted).toBe(RM('500.00'));
  });

  it('formats zero as a credit (>= 0), matching getTransactionDirection', () => {
    const result = formatTransactionAmount(0);
    expect(result.direction).toBe('credit');
    expect(result.sign).toBe('+');
  });

  it('preserves cents and thousands separators from the exact assessment sample', () => {
    expect(formatTransactionAmount(2300.75).formatted).toBe(RM('2,300.75'));
  });
});
