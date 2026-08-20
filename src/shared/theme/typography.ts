import { Platform, type TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  largeTitle: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.3 },
  amountXL: { fontSize: 36, lineHeight: 42, fontWeight: '700', letterSpacing: -0.4 },
  amountList: { fontSize: 16, lineHeight: 20, fontWeight: '600' },
  sectionHeader: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  body: { fontSize: 15, lineHeight: 20, fontWeight: '500' },
  bodyRegular: { fontSize: 15, lineHeight: 20, fontWeight: '400' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  captionMedium: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
  button: { fontSize: 15, lineHeight: 20, fontWeight: '600' },
};

export const tabularNumsStyle: TextStyle = Platform.select({
  ios: { fontVariant: ['tabular-nums'] },
  default: { fontVariant: ['tabular-nums'] },
});
