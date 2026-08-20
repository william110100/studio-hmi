import { getCategoryVisual } from '@/features/transactions/utils/category-icon';
import { lightColors } from '@/shared/theme/colors';

describe('getCategoryVisual', () => {
  it.each([
    ['Salary Payment', lightColors.categorySalaryBg],
    ['Invoice Payment', lightColors.categoryInvoiceBg],
    ['Refund', lightColors.categoryRefundBg],
    ['Bonus Payment', lightColors.categoryBonusBg],
  ])(
    'maps known transferName %p to its docs/design-system.md §6 badge color',
    (name, expectedBg) => {
      const visual = getCategoryVisual(name, 'credit', lightColors);
      expect(visual.bg).toBe(expectedBg);
    },
  );

  it('Refund gets the success/green badge even though its amount is a debit', () => {
    const visual = getCategoryVisual('Refund', 'debit', lightColors);
    expect(visual.bg).toBe(lightColors.categoryRefundBg);
    expect(visual.fg).toBe(lightColors.categoryRefundFg);
  });

  it('falls back to a generic incoming/outgoing glyph for an unrecognized transferName', () => {
    const incoming = getCategoryVisual('Cashback Reward', 'credit', lightColors);
    expect(incoming.bg).toBe(lightColors.categoryGenericInBg);

    const outgoing = getCategoryVisual('ATM Withdrawal', 'debit', lightColors);
    expect(outgoing.bg).toBe(lightColors.categoryGenericOutBg);
  });
});
