import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactionStore } from '../store/transaction-store';
import type { Transaction } from '../types/transaction.types';
import { getTransactionDirection } from '../utils/transaction-direction';
import { groupTransactionsByMonth, type TransactionSection } from '../utils/group-by-month';

export type TransactionFilter = 'all' | 'incoming' | 'outgoing';

const SEARCH_DEBOUNCE_MS = 300;

export interface TransactionListViewModel {
  sections: TransactionSection[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  isEmpty: boolean;
  hasNoResults: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filter: TransactionFilter;
  setFilter: (value: TransactionFilter) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  onRetry: () => void;
  onSelectTransaction: (refId: string) => void;
  filterLabels: Record<TransactionFilter, string>;
}

export function useTransactionList(): TransactionListViewModel {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { transactions, status, error, fetchTransactions } = useTransactionStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filter, setFilter] = useState<TransactionFilter>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      fetchTransactions();
    }
  }, [status, fetchTransactions]);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedQuery(searchQuery.trim().toLowerCase()),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = useMemo(() => {
    return transactions
      .filter((transaction: Transaction) => {
        if (filter === 'all') return true;
        const direction = getTransactionDirection(transaction.amount);
        return filter === 'incoming' ? direction === 'credit' : direction === 'debit';
      })
      .filter((transaction: Transaction) => {
        if (!debouncedQuery) return true;
        return (
          transaction.transferName.toLowerCase().includes(debouncedQuery) ||
          transaction.recipientName.toLowerCase().includes(debouncedQuery) ||
          transaction.refId.toLowerCase().includes(debouncedQuery)
        );
      })
      .sort((a, b) => new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime());
  }, [transactions, filter, debouncedQuery]);

  const sections = useMemo(
    () => groupTransactionsByMonth(filtered, i18n.language),
    [filtered, i18n.language],
  );

  const onSelectTransaction = useCallback(
    (refId: string) => {
      router.push(`/transaction/${refId}`);
    },
    [router],
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchTransactions();
    setIsRefreshing(false);
  }, [fetchTransactions]);

  const onRetry = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    sections,
    status,
    errorMessage: error,
    isEmpty: status === 'success' && transactions.length === 0,
    hasNoResults: status === 'success' && transactions.length > 0 && filtered.length === 0,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    isRefreshing,
    onRefresh,
    onRetry,
    onSelectTransaction,
    filterLabels: {
      all: t('list.filterAll'),
      incoming: t('list.filterIncoming'),
      outgoing: t('list.filterOutgoing'),
    },
  };
}
