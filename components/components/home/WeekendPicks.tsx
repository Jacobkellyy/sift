import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { CATEGORIES } from '@/lib/theme';
import type { SavedItem } from '@/data/types';

interface WeekendPicksProps {
  items: SavedItem[];
}

export function WeekendPicks({ items }: WeekendPicksProps) {
  if (items.length === 0) return null;

  return (
    <View className="gap-3 pb-2 pt-4">
      <View className="px-5">
        <Text className="text-[18px] font-bold text-text-primary">Pick up where you left off</Text>
        <Text className="text-[13px] text-text-secondary">Fresh saves worth revisiting</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-5"
      >
        {items.map((item, index) => {
          const cat = CATEGORIES[item.category];
          return (
            <Animated.View key={item.id} entering={FadeInRight.duration(400).delay(index * 60)}>
              <PressableScale
                onPress={() => router.push(`/item/${item.id}`)}
                style={{ width: 148, height: 196 }}
                className="overflow-hidden rounded-[20px] border border-border bg-card"
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                  contentFit="cover"
                  transition={200}
                />
                <LinearGradient
                  colors={['rgba(13,13,15,0)', 'rgba(13,13,15,0.9)']}
                  locations={[0.35, 1]}
                  style={{ position: 'absolute', inset: 0 }}
                />
                <View className="flex-1 justify-between p-2.5">
                  <View
                    className="flex-row items-center gap-1 self-start rounded-full border border-white/10 px-2 py-1"
                    style={{ backgroundColor: `${cat.accent}40` }}
                  >
                    <Ionicons name={cat.icon} size={10} color="#fff" />
                    <Text className="text-[10px] font-semibold text-white">{cat.shortLabel}</Text>
                  </View>
                  <Text numberOfLines={2} className="text-[13px] font-bold leading-[16px] text-white">
                    {item.title}
                  </Text>
                </View>
              </PressableScale>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}
