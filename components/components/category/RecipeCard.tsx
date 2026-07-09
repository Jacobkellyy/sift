import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { Chip } from '@/components/ui/Chip';
import { SourceBadge } from '@/components/category/SourceBadge';
import { relativeSavedLabel } from '@/data/mockData';
import type { RecipeItem } from '@/data/types';
import { CATEGORIES } from '@/lib/theme';

const DIFFICULTY_COLOR: Record<RecipeItem['difficulty'], string> = {
  Easy: '#5FC49A',
  Medium: '#E0A94E',
  Hard: '#E0705E',
};

export function RecipeCard({ item, index }: { item: RecipeItem; index: number }) {
  const cat = CATEGORIES.cooking;
  const previewIngredients = item.ingredients.slice(0, 3);
  const moreCount = item.ingredients.length - previewIngredients.length;

  return (
    <Animated.View entering={FadeInUp.duration(400).delay(index * 60)}>
      <PressableScale
        onPress={() => router.push(`/item/${item.id}`)}
        className="overflow-hidden rounded-[24px] border border-border bg-card"
      >
        <View style={{ height: 180 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={200}
          />
          <View className="absolute left-3 top-3 flex-row items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2.5 py-1.5">
            <Ionicons name="time-outline" size={12} color="#fff" />
            <Text className="text-[11px] font-semibold text-white">{item.cookTimeMinutes} min</Text>
          </View>
          <View
            className="absolute right-3 top-3 rounded-full border border-white/10 px-2.5 py-1.5"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          >
            <Text
              className="text-[11px] font-semibold"
              style={{ color: DIFFICULTY_COLOR[item.difficulty] }}
            >
              {item.difficulty}
            </Text>
          </View>
        </View>

        <View className="gap-3 p-4">
          <Text className="text-[17px] font-bold leading-[22px] text-text-primary">
            {item.title}
          </Text>

          <View className="flex-row flex-wrap gap-1.5">
            {previewIngredients.map((ing) => (
              <View key={ing} className="rounded-full bg-bg-elevated px-2.5 py-1">
                <Text className="text-[11px] font-medium text-text-secondary">{ing}</Text>
              </View>
            ))}
            {moreCount > 0 && (
              <View className="rounded-full bg-bg-elevated px-2.5 py-1">
                <Text className="text-[11px] font-medium text-text-muted">+{moreCount} more</Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center justify-between pt-1">
            <Chip icon="people-outline" label={`Serves ${item.servings}`} />
            <SourceBadge platform={item.sourcePlatform} handle={item.sourceHandle} />
          </View>
          <Text className="text-[11px] text-text-muted">{relativeSavedLabel(item.savedAt)}</Text>
        </View>
      </PressableScale>
    </Animated.View>
  );
}
