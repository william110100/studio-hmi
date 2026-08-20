import { getTransactionDirection } from '@/features/transactions/utils/transaction-direction';

describe('getTransactionDirection', () => {
  it.each([
    [1500, 'credit'],
    [0.01, 'credit'],
    [0, 'credit'],
    [-500, 'debit'],
    [-0.01, 'debit'],
  ])('amount %p -> %p', (amount, expected) => {
    expect(getTransactionDirection(amount as number)).toBe(expected);
  });
});
