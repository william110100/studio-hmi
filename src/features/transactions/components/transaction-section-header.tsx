import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@/shared/theme';

interface TransactionSectionHeaderProps {
  title: string;
}

export function TransactionSectionHeader({ title }: TransactionSectionHeaderProps) {
  const theme = useTheme();
  return (
    <Text
      style={[
        theme.typography.sectionHeader,
        styles.text,
        { color: theme.colors.textSecondary, backgroundColor: theme.colors.bg },
      ]}
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 14,
    paddingBottom: 8,
  },
});
