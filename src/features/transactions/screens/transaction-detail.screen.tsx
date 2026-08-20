import {
  IconAlertTriangle,
  IconChevronLeft,
  IconCopy,
  IconMoodEmpty,
  IconShare2,
} from '@tabler/icons-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '@/shared/components/empty-state';
import { useTheme } from '@/shared/theme';
import { AmountText } from '../components/amount-text';
import { DetailInfoRow } from '../components/detail-info-row';
import { StatusBadge } from '../components/status-badge';
import { getCategoryVisual } from '../utils/category-icon';
import { getTransactionDirection } from '../utils/transaction-direction';
import type { TransactionDetailViewModel } from '../hooks/use-transaction-detail.hook';
import { useShareReceipt } from '../hooks/use-share-receipt.hook';

interface Props {
  vm: TransactionDetailViewModel;
}

export function TransactionDetailScreen({ vm }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { onShare, onCopyReferenceId } = useShareReceipt(vm);
  const [copiedPulse, setCopiedPulse] = useState(false);

  const handleCopy = async () => {
    await onCopyReferenceId();
    setCopiedPulse(true);
    setTimeout(() => setCopiedPulse(false), 1600);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.nav, { paddingTop: insets.top + 6 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('common.back')}
          hitSlop={8}
          style={[
            styles.navBtn,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <IconChevronLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
        </Pressable>
        <Text
          style={[theme.typography.body, styles.navTitle, { color: theme.colors.textPrimary }]}
          numberOfLines={1}
        >
          {t('detail.title')}
        </Text>
        <View style={styles.navBtn} />
      </View>

      {vm.status === 'loading' && (
        <View style={styles.centerFill}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      )}

      {vm.status === 'error' && (
        <EmptyState
          icon={IconAlertTriangle}
          title={t('error.title')}
          subtitle={t('error.subtitle')}
        />
      )}

      {vm.status === 'not-found' && (
        <EmptyState
          icon={IconMoodEmpty}
          title={t('detail.notFoundTitle')}
          subtitle={t('detail.notFoundSubtitle')}
        />
      )}

      {vm.status === 'success' && vm.transaction && (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <DetailHero vm={vm} />
            <View
              style={[
                styles.infoCard,
                { backgroundColor: theme.colors.surface, shadowColor: theme.colors.textPrimary },
              ]}
            >
              <DetailInfoRow
                label={t('detail.labelReferenceId')}
                value={vm.transaction.refId}
                monospace
                accessory={
                  <Pressable
                    onPress={handleCopy}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={t('a11y.copyReferenceId', { value: vm.transaction.refId })}
                  >
                    <IconCopy
                      size={15}
                      color={copiedPulse ? theme.colors.success : theme.colors.textSecondary}
                      strokeWidth={2}
                    />
                  </Pressable>
                }
              />
              <DetailInfoRow label={t('detail.labelDateTime')} value={vm.formattedDateTime} />
              <DetailInfoRow
                label={t('detail.labelRecipient')}
                value={vm.transaction.recipientName}
              />
              <DetailInfoRow label={t('detail.labelTransferType')} value={vm.transferLabel} />
              <DetailInfoRow
                label={t('detail.labelAmount')}
                value=""
                isLast
                accessory={<AmountText amount={vm.transaction.amount} variant="list" />}
              />
            </View>
            {copiedPulse && (
              <Text
                style={[
                  theme.typography.captionMedium,
                  styles.copiedHint,
                  { color: theme.colors.success },
                ]}
                accessibilityLiveRegion="polite"
              >
                {t('detail.toastCopied')}
              </Text>
            )}
          </ScrollView>

          <View style={[styles.actions, { paddingBottom: insets.bottom + 14 }]}>
            <Pressable
              onPress={onShare}
              accessibilityRole="button"
              accessibilityLabel={t('detail.btnShare')}
              style={[styles.shareBtn, { backgroundColor: theme.colors.primary }]}
            >
              <IconShare2 size={17} color={theme.colors.textOnAccent} strokeWidth={2.2} />
              <Text style={[theme.typography.button, { color: theme.colors.textOnAccent }]}>
                {t('detail.btnShare')}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

function DetailHero({ vm }: { vm: TransactionDetailViewModel }) {
  const theme = useTheme();
  const { t } = useTranslation();
  if (!vm.transaction) return null;
  const direction = getTransactionDirection(vm.transaction.amount);
  const visual = getCategoryVisual(vm.transaction.transferName, direction, theme.colors);
  const IconComponent = visual.icon;

  return (
    <View
      style={[
        styles.hero,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.textPrimary },
      ]}
    >
      <View style={[styles.heroIcon, { backgroundColor: visual.bg }]}>
        <IconComponent size={26} color={visual.fg} strokeWidth={2} />
      </View>
      <Text
        style={[theme.typography.body, styles.heroLabel, { color: theme.colors.textSecondary }]}
      >
        {vm.transferLabel}
      </Text>
      <AmountText amount={vm.transaction.amount} variant="xl" style={styles.heroAmount} />
      <StatusBadge label={t('detail.statusCompleted')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 6,
    gap: 8,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: { flex: 1, textAlign: 'center', fontWeight: '800' },
  centerFill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 24 },
  hero: {
    borderRadius: 24,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 14,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroLabel: { marginBottom: 6 },
  heroAmount: { marginBottom: 12 },
  infoCard: {
    borderRadius: 24,
    paddingHorizontal: 18,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  copiedHint: { textAlign: 'center', marginTop: 12 },
  actions: { paddingHorizontal: 20, paddingTop: 12 },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
    borderRadius: 16,
  },
});
