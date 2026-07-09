import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/PressableScale';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return 'Still up?';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

interface GreetingHeaderProps {
  totalCount: number;
}

export function GreetingHeader({ totalCount }: GreetingHeaderProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      className="flex-row items-start justify-between px-5 pb-2 pt-2"
    >
      <View className="gap-1">
        <Text className="text-[26px] font-extrabold tracking-tight text-text-primary">
          {getGreeting()}
        </Text>
        <Text className="text-[14px] text-text-secondary">
          {totalCount} things saved and waiting for you
        </Text>
      </View>

      <PressableScale
        onPress={() => router.push('/profile')}
        className="h-11 w-11 items-center justify-center rounded-full border border-border bg-card"
      >
        <Ionicons name="person-circle-outline" size={22} color="#B8BDC9" />
      </PressableScale>
    </Animated.View>
  );
}
