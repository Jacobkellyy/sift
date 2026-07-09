import { useEffect } from 'react';
import { View, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CATEGORIES } from '@/lib/theme';

function FloatingBadge({
  categoryKey,
  top,
  left,
  right,
  delay,
}: {
  categoryKey: keyof typeof CATEGORIES;
  top?: number;
  left?: number;
  right?: number;
  delay: number;
}) {
  const cat = CATEGORIES[categoryKey];
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[{ position: 'absolute', top, left, right }, style]}
      className="h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card/90"
    >
      <View
        className="h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${cat.accent}26` }}
      >
        <Ionicons name={cat.icon} size={18} color={cat.accent} />
      </View>
    </Animated.View>
  );
}

export function HeroArt() {
  return (
    <View className="h-[340px] w-full items-center justify-center">
      <View className="absolute h-[280px] w-[280px] items-center justify-center">
        <LinearGradient
          colors={['#5FC4B833', 'transparent']}
          className="absolute h-[280px] w-[280px] rounded-full"
        />
      </View>

      {/* Stacked "saved content" cards */}
      <View
        className="h-[220px] w-[160px] overflow-hidden rounded-3xl border border-border"
        style={{ transform: [{ rotate: '-8deg' }, { translateX: -46 }], position: 'absolute' }}
      >
        <Image
          source={{ uri: 'https://picsum.photos/seed/hero-card-1/320/440' }}
          className="h-full w-full opacity-70"
        />
      </View>
      <View
        className="h-[220px] w-[160px] overflow-hidden rounded-3xl border border-border"
        style={{ transform: [{ rotate: '7deg' }, { translateX: 46 }], position: 'absolute' }}
      >
        <Image
          source={{ uri: 'https://picsum.photos/seed/hero-card-2/320/440' }}
          className="h-full w-full opacity-70"
        />
      </View>
      <View
        className="h-[240px] w-[176px] overflow-hidden rounded-[28px] border border-borderStrong"
        style={{ position: 'absolute' }}
      >
        <Image
          source={{ uri: 'https://picsum.photos/seed/hero-card-main/360/480' }}
          className="h-full w-full"
        />
        <LinearGradient
          colors={['transparent', 'rgba(13,13,15,0.85)']}
          className="absolute bottom-0 h-24 w-full"
        />
        <BlurView
          intensity={40}
          tint="dark"
          className="absolute bottom-3 left-3 right-3 flex-row items-center justify-between overflow-hidden rounded-2xl px-3 py-2"
        >
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="restaurant-outline" size={14} color="#E0824E" />
          </View>
          <View className="h-6 w-6 items-center justify-center rounded-full bg-white/15">
            <Ionicons name="bookmark" size={12} color="#fff" />
          </View>
        </BlurView>
      </View>

      <FloatingBadge categoryKey="travel" top={6} left={4} delay={0} />
      <FloatingBadge categoryKey="cooking" top={18} right={0} delay={200} />
      <FloatingBadge categoryKey="watch" top={270} left={26} delay={400} />
    </View>
  );
}
