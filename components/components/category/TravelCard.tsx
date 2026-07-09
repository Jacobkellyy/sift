import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { SourceBadge } from '@/components/category/SourceBadge';
import { openInMaps } from '@/lib/maps';
import type { TravelItem } from '@/data/types';
import { CATEGORIES } from '@/lib/theme';

export function TravelCard({ item, index }: { item: TravelItem; index: number }) {
  const cat = CATEGORIES.travel;

  return (
    <Animated.View entering={FadeInUp.duration(420).delay(index * 70)}>
      <PressableScale
        onPress={() => router.push(`/item/${item.id}`)}
        className="overflow-hidden rounded-[26px] border border-border bg-card"
      >
        <View style={{ height: 210 }}>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={200} />
          <LinearGradient
            colors={['rgba(13,13,15,0)', 'rgba(13,13,15,0.9)']}
            locations={[0.4, 1]}
            style={{ position: 'absolute', inset: 0 }}
          />
          <View className="absolute inset-x-0 bottom-0 gap-1 p-4">
            <View
              className="flex-row items-center gap-1 self-start rounded-full border border-white/10 px-2.5 py-1"
              style={{ backgroundColor: `${cat.accent}40` }}
            >
              <Ionicons name="pricetag-outline" size={11} color="#fff" />
              <Text className="text-[11px] font-semibold text-white">{item.tag}</Text>
            </View>
            <Text className="text-[22px] font-extrabold text-white">{item.city}</Text>
            <Text className="text-[13px] font-medium text-white/70">{item.country}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="sunny-outline" size={13} color="#8A909C" />
            <Text className="text-[12.5px] text-text-secondary">Best {item.bestSeason}</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <SourceBadge platform={item.sourcePlatform} handle={item.sourceHandle} />
            <PressableScale
              onPress={() => openInMaps(`${item.city}, ${item.country}`)}
              scaleTo={0.9}
              className="h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: `${cat.accent}26` }}
            >
              <Ionicons name="globe-outline" size={13} color={cat.accent} />
            </PressableScale>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
}
