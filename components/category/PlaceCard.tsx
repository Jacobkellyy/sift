import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { Chip } from '@/components/ui/Chip';
import { SourceBadge } from '@/components/category/SourceBadge';
import { openInMaps } from '@/lib/maps';
import type { BarItem, RestaurantItem } from '@/data/types';
import { CATEGORIES } from '@/lib/theme';

const PRICE_SYMBOLS = ['$', '$$', '$$$', '$$$$'];

export function PlaceCard({
  item,
  index,
}: {
  item: RestaurantItem | BarItem;
  index: number;
}) {
  const isRestaurant = item.category === 'eat';
  const cat = CATEGORIES[item.category];
  const statusLabel = isRestaurant
    ? (item as RestaurantItem).openNow
      ? 'Open now'
      : 'Closed'
    : `Open until ${(item as BarItem).openUntil}`;
  const statusColor = isRestaurant && !(item as RestaurantItem).openNow ? '#8A909C' : '#5FC49A';

  return (
    <Animated.View entering={FadeInUp.duration(400).delay(index * 60)}>
      <PressableScale
        onPress={() => router.push(`/item/${item.id}`)}
        className="flex-row gap-3 overflow-hidden rounded-[22px] border border-border bg-card p-3"
      >
        <View style={{ width: 100, alignSelf: 'stretch', minHeight: 110 }} className="overflow-hidden rounded-2xl">
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={200} />
        </View>

        <View className="flex-1 justify-between py-0.5">
          <View className="gap-1">
            <View className="flex-row items-center justify-between">
              <Text numberOfLines={1} className="flex-1 pr-2 text-[16px] font-bold text-text-primary">
                {item.title}
              </Text>
              <View className="flex-row items-center gap-0.5">
                <Ionicons name="star" size={12} color="#E0A94E" />
                <Text className="text-[12px] font-semibold text-text-secondary">{item.rating}</Text>
              </View>
            </View>
            <Text numberOfLines={1} className="text-[12.5px] text-text-secondary">
              {isRestaurant ? (item as RestaurantItem).cuisine : (item as BarItem).vibe} ·{' '}
              {item.neighborhood}
            </Text>
          </View>

          <View className="flex-row flex-wrap items-center gap-1.5">
            <Chip icon="navigate-outline" label={`${item.distanceMiles} mi`} />
            <Chip icon="time-outline" label={statusLabel} tint={statusColor} tintLabel />
            {isRestaurant && (
              <Chip
                icon="pricetag-outline"
                label={PRICE_SYMBOLS[(item as RestaurantItem).priceLevel - 1]}
              />
            )}
          </View>

          <View className="flex-row items-center justify-between">
            <SourceBadge platform={item.sourcePlatform} handle={item.sourceHandle} />
            <PressableScale
              onPress={() => openInMaps(`${item.title} ${item.neighborhood}`)}
              scaleTo={0.9}
              className="h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: `${cat.accent}26` }}
            >
              <Ionicons name="navigate" size={13} color={cat.accent} />
            </PressableScale>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
}
