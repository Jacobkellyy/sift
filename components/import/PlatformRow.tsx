import { View, Text, Switch } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { useAppStore, type ImportPlatform } from '@/store/useAppStore';

const PLATFORM_META: Record<ImportPlatform, { label: string; icon: keyof typeof Ionicons.glyphMap }> = {
  tiktok: { label: 'TikTok', icon: 'logo-tiktok' },
  instagram: { label: 'Instagram', icon: 'logo-instagram' },
  facebook: { label: 'Facebook', icon: 'logo-facebook' },
  reddit: { label: 'Reddit', icon: 'logo-reddit' },
};

export function PlatformRow({ platform, index }: { platform: ImportPlatform; index: number }) {
  const connected = useAppStore((s) => s.connectedPlatforms[platform]);
  const toggleConnection = useAppStore((s) => s.toggleConnection);
  const meta = PLATFORM_META[platform];

  return (
    <Animated.View
      entering={FadeInUp.duration(350).delay(index * 60)}
      className="flex-row items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
    >
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-bg-elevated">
        <Ionicons name={meta.icon} size={18} color="#FFFFFF" />
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-[14.5px] font-semibold text-text-primary">{meta.label}</Text>
        <Text className="text-[12px] text-text-muted">
          {connected ? 'Connected · synced 2h ago' : 'Not connected'}
        </Text>
      </View>
      <Switch
        value={connected}
        onValueChange={() => toggleConnection(platform)}
        trackColor={{ false: '#2A2C33', true: '#5FC49A' }}
        thumbColor="#FFFFFF"
      />
    </Animated.View>
  );
}
