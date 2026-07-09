import { CATEGORY_ORDER, type CategoryKey } from '@/lib/theme';
import { itemsForCategory, relativeSavedLabel } from './mockData';
import type { SavedItem } from './types';

export interface CategorySummary {
  key: CategoryKey;
  count: number;
  previewImages: string[];
  highlight: string;
  items: SavedItem[];
}

function highlightFor(key: CategoryKey, items: SavedItem[]): string {
  if (items.length === 0) return 'Nothing saved yet';
  const latest = items[0];

  switch (key) {
    case 'bars':
    case 'eat': {
      const nearby = items.filter(
        (i) => 'distanceMiles' in i && (i as any).distanceMiles <= 2
      ).length;
      return nearby > 0 ? `${nearby} nearby` : relativeSavedLabel(latest.savedAt);
    }
    case 'travel': {
      const city = 'city' in latest ? (latest as any).city : latest.title;
      return `${city} added ${relativeSavedLabel(latest.savedAt).replace('Saved ', '')}`;
    }
    case 'wishlist': {
      const inStock = items.filter((i) => 'inStock' in i && (i as any).inStock).length;
      return `${inStock} in stock`;
    }
    default:
      return relativeSavedLabel(latest.savedAt);
  }
}

export function getCategorySummaries(): CategorySummary[] {
  return CATEGORY_ORDER.map((key) => {
    const items = itemsForCategory(key);
    return {
      key,
      count: items.length,
      previewImages: items.slice(0, 3).map((i) => i.image),
      highlight: highlightFor(key, items),
      items,
    };
  });
}

export function getWeekendPicks(): SavedItem[] {
  // Simple heuristic "second brain" surfacing: newest item from each of a
  // few high-intent categories, so opening the app always answers
  // "what should I do with my free time" without the user asking.
  const picks: SavedItem[] = [];
  (['eat', 'cooking', 'bars', 'watch'] as CategoryKey[]).forEach((key) => {
    const items = itemsForCategory(key);
    if (items[0]) picks.push(items[0]);
  });
  return picks;
}
