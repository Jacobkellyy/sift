import { View, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PressableScale } from '@/components/ui/PressableScale';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChangeText, autoFocus }: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2.5 rounded-full border border-border bg-card px-4 py-3">
      <Ionicons name="search" size={17} color="#8A909C" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search everything you've saved"
        placeholderTextColor="#8A909C"
        autoFocus={autoFocus}
        autoCorrect={false}
        className="flex-1 text-[15px] text-text-primary"
        style={{ paddingVertical: 0 }}
      />
      {value.length > 0 && (
        <PressableScale onPress={() => onChangeText('')} scaleTo={0.85} hitSlop={8}>
          <Ionicons name="close-circle" size={17} color="#8A909C" />
        </PressableScale>
      )}
    </View>
  );
}
