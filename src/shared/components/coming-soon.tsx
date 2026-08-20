import type { Icon } from '@tabler/icons-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { EmptyState } from './empty-state';

interface ComingSoonProps {
  icon: Icon;
}

export function ComingSoon({ icon }: ComingSoonProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.bg, paddingTop: insets.top }]}>
      <EmptyState
        icon={icon}
        title={t('common.comingSoonTitle')}
        subtitle={t('common.comingSoonSubtitle')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
