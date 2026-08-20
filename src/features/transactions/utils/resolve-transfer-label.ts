import type { TFunction } from 'i18next';

const KNOWN_TRANSFER_NAME_KEYS: Record<string, string> = {
  'Salary Payment': 'item.salaryPayment',
  'Invoice Payment': 'item.invoicePayment',
  Refund: 'item.refund',
  'Bonus Payment': 'item.bonusPayment',
};

export function resolveTransferLabel(transferName: string, t: TFunction): string {
  const key = KNOWN_TRANSFER_NAME_KEYS[transferName];
  return key ? t(key) : transferName;
}
