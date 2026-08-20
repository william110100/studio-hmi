import * as Clipboard from 'expo-clipboard';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Share } from 'react-native';
import { formatTransactionAmount } from '../utils/format-currency';
import type { TransactionDetailViewModel } from './use-transaction-detail.hook';

export function useShareReceipt(detail: TransactionDetailViewModel) {
  const { t } = useTranslation();

  const onShare = useCallback(async () => {
    if (!detail.transaction) return;
    const { formatted, sign } = formatTransactionAmount(detail.transaction.amount);
    const lines = [
      `${t('common.appName')} — ${t('detail.title')}`,
      `${detail.transferLabel}: ${sign} ${formatted}`,
      `${t('detail.labelReferenceId')}: ${detail.transaction.refId}`,
      `${t('detail.labelDateTime')}: ${detail.formattedDateTime}`,
      `${t('detail.labelRecipient')}: ${detail.transaction.recipientName}`,
    ];
    try {
      await Share.share({ message: lines.join('\n') });
    } catch {}
  }, [detail, t]);

  const onCopyReferenceId = useCallback(async () => {
    if (!detail.transaction) return;
    await Clipboard.setStringAsync(detail.transaction.refId);
    AccessibilityInfo.announceForAccessibility(t('detail.toastCopied'));
  }, [detail.transaction, t]);

  return { onShare, onCopyReferenceId };
}
