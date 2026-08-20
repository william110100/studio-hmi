import { useLocalSearchParams } from 'expo-router';
import { useTransactionDetail } from '@/features/transactions/hooks/use-transaction-detail.hook';
import { TransactionDetailScreen } from '@/features/transactions/screens/transaction-detail.screen';

export default function TransactionDetailRoute() {
  const { refId } = useLocalSearchParams<{ refId: string }>();
  const vm = useTransactionDetail(refId);
  return <TransactionDetailScreen vm={vm} />;
}
