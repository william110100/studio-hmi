import { mockTransactionRepository } from './mock-transaction-repository';
import type { TransactionRepository } from './transaction-repository';

export const transactionRepository: TransactionRepository = mockTransactionRepository;

export type { TransactionRepository } from './transaction-repository';
export { __setSimulateError } from './mock-transaction-repository';
