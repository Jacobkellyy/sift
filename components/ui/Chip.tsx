import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ChipProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  /** Tint for the icon (and label when `tintLabel`) — category accents, status greens. */
  tint?: string;
  tintLabel?: boolean;
}

/**
 * Icon-chip metadata primitive (food-scanner inspo): every small stat —
 * distance, rating, price, cook time — renders through this so metadata
 * reads as a consistent scannable row instead of ad-hoc text lines.
 */
export function Chip({ label, icon, tint, tintLabel }: ChipProps) {
  return (
    <View className="flex-row items-center gap-1 rounded-full border border-border bg-bg-elevated px-2.5 py-1">
      {icon ? <Ionicons name={icon} size={11} color={tint ?? '#8A909C'} /> : null}
      <Text
        className="text-[11px] font-medium text-text-secondary"
        style={tintLabel && tint ? { color: tint } : undefined}
      >
        {label}
      </Text>
    </View>
  );
}
