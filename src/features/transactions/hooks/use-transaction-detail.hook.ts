import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { transactionRepository } from '../services';
import type { Transaction } from '../types/transaction.types';
import { formatTransactionDateTime } from '../utils/format-date';
import { resolveTransferLabel } from '../utils/resolve-transfer-label';

type DetailStatus = 'loading' | 'success' | 'error' | 'not-found';

export interface TransactionDetailViewModel {
  status: DetailStatus;
  transaction: Transaction | null;
  transferLabel: string;
  formattedDateTime: string;
}

export function useTransactionDetail(refId: string | undefined): TransactionDetailViewModel {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<DetailStatus>('loading');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    if (!refId) {
      setStatus('not-found');
      return;
    }
    setStatus('loading');
    try {
      const found = await transactionRepository.getTransactionById(refId);
      if (!mountedRef.current) return;
      if (found) {
        setTransaction(found);
        setStatus('success');
      } else {
        setStatus('not-found');
      }
    } catch {
      if (mountedRef.current) setStatus('error');
    }
  }, [refId]);

  useEffect(() => {
    mountedRef.current = true;
    Promise.resolve().then(load);
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return {
    status,
    transaction,
    transferLabel: transaction ? resolveTransferLabel(transaction.transferName, t) : '',
    formattedDateTime: transaction
      ? formatTransactionDateTime(transaction.transferDate, i18n.language)
      : '',
  };
}
