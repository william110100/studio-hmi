import {
  __setSimulateError,
  mockTransactionRepository,
} from '@/features/transactions/services/mock-transaction-repository';
import { MOCK_TRANSACTIONS } from '@/mocks/transactions.mock';

describe('mockTransactionRepository', () => {
  afterEach(() => {
    __setSimulateError(false);
  });

  it('resolves the exact assessment sample payload from getTransactions', async () => {
    const response = await mockTransactionRepository.getTransactions();
    expect(response.data).toEqual(MOCK_TRANSACTIONS);
  });

  it('finds a transaction by refId', async () => {
    const found = await mockTransactionRepository.getTransactionById('789GHI');
    expect(found?.transferName).toBe('Refund');
    expect(found?.amount).toBe(-500.0);
  });

  it('returns null (never throws) for an unknown refId', async () => {
    const found = await mockTransactionRepository.getTransactionById('DOES-NOT-EXIST');
    expect(found).toBeNull();
  });

  it('throws on getTransactions when the error toggle is set', async () => {
    __setSimulateError(true);
    await expect(mockTransactionRepository.getTransactions()).rejects.toThrow();
  });

  it('throws on getTransactionById when the error toggle is set', async () => {
    __setSimulateError(true);
    await expect(mockTransactionRepository.getTransactionById('123ABC')).rejects.toThrow();
  });
});
