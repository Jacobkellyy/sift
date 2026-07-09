import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import type { BeautyItem, MemeItem, MiscItem, WatchItem, WishlistItem } from '@/data/types';

type GenericItem = WishlistItem | WatchItem | BeautyItem | MemeItem | MiscItem;

function MetaRow({ item }: { item: GenericItem }) {
  switch (item.category) {
    case 'wishlist':
      return (
        <View className="flex-row items-center justify-between">
          <Text className="text-[14px] font-bold text-text-primary">${item.price}</Text>
          <Text
            className={`text-[11px] font-medium ${item.inStock ? 'text-[#5FC49A]' : 'text-text-muted'}`}
          >
            {item.inStock ? 'In stock' : 'Out of stock'}
          </Text>
        </View>
      );
    case 'watch':
      return (
        <View className="flex-row items-center justify-between">
          <Text className="text-[11.5px] text-text-secondary">
            {item.mediaType === 'Movie' ? `${item.runtimeMinutes}m` : 'Series'}
          </Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={11} color="#E0A94E" />
            <Text className="text-[11.5px] font-medium text-text-secondary">{item.rating}</Text>
          </View>
        </View>
      );
    case 'beauty':
      return (
        <View className="flex-row items-center justify-between">
          <Text className="text-[11.5px] text-text-secondary">{item.shop}</Text>
          <Text className="text-[13px] font-bold text-text-primary">${item.price}</Text>
        </View>
      );
    case 'memes':
      return <Text className="text-[11.5px] text-text-secondary">{item.caption}</Text>;
    case 'misc':
      return <Text className="text-[11.5px] text-text-secondary">{item.note}</Text>;
  }
}

export function SavedItemCard({ item, index, width }: { item: GenericItem; index: number; width: number }) {
  return (
    <Animated.View entering={FadeInUp.duration(400).delay(index * 50)} style={{ width }}>
      <PressableScale
        onPress={() => router.push(`/item/${item.id}`)}
        className="overflow-hidden rounded-[20px] border border-border bg-card"
      >
        <View style={{ width: '100%', height: width * 1.05 }}>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={200} />
        </View>
        <View className="gap-1.5 p-3">
          <Text numberOfLines={2} className="text-[13.5px] font-bold leading-[17px] text-text-primary">
            {item.title}
          </Text>
          <MetaRow item={item} />
        </View>
      </PressableScale>
    </Animated.View>
  );
}
