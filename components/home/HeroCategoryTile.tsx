import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { CATEGORIES } from '@/lib/theme';
import type { CategorySummary } from '@/data/categorySummary';

/**
 * Full-width bento hero for the top collection — photography does the talking,
 * a white contrast card (Dares inspo) floats over it with the essentials.
 */
export function HeroCategoryTile({ summary }: { summary: CategorySummary }) {
  const cat = CATEGORIES[summary.key];
  const [cover, second] = summary.previewImages;

  return (
    <Animated.View entering={FadeInUp.duration(420)}>
      <PressableScale
        onPress={() => router.push(`/category/${summary.key}`)}
        style={{ height: 210 }}
        className="overflow-hidden rounded-[26px] border border-border bg-card"
      >
        <View className="absolute inset-0 flex-row">
          <Image
            source={{ uri: cover }}
            style={{ flex: second ? 2 : 1, height: '100%' }}
            contentFit="cover"
            transition={200}
          />
          {second ? (
            <Image
              source={{ uri: second }}
              style={{ flex: 1, height: '100%', marginLeft: 2 }}
              contentFit="cover"
              transition={200}
            />
          ) : null}
        </View>

        <LinearGradient
          colors={['rgba(13,13,15,0.35)', 'rgba(13,13,15,0)', 'rgba(13,13,15,0.45)']}
          locations={[0, 0.45, 1]}
          style={{ position: 'absolute', inset: 0 }}
        />

        <View className="flex-1 justify-between p-3.5">
          <View className="flex-row items-start justify-between">
            <View
              className="h-9 w-9 items-center justify-center rounded-xl border border-white/15"
              style={{ backgroundColor: `${cat.accent}40` }}
            >
              <Ionicons name={cat.icon} size={16} color="#FFFFFF" />
            </View>
            <View className="rounded-full bg-white px-2.5 py-1">
              <Text className="text-[11px] font-bold text-[#0D0D0F]">{summary.count} saved</Text>
            </View>
          </View>

          <View className="max-w-[240px] self-start rounded-[18px] bg-white px-4 py-3">
            <Text className="text-[18px] font-extrabold tracking-tight text-[#0D0D0F]">
              {cat.label}
            </Text>
            <Text numberOfLines={1} className="text-[12px] font-semibold" style={{ color: cat.accent }}>
              {summary.highlight}
            </Text>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
}
