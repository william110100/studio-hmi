import { IconCreditCard, IconHome, IconList, IconPlus, IconUser } from '@tabler/icons-react-native';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/shared/theme';

export default function TabsLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: { fontSize: 10.5, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('common.tabHome'),
          tabBarIcon: ({ color, size }) => <IconHome size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: t('common.tabTransactions'),
          tabBarIcon: ({ color, size }) => <IconList size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={[styles.fab, { backgroundColor: theme.colors.primary }]}>
              <IconPlus size={20} color={theme.colors.textOnAccent} strokeWidth={2.5} />
            </View>
          ),
          tabBarButton: ({ onPress, onLongPress, accessibilityState, style, children }) => (
            <Pressable
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityState={accessibilityState}
              accessibilityRole="button"
              accessibilityLabel={t('common.tabTransfer')}
              style={[style, styles.fabButton]}
            >
              {children}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: t('common.tabCards'),
          tabBarIcon: ({ color, size }) => (
            <IconCreditCard size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('common.tabProfile'),
          tabBarIcon: ({ color, size }) => <IconUser size={size} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  fabButton: { alignItems: 'center', justifyContent: 'center' },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
  },
});
