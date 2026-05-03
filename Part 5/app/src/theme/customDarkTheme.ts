import { webDarkTheme, createDarkTheme, type BrandVariants } from '@fluentui/react-components';

const brandRamp: BrandVariants = {
  10: '#020408',
  20: '#091323',
  30: '#0d2040',
  40: '#102d5e',
  50: '#133b7c',
  60: '#164a9b',
  70: '#1959bb',
  80: '#2a6fd4',
  90: '#4F8CFF',
  100: '#6da3ff',
  110: '#8ab9ff',
  120: '#a5ccff',
  130: '#bcdcff',
  140: '#d1eaff',
  150: '#e4f3ff',
  160: '#f3f9ff',
};

const generatedTheme = createDarkTheme(brandRamp);

export const customDarkTheme = {
  ...webDarkTheme,
  ...generatedTheme,
  colorNeutralBackground1: '#0d0f14',
  colorNeutralBackground2: '#111318',
  colorNeutralBackground3: '#161920',
  colorNeutralBackground4: '#1c1f28',
  colorNeutralBackground5: '#222633',
  colorNeutralBackground6: '#282d3d',
  colorBrandBackground: '#4F8CFF',
  colorBrandBackgroundHover: '#6da3ff',
  colorBrandBackgroundPressed: '#2a6fd4',
};
