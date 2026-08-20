import { FlashList } from '@shopify/flash-list';
import { IconAlertTriangle, IconBell, IconInbox, IconSearch } from '@tabler/icons-react-native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '@/shared/components/empty-state';
import { Skeleton } from '@/shared/components/skeleton';
import { useTheme } from '@/shared/theme';
import type { TransactionListViewModel } from '../hooks/use-transaction-list.hook';
import type { Transaction } from '../types/transaction.types';
import { FilterChipGroup } from '../components/filter-chip-group';
import { TransactionRow } from '../components/transaction-row';
import { TransactionSectionHeader } from '../components/transaction-section-header';

interface Props {
  vm: TransactionListViewModel;
}

type FlatListItem =
  { kind: 'header'; key: string; title: string } | { kind: 'row'; key: string; refId: string };

export function TransactionListScreen({ vm }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const transactionsByRefId = useMemo(() => {
    const map = new Map<string, Transaction>();
    for (const section of vm.sections) {
      for (const transaction of section.data) map.set(transaction.refId, transaction);
    }
    return map;
  }, [vm.sections]);

  const { items, stickyHeaderIndices } = useMemo(() => {
    const flat: FlatListItem[] = [];
    const stickyIndices: number[] = [];
    for (const section of vm.sections) {
      stickyIndices.push(flat.length);
      flat.push({ kind: 'header', key: `header-${section.key}`, title: section.title });
      for (const transaction of section.data) {
        flat.push({ kind: 'row', key: transaction.refId, refId: transaction.refId });
      }
    }
    return { items: flat, stickyHeaderIndices: stickyIndices };
  }, [vm.sections]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <View style={styles.headerRow}>
          <Text style={[theme.typography.largeTitle, { color: theme.colors.textPrimary }]}>
            {t('list.title')}
          </Text>
          <View
            style={[
              styles.iconBtn,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <IconBell size={18} color={theme.colors.textPrimary} strokeWidth={2} />
          </View>
        </View>
        <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
          {vm.status === 'loading' ? t('list.loading') : t('list.subtitle')}
        </Text>
      </View>

      {vm.status !== 'error' && !vm.isEmpty && (
        <>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <IconSearch size={16} color={theme.colors.textSecondary} strokeWidth={2} />
            <TextInput
              value={vm.searchQuery}
              onChangeText={vm.setSearchQuery}
              placeholder={t('list.searchPlaceholder')}
              placeholderTextColor={theme.colors.textSecondary}
              style={[
                theme.typography.bodyRegular,
                styles.searchInput,
                { color: theme.colors.textPrimary },
              ]}
              accessibilityLabel={t('list.searchPlaceholder')}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </View>
          <View style={styles.filters}>
            <FilterChipGroup value={vm.filter} onChange={vm.setFilter} labels={vm.filterLabels} />
          </View>
        </>
      )}

      {vm.status === 'loading' && <ListSkeleton />}

      {vm.status === 'error' && (
        <EmptyState
          icon={IconAlertTriangle}
          title={t('error.title')}
          subtitle={vm.errorMessage ?? t('error.subtitle')}
          actionLabel={t('error.retry')}
          onAction={vm.onRetry}
        />
      )}

      {vm.status === 'success' && vm.isEmpty && (
        <EmptyState
          icon={IconInbox}
          title={t('list.emptyTitle')}
          subtitle={t('list.emptySubtitle')}
        />
      )}

      {vm.status === 'success' && !vm.isEmpty && vm.hasNoResults && (
        <EmptyState
          icon={IconSearch}
          title={t('list.noResultsTitle')}
          subtitle={t('list.noResultsSubtitle')}
        />
      )}

      {vm.status === 'success' && !vm.isEmpty && !vm.hasNoResults && (
        <FlashList
          data={items}
          keyExtractor={(item) => item.key}
          getItemType={(item) => item.kind}
          stickyHeaderIndices={stickyHeaderIndices}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 16 }}
          renderItem={({ item }) =>
            item.kind === 'header' ? (
              <TransactionSectionHeader title={item.title} />
            ) : (
              <TransactionRow
                transaction={transactionsByRefId.get(item.refId)!}
                onPress={vm.onSelectTransaction}
              />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={vm.isRefreshing}
              onRefresh={vm.onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
    </View>
  );
}

function ListSkeleton() {
  return (
    <View style={{ paddingHorizontal: 20, gap: 4 }} accessibilityElementsHidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} style={styles.skeletonRow}>
          <Skeleton width={40} height={40} radius={20} />
          <View style={{ flex: 1, gap: 8 }}>
            <Skeleton width="55%" height={11} />
            <Skeleton width="35%" height={11} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 10, gap: 2 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    marginHorizontal: 20,
    marginTop: 12,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  searchInput: { flex: 1, padding: 0 },
  filters: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 4 },
  skeletonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
});
