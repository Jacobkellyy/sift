import { type ReactNode } from 'react';
import { View, Text, Switch } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PressableScale } from '@/components/ui/PressableScale';

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  right?: ReactNode;
  showChevron?: boolean;
}

export function SettingsRow({ icon, label, subtitle, onPress, right, showChevron }: SettingsRowProps) {
  return (
    <PressableScale
      onPress={onPress}
      disabled={!onPress}
      scaleTo={0.98}
      className="flex-row items-center gap-3 px-1 py-3"
    >
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-bg-elevated">
        <Ionicons name={icon} size={15} color="#B8BDC9" />
      </View>
      <View className="flex-1">
        <Text className="text-[14.5px] font-medium text-text-primary">{label}</Text>
        {subtitle ? <Text className="text-[12px] text-text-muted">{subtitle}</Text> : null}
      </View>
      {right}
      {showChevron && <Ionicons name="chevron-forward" size={16} color="#4A4E58" />}
    </PressableScale>
  );
}

export function ToggleRow({
  icon,
  label,
  subtitle,
  value,
  onValueChange,
  disabled,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  value: boolean;
  onValueChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <SettingsRow
      icon={icon}
      label={label}
      subtitle={subtitle}
      right={
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{ false: '#2A2C33', true: '#5FC49A' }}
          thumbColor="#FFFFFF"
        />
      }
    />
  );
}
