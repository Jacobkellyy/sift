import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';
import { CATEGORIES, type CategoryKey } from '@/lib/theme';

interface CategoryHeaderProps {
  categoryKey: CategoryKey;
  count: number;
}

export function CategoryHeader({ categoryKey, count }: CategoryHeaderProps) {
  const cat = CATEGORIES[categoryKey];

  return (
    <SafeAreaView edges={['top']} className="bg-bg-primary">
      {/* Ambient color bleed from the category accent, so each collection
          feels tinted by its own identity without flooding the UI. */}
      <LinearGradient
        colors={[`${cat.accent}2E`, `${cat.accent}12`, 'rgba(13,13,15,0)']}
        locations={[0, 0.5, 1]}
        pointerEvents="none"
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 240 }}
      />
      <View className="flex-row items-center justify-between px-4 pb-2 pt-2">
        <PressableScale
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={22} color="#B8BDC9" />
        </PressableScale>
        <PressableScale
          className="h-10 w-10 items-center justify-center rounded-full"
          hitSlop={8}
        >
          <Ionicons name="ellipsis-horizontal" size={20} color="#B8BDC9" />
        </PressableScale>
      </View>

      <Animated.View entering={FadeIn.duration(350)} className="gap-2 px-5 pb-4 pt-1">
        <View
          className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10"
          style={{ backgroundColor: `${cat.accent}26` }}
        >
          <Ionicons name={cat.icon} size={20} color={cat.accent} />
        </View>
        <Text className="text-[28px] font-extrabold tracking-tight text-text-primary">
          {cat.label}
        </Text>
        <Text className="text-[14px] text-text-secondary">
          {count} {count === 1 ? 'item' : 'items'} saved
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}
