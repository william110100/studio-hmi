import { useTransactionList } from '@/features/transactions/hooks/use-transaction-list.hook';
import { TransactionListScreen } from '@/features/transactions/screens/transaction-list.screen';

export default function TransactionsTab() {
  const vm = useTransactionList();
  return <TransactionListScreen vm={vm} />;
}
