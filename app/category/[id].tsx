import { useMemo } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { CategoryHeader } from '@/components/category/CategoryHeader';
import { RecipeCard } from '@/components/category/RecipeCard';
import { PlaceCard } from '@/components/category/PlaceCard';
import { TravelCard } from '@/components/category/TravelCard';
import { SavedItemCard } from '@/components/category/SavedItemCard';
import { itemsForCategory } from '@/data/mockData';
import { TAB_BAR_CLEARANCE, type CategoryKey } from '@/lib/theme';
import type {
  BarItem,
  BeautyItem,
  MemeItem,
  MiscItem,
  RecipeItem,
  RestaurantItem,
  TravelItem,
  WatchItem,
  WishlistItem,
} from '@/data/types';

const GRID_PADDING = 20;
const GRID_GAP = 14;

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryKey = id as CategoryKey;
  const items = useMemo(() => itemsForCategory(categoryKey), [categoryKey]);
  const { width } = useWindowDimensions();

  const gridTileWidth = (width - GRID_PADDING * 2 - GRID_GAP) / 2;

  return (
    <View className="flex-1 bg-bg-primary">
      <CategoryHeader categoryKey={categoryKey} count={items.length} />

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <Text className="text-center text-[14px] text-text-muted">
            Nothing saved here yet. Import from your apps to fill this collection.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE, paddingTop: 4 }}
        >
          {categoryKey === 'cooking' && (
            <View className="gap-4 px-5">
              {(items as RecipeItem[]).map((item, index) => (
                <RecipeCard key={item.id} item={item} index={index} />
              ))}
            </View>
          )}

          {(categoryKey === 'eat' || categoryKey === 'bars') && (
            <View className="gap-3 px-5">
              {(items as (RestaurantItem | BarItem)[]).map((item, index) => (
                <PlaceCard key={item.id} item={item} index={index} />
              ))}
            </View>
          )}

          {categoryKey === 'travel' && (
            <View className="gap-4 px-5">
              {(items as TravelItem[]).map((item, index) => (
                <TravelCard key={item.id} item={item} index={index} />
              ))}
            </View>
          )}

          {(categoryKey === 'wishlist' ||
            categoryKey === 'watch' ||
            categoryKey === 'beauty' ||
            categoryKey === 'memes' ||
            categoryKey === 'misc') && (
            <View style={{ paddingHorizontal: GRID_PADDING, gap: GRID_GAP }} className="flex-row flex-wrap">
              {(items as (WishlistItem | WatchItem | BeautyItem | MemeItem | MiscItem)[]).map(
                (item, index) => (
                  <SavedItemCard key={item.id} item={item} index={index} width={gridTileWidth} />
                )
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
