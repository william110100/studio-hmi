import {
  formatTransactionDateTime,
  formatTransactionMonthGroup,
  monthGroupKey,
} from '@/features/transactions/utils/format-date';

describe('format-date utils', () => {
  it('formats a UTC ISO date/time into an en-US medium date + short time', () => {
    const result = formatTransactionDateTime('2024-10-15T12:34:56Z', 'en-US');
    expect(result).toContain('2024');
    expect(result).toMatch(/Oct/);
  });

  it('groups by month+year, localized', () => {
    expect(formatTransactionMonthGroup('2024-10-15T12:34:56Z', 'en-US')).toBe('October 2024');
  });

  it('produces a stable, locale-independent sort/group key', () => {
    expect(monthGroupKey('2024-10-15T12:34:56Z')).toMatch(/^2024-10$/);
    expect(monthGroupKey('2024-08-30T11:47:22Z')).toBe('2024-08');
  });

  it('does not throw on every exact assessment sample date', () => {
    const samples = [
      '2024-10-15T12:34:56Z',
      '2024-09-21T09:12:45Z',
      '2024-10-05T16:18:30Z',
      '2024-08-30T11:47:22Z',
    ];
    for (const iso of samples) {
      expect(() => formatTransactionDateTime(iso, 'en-US')).not.toThrow();
      expect(() => monthGroupKey(iso)).not.toThrow();
    }
  });
});
