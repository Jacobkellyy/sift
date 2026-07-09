import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { SourcePlatform } from '@/data/types';

const PLATFORM_ICON: Record<SourcePlatform, keyof typeof Ionicons.glyphMap> = {
  tiktok: 'logo-tiktok',
  instagram: 'logo-instagram',
  facebook: 'logo-facebook',
  reddit: 'logo-reddit',
};

export function SourceBadge({ platform, handle }: { platform: SourcePlatform; handle: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <Ionicons name={PLATFORM_ICON[platform]} size={12} color="#8A909C" />
      <Text numberOfLines={1} className="max-w-[110px] text-[12px] text-text-muted">
        {handle}
      </Text>
    </View>
  );
}
