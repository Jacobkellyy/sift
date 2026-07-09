import { type ReactNode } from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableScale } from './PressableScale';

type Variant = 'primary' | 'social' | 'ghost';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-white',
  social: 'bg-card border border-border',
  ghost: 'bg-transparent',
};

const labelClasses: Record<Variant, string> = {
  primary: 'text-[#0D0D0F]',
  social: 'text-white',
  ghost: 'text-text-secondary',
};

export function Button({ label, onPress, variant = 'primary', icon, style, disabled }: ButtonProps) {
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      scaleTo={0.97}
      style={style}
      className={`flex-row items-center justify-center rounded-full py-4 px-6 ${variantClasses[variant]} ${disabled ? 'opacity-40' : ''}`}
    >
      {icon ? <View className="mr-2.5">{icon}</View> : null}
      <Text className={`text-[16px] font-semibold ${labelClasses[variant]}`}>{label}</Text>
    </PressableScale>
  );
}
