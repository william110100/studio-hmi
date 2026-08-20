import { create } from 'zustand';
import { transactionRepository } from '../services';
import type { Transaction } from '../types/transaction.types';

export type TransactionStoreStatus = 'idle' | 'loading' | 'success' | 'error';

interface TransactionStore {
  transactions: Transaction[];
  status: TransactionStoreStatus;
  error: string | null;
  fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  status: 'idle',
  error: null,
  fetchTransactions: async () => {
    set({ status: 'loading', error: null });
    try {
      const response = await transactionRepository.getTransactions();
      set({ transactions: response.data, status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load transactions',
      });
    }
  },
}));
