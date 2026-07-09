import { cssInterop } from 'nativewind';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Image as ExpoImage } from 'expo-image';
import Animated from 'react-native-reanimated';

/**
 * Third-party components aren't covered by NativeWind's compile-time JSX
 * transform (that only patches core react-native primitives), so any
 * component we use `className` on outside of View/Text/Image/ScrollView/
 * Pressable needs an explicit runtime mapping registered here, once,
 * at app startup.
 */
cssInterop(BlurView, { className: 'style' });
cssInterop(LinearGradient, { className: 'style' });
cssInterop(ExpoImage, { className: 'style' });
cssInterop(Animated.View, { className: 'style' });
cssInterop(Animated.Text, { className: 'style' });
cssInterop(Animated.ScrollView, { className: 'style' });
