import type { Transaction } from '../types/transaction.types';
import { formatTransactionMonthGroup, monthGroupKey } from './format-date';

export interface TransactionSection {
  key: string;
  title: string;
  data: Transaction[];
}

export function groupTransactionsByMonth(
  transactions: Transaction[],
  locale: string,
): TransactionSection[] {
  const sections: TransactionSection[] = [];
  const indexByKey = new Map<string, number>();

  for (const transaction of transactions) {
    const key = monthGroupKey(transaction.transferDate);
    const existingIndex = indexByKey.get(key);
    if (existingIndex === undefined) {
      indexByKey.set(key, sections.length);
      sections.push({
        key,
        title: formatTransactionMonthGroup(transaction.transferDate, locale),
        data: [transaction],
      });
    } else {
      sections[existingIndex].data.push(transaction);
    }
  }

  return sections;
}
