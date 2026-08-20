import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/shared/theme';
import type { TransactionFilter } from '../hooks/use-transaction-list.hook';

interface FilterChipGroupProps {
  value: TransactionFilter;
  onChange: (value: TransactionFilter) => void;
  labels: Record<TransactionFilter, string>;
}

const FILTERS: TransactionFilter[] = ['all', 'incoming', 'outgoing'];

export function FilterChipGroup({ value, onChange, labels }: FilterChipGroupProps) {
  const theme = useTheme();

  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {FILTERS.map((filter) => {
        const active = filter === value;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={labels[filter]}
            style={[
              styles.chip,
              {
                backgroundColor: active ? theme.colors.textPrimary : theme.colors.surface,
                borderColor: active ? theme.colors.textPrimary : theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                theme.typography.captionMedium,
                { color: active ? theme.colors.textOnDark : theme.colors.textSecondary },
              ]}
            >
              {labels[filter]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    minHeight: 32,
    justifyContent: 'center',
  },
});
