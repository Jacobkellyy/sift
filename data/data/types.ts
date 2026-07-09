import type { CategoryKey } from '@/lib/theme';

export type SourcePlatform = 'tiktok' | 'instagram' | 'reddit' | 'facebook';

interface SavedItemBase {
  id: string;
  category: CategoryKey;
  title: string;
  image: string;
  sourcePlatform: SourcePlatform;
  sourceHandle: string;
  savedAt: string; // ISO date
  done?: boolean;
}

export interface RecipeItem extends SavedItemBase {
  category: 'cooking';
  cookTimeMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  ingredients: string[];
}

export interface RestaurantItem extends SavedItemBase {
  category: 'eat';
  cuisine: string;
  distanceMiles: number;
  priceLevel: 1 | 2 | 3 | 4;
  rating: number;
  neighborhood: string;
  openNow: boolean;
}

export interface BarItem extends SavedItemBase {
  category: 'bars';
  vibe: string;
  distanceMiles: number;
  rating: number;
  neighborhood: string;
  openUntil: string;
}

export interface TravelItem extends SavedItemBase {
  category: 'travel';
  country: string;
  city: string;
  tag: string;
  bestSeason: string;
}

export interface WishlistItem extends SavedItemBase {
  category: 'wishlist';
  price: number;
  currency: string;
  shop: string;
  inStock: boolean;
}

export interface WatchItem extends SavedItemBase {
  category: 'watch';
  mediaType: 'Movie' | 'Series';
  runtimeMinutes: number;
  streaming: string[];
  rating: number;
}

export interface BeautyItem extends SavedItemBase {
  category: 'beauty';
  productType: string;
  price: number;
  shop: string;
}

export interface MemeItem extends SavedItemBase {
  category: 'memes';
  caption: string;
}

export interface MiscItem extends SavedItemBase {
  category: 'misc';
  note: string;
}

export type SavedItem =
  | RecipeItem
  | RestaurantItem
  | BarItem
  | TravelItem
  | WishlistItem
  | WatchItem
  | BeautyItem
  | MemeItem
  | MiscItem;
