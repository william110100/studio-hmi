import type { Transaction, TransactionListResponse } from '../types/transaction.types';

export interface TransactionRepository {
  getTransactions(): Promise<TransactionListResponse>;

  getTransactionById(refId: string): Promise<Transaction | null>;
}
