import { Platform } from 'react-native';
import type { ComponentProps } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Sift design tokens.
 * Single source of truth for color, type, spacing and category identity —
 * mirrors the values in tailwind.config.js so JS-side code (icons, charts,
 * gradients, native driver animations) never drifts from the NativeWind classes.
 */

export const colors = {
  bg: {
    primary: '#0D0D0F',
    secondary: '#17181C',
    elevated: '#1B1C21',
  },
  card: '#202228',
  cardPressed: '#26282F',
  border: 'rgba(255,255,255,0.06)',
  borderStrong: 'rgba(255,255,255,0.12)',
  text: {
    primary: '#FFFFFF',
    secondary: '#B8BDC9',
    muted: '#8A909C',
  },
} as const;

export type CategoryKey =
  | 'eat'
  | 'bars'
  | 'cooking'
  | 'wishlist'
  | 'travel'
  | 'beauty'
  | 'watch'
  | 'memes'
  | 'misc';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

interface CategoryDef {
  key: CategoryKey;
  label: string;
  shortLabel: string;
  accent: string;
  icon: IoniconName;
  emoji: string;
}

export const CATEGORIES: Record<CategoryKey, CategoryDef> = {
  eat: {
    key: 'eat',
    label: 'Places to Eat',
    shortLabel: 'Eat',
    accent: '#E0824E',
    icon: 'restaurant-outline',
    emoji: '🍜',
  },
  bars: {
    key: 'bars',
    label: 'Bars & Nightlife',
    shortLabel: 'Bars',
    accent: '#4E9BE0',
    icon: 'wine-outline',
    emoji: '🍸',
  },
  cooking: {
    key: 'cooking',
    label: 'Cooking',
    shortLabel: 'Cooking',
    accent: '#E0A94E',
    icon: 'flame-outline',
    emoji: '🍳',
  },
  wishlist: {
    key: 'wishlist',
    label: 'Wishlist',
    shortLabel: 'Wishlist',
    accent: '#D4B24C',
    icon: 'bag-handle-outline',
    emoji: '🛍️',
  },
  travel: {
    key: 'travel',
    label: 'Travel',
    shortLabel: 'Travel',
    accent: '#5FC4B8',
    icon: 'airplane-outline',
    emoji: '✈️',
  },
  beauty: {
    key: 'beauty',
    label: 'Beauty',
    shortLabel: 'Beauty',
    accent: '#D98CA3',
    icon: 'sparkles-outline',
    emoji: '💄',
  },
  watch: {
    key: 'watch',
    label: 'Watch',
    shortLabel: 'Watch',
    accent: '#9B8CE0',
    icon: 'film-outline',
    emoji: '🎬',
  },
  memes: {
    key: 'memes',
    label: 'Memes',
    shortLabel: 'Memes',
    accent: '#D97B7B',
    icon: 'happy-outline',
    emoji: '😂',
  },
  misc: {
    key: 'misc',
    label: 'Misc',
    shortLabel: 'Misc',
    accent: '#9AA0AC',
    icon: 'apps-outline',
    emoji: '📌',
  },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  'cooking',
  'eat',
  'bars',
  'travel',
  'wishlist',
  'watch',
  'beauty',
  'memes',
  'misc',
];

export const fontFamily = Platform.select({
  ios: undefined, // SF Pro is the system default on iOS — no override needed
  android: 'Inter',
  default: 'Inter',
});

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

/** Clearance so scrollable content never sits under the floating tab bar. */
export const TAB_BAR_CLEARANCE = 110;

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.35,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
    android: { elevation: 6 },
    default: {},
  }),
  soft: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 2 },
    default: {},
  }),
};
