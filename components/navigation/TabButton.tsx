import { forwardRef, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import { useAppStore } from '@/store/useAppStore';
import { isWeb } from '@/lib/platform';

const AnimatedView = Animated.View;

interface TabButtonProps extends TabTriggerSlotProps {
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  label: string;
  showBadge?: boolean;
}

export const TabButton = forwardRef<View, TabButtonProps>(function TabButton(
  { icon, activeIcon, label, showBadge, isFocused, onPress, ...rest },
  ref
) {
  const scale = useSharedValue(1);
  const pillOpacity = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    pillOpacity.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
  }, [isFocused]);

  const pillStyle = useAnimatedStyle(() => ({ opacity: pillOpacity.value }));
  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      ref={ref}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
      onPressIn={() => {
        scale.value = withSpring(0.88, { damping: 16, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 220 });
      }}
      onPress={(e) => {
        if (!isWeb) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress?.(e);
      }}
      className="flex-1 items-center justify-center py-3"
      {...rest}
    >
      <AnimatedView style={pressStyle} className="items-center justify-center gap-1">
        <View className="h-9 w-9 items-center justify-center">
          <AnimatedView
            style={[pillStyle, { position: 'absolute', inset: 0 }]}
            className="rounded-2xl bg-white/10"
          />
          <Ionicons name={isFocused ? activeIcon : icon} size={21} color={isFocused ? '#FFFFFF' : '#8A909C'} />
          {showBadge && (
            <View className="absolute right-1 top-1 h-2 w-2 rounded-full bg-category-travel" />
          )}
        </View>
        <Text className={`text-[10px] font-medium ${isFocused ? 'text-white' : 'text-text-muted'}`}>
          {label}
        </Text>
      </AnimatedView>
    </Pressable>
  );
});

export function ImportTabButton(props: Omit<TabButtonProps, 'showBadge'>) {
  const pendingImports = useAppStore((s) => s.pendingImportCount);
  return <TabButton {...props} showBadge={pendingImports > 0} />;
}
