import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { HeroArt } from '@/components/onboarding/HeroArt';
import { PressableScale } from '@/components/ui/PressableScale';

export default function OnboardingWelcome() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['top', 'bottom']}>
      <View className="flex-1 justify-between px-6 pb-6 pt-4">
        <Animated.View entering={FadeIn.duration(500)} className="items-center pt-8">
          <HeroArt />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(150)} className="gap-6">
          <View className="gap-3">
            <Text className="text-center text-[34px] font-extrabold leading-[40px] tracking-tight text-text-primary">
              Sift your saves into real life.
            </Text>
            <Text className="text-center text-[16px] leading-[22px] text-text-secondary">
              Stop losing recipes, places, products and ideas across social media.
            </Text>
          </View>

          <View className="gap-3">
            {/* Gradient ring borrows the category accents, so the brand's color
                story shows up exactly once on this screen — on the action. */}
            <LinearGradient
              colors={['#5FC4B8', '#9B8CE0', '#D98CA3']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ borderRadius: 999, padding: 1.5 }}
            >
              <PressableScale
                onPress={() => router.push('/onboarding/auth')}
                scaleTo={0.97}
                className="items-center rounded-full bg-bg-primary py-4"
              >
                <Text className="text-[16px] font-semibold text-white">Continue</Text>
              </PressableScale>
            </LinearGradient>
            <View className="flex-row justify-center gap-1.5 pt-1">
              <View className="h-1.5 w-5 rounded-full bg-white" />
              <View className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
