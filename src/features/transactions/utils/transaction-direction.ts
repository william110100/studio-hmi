export type TransactionDirection = 'credit' | 'debit';

export function getTransactionDirection(amount: number): TransactionDirection {
  return amount >= 0 ? 'credit' : 'debit';
}
