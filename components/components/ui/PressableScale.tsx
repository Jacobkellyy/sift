import { type ReactNode } from 'react';
import { Pressable, type PressableProps, type ViewStyle, type StyleProp } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { cssInterop } from 'nativewind';
import { isWeb } from '@/lib/platform';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
// PressableScale wraps Pressable in Animated.createAnimatedComponent, which hides it
// from NativeWind's compile-time JSX transform — cssInterop re-registers it so
// `className` still resolves to a style object at runtime, on native and web alike.
cssInterop(AnimatedPressable, { className: 'style' });

interface PressableScaleProps extends PressableProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  scaleTo?: number;
  haptic?: boolean;
}

/**
 * The single tactile primitive for the whole app — every card, tile and
 * button funnels through this so press feedback stays perfectly consistent
 * (spring curve + haptic) instead of each screen reinventing it slightly differently.
 */
export function PressableScale({
  children,
  style,
  scaleTo = 0.96,
  haptic = true,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[animatedStyle, style]}
      onPressIn={(e) => {
        scale.value = withSpring(scaleTo, { damping: 18, stiffness: 300 });
        if (haptic && !isWeb) Haptics.selectionAsync().catch(() => {});
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, { damping: 14, stiffness: 220 });
        onPressOut?.(e);
      }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
