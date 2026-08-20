import { useColorScheme } from 'react-native';
import { usePreferencesStore } from '../store/preferences-store';
import { darkColors, lightColors, type ThemeColors } from './colors';
import { radius, spacing } from './spacing';
import { tabularNumsStyle, typography } from './typography';

export interface Theme {
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  tabularNums: typeof tabularNumsStyle;
  isDark: boolean;
}

export function useTheme(): Theme {
  const systemScheme = useColorScheme();
  const themePreference = usePreferencesStore((s) => s.theme);

  const isDark =
    themePreference === 'dark' || (themePreference === 'system' && systemScheme === 'dark');

  return {
    colors: isDark ? darkColors : lightColors,
    spacing,
    radius,
    typography,
    tabularNums: tabularNumsStyle,
    isDark,
  };
}

export { lightColors, darkColors } from './colors';
export { spacing, radius } from './spacing';
export { typography, tabularNumsStyle } from './typography';
