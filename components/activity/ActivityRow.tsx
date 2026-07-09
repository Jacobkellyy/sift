import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { CATEGORIES } from '@/lib/theme';
import type { SavedItem, SourcePlatform } from '@/data/types';

const PLATFORM_ICON: Record<SourcePlatform, keyof typeof Ionicons.glyphMap> = {
  tiktok: 'logo-tiktok',
  instagram: 'logo-instagram',
  facebook: 'logo-facebook',
  reddit: 'logo-reddit',
};

function timeLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export function ActivityRow({ item, index }: { item: SavedItem; index: number }) {
  const cat = CATEGORIES[item.category];

  return (
    <Animated.View entering={FadeInUp.duration(350).delay(Math.min(index, 8) * 40)}>
      <PressableScale
        onPress={() => router.push(`/item/${item.id}`)}
        className="flex-row items-center gap-3 rounded-2xl px-2 py-2.5"
      >
        <View style={{ width: 52, height: 52 }} className="overflow-hidden rounded-xl">
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        </View>

        <View className="flex-1 gap-1">
          <Text numberOfLines={1} className="text-[14.5px] font-semibold text-text-primary">
            {item.title}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Ionicons name={cat.icon} size={11} color={cat.accent} />
            <Text className="text-[12px] text-text-muted">{cat.shortLabel}</Text>
            <View className="h-0.5 w-0.5 rounded-full bg-text-muted" />
            <Ionicons name={PLATFORM_ICON[item.sourcePlatform]} size={11} color="#8A909C" />
            <Text className="text-[12px] text-text-muted">{item.sourceHandle}</Text>
          </View>
        </View>

        <Text className="text-[11.5px] text-text-muted">{timeLabel(item.savedAt)}</Text>
      </PressableScale>
    </Animated.View>
  );
}
