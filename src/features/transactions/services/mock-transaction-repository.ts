import { MOCK_TRANSACTIONS } from '@/mocks/transactions.mock';
import type { TransactionRepository } from './transaction-repository';

let simulateError = false;
export function __setSimulateError(value: boolean): void {
  simulateError = value;
}

const LATENCY_MS = 600;

function delay<T>(value: T, ms = LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const mockTransactionRepository: TransactionRepository = {
  async getTransactions() {
    if (simulateError) {
      await delay(undefined, LATENCY_MS);
      throw new Error('Failed to load transactions');
    }
    return delay({ data: MOCK_TRANSACTIONS });
  },

  async getTransactionById(refId: string) {
    if (simulateError) {
      await delay(undefined, LATENCY_MS);
      throw new Error('Failed to load transaction detail');
    }
    const found = MOCK_TRANSACTIONS.find((t) => t.refId === refId) ?? null;
    return delay(found);
  },
};
