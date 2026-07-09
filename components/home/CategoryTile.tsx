import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { CATEGORIES } from '@/lib/theme';
import type { CategorySummary } from '@/data/categorySummary';

interface CategoryTileProps {
  summary: CategorySummary;
  size: number;
  index: number;
}

export function CategoryTile({ summary, size, index }: CategoryTileProps) {
  const cat = CATEGORIES[summary.key];
  const cover = summary.previewImages[0];

  return (
    <Animated.View entering={FadeInUp.duration(420).delay(index * 45)} style={{ width: size }}>
      <PressableScale
        onPress={() => router.push(`/category/${summary.key}`)}
        style={{ height: size * 1.22 }}
        className="overflow-hidden rounded-[22px] border border-border bg-card"
      >
        {cover ? (
          <Image
            source={{ uri: cover }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            contentFit="cover"
            transition={200}
          />
        ) : null}

        <LinearGradient
          colors={['rgba(13,13,15,0)', 'rgba(13,13,15,0.55)', 'rgba(13,13,15,0.92)']}
          locations={[0, 0.5, 1]}
          style={{ position: 'absolute', inset: 0 }}
        />

        <View className="flex-1 justify-between p-3">
          <View className="flex-row items-start justify-between">
            <View
              className="h-8 w-8 items-center justify-center rounded-xl border border-white/10"
              style={{ backgroundColor: `${cat.accent}33` }}
            >
              <Ionicons name={cat.icon} size={15} color={cat.accent} />
            </View>
            <View className="rounded-full bg-white px-2 py-0.5">
              <Text className="text-[10px] font-bold text-[#0D0D0F]">{summary.count}</Text>
            </View>
          </View>

          <View className="gap-0.5">
            <Text numberOfLines={1} className="text-[15px] font-bold text-white">
              {cat.shortLabel}
            </Text>
            <Text numberOfLines={1} className="text-[11px] font-medium" style={{ color: cat.accent }}>
              {summary.highlight}
            </Text>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
}
