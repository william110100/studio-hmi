import { resolveTransferLabel } from '@/features/transactions/utils/resolve-transfer-label';

const fakeT = ((key: string) => `translated(${key})`) as unknown as import('i18next').TFunction;

describe('resolveTransferLabel', () => {
  it.each([
    ['Salary Payment', 'item.salaryPayment'],
    ['Invoice Payment', 'item.invoicePayment'],
    ['Refund', 'item.refund'],
    ['Bonus Payment', 'item.bonusPayment'],
  ])('resolves known transferName %p to copy-deck key %p', (transferName, key) => {
    expect(resolveTransferLabel(transferName, fakeT)).toBe(`translated(${key})`);
  });

  it('falls back to the raw string for an unrecognized BE value instead of hiding/crashing', () => {
    expect(resolveTransferLabel('Card Cashback', fakeT)).toBe('Card Cashback');
  });
});
