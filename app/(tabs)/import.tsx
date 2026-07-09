import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

import { PlatformRow } from '@/components/import/PlatformRow';
import { Button } from '@/components/ui/Button';
import { useAppStore, type ImportPlatform } from '@/store/useAppStore';
import { TAB_BAR_CLEARANCE } from '@/lib/theme';

const PLATFORMS: ImportPlatform[] = ['tiktok', 'instagram', 'facebook', 'reddit'];

const IMPORT_SOURCES = ['Saved posts', 'Liked posts', 'Collections', 'Bookmarks'];

const AI_STEPS = [
  { icon: 'restaurant-outline' as const, label: 'Detects recipes & extracts ingredients' },
  { icon: 'location-outline' as const, label: 'Recognizes restaurants and places' },
  { icon: 'film-outline' as const, label: 'Identifies movies and shows' },
  { icon: 'copy-outline' as const, label: 'Groups duplicate saves automatically' },
];

export default function ImportScreen() {
  const pendingImportCount = useAppStore((s) => s.pendingImportCount);
  const clearPendingImports = useAppStore((s) => s.clearPendingImports);

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['top']}>
      <Animated.View entering={FadeIn.duration(350)} className="gap-1 px-5 pb-2 pt-2">
        <Text className="text-[26px] font-extrabold tracking-tight text-text-primary">Import</Text>
        <Text className="text-[14px] text-text-secondary">
          Sift pulls your saves in automatically and sorts them for you
        </Text>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE, paddingHorizontal: 20, gap: 24 }}
      >
        <Animated.View entering={FadeInUp.duration(400).delay(60)} className="overflow-hidden rounded-3xl border border-border">
          <LinearGradient colors={['#1B2A28', '#17181C']} className="gap-4 p-5">
            {pendingImportCount > 0 ? (
              <>
                <View className="flex-row items-center gap-3">
                  <View className="h-11 w-11 items-center justify-center rounded-2xl bg-category-travel/20">
                    <Ionicons name="sparkles" size={20} color="#5FC4B8" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[16px] font-bold text-text-primary">
                      {pendingImportCount} new saves detected
                    </Text>
                    <Text className="text-[12.5px] text-text-secondary">
                      Ready to sort into your collections
                    </Text>
                  </View>
                </View>
                <Button label="Review & organize" onPress={clearPendingImports} />
              </>
            ) : (
              <View className="flex-row items-center gap-3">
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#5FC49A]/20">
                  <Ionicons name="checkmark-circle" size={22} color="#5FC49A" />
                </View>
                <View className="flex-1">
                  <Text className="text-[16px] font-bold text-text-primary">You're all caught up</Text>
                  <Text className="text-[12.5px] text-text-secondary">
                    Everything new has been sorted
                  </Text>
                </View>
              </View>
            )}
          </LinearGradient>
        </Animated.View>

        <View className="gap-3">
          <Text className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
            Connected accounts
          </Text>
          {PLATFORMS.map((platform, index) => (
            <PlatformRow key={platform} platform={platform} index={index} />
          ))}
        </View>

        <View className="gap-3">
          <Text className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
            What Sift imports
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {IMPORT_SOURCES.map((source) => (
              <View key={source} className="flex-row items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
                <Ionicons name="checkmark" size={12} color="#5FC49A" />
                <Text className="text-[12.5px] text-text-secondary">{source}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
            How AI sorts your saves
          </Text>
          <View className="gap-2 rounded-2xl border border-border bg-card p-2">
            {AI_STEPS.map((step, index) => (
              <View
                key={step.label}
                className={`flex-row items-center gap-3 p-2.5 ${index < AI_STEPS.length - 1 ? 'border-b border-border' : ''}`}
              >
                <Ionicons name={step.icon} size={16} color="#8A909C" />
                <Text className="flex-1 text-[13px] text-text-secondary">{step.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
