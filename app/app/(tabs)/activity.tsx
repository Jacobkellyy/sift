import { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ActivityRow } from '@/components/activity/ActivityRow';
import { ALL_ITEMS } from '@/data/mockData';
import { TAB_BAR_CLEARANCE } from '@/lib/theme';
import type { SavedItem } from '@/data/types';

function bucketLabel(iso: string): string {
  const now = new Date('2026-07-09T18:00:00');
  const d = new Date(iso);
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return 'This week';
  if (days < 30) return 'This month';
  return 'Earlier';
}

function groupByBucket(items: SavedItem[]) {
  const sorted = [...items].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  const groups: { label: string; items: SavedItem[] }[] = [];
  for (const item of sorted) {
    const label = bucketLabel(item.savedAt);
    const existing = groups.find((g) => g.label === label);
    if (existing) existing.items.push(item);
    else groups.push({ label, items: [item] });
  }
  return groups;
}

export default function ActivityScreen() {
  const groups = useMemo(() => groupByBucket(ALL_ITEMS), []);

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['top']}>
      <Animated.View entering={FadeIn.duration(350)} className="gap-1 px-5 pb-2 pt-2">
        <Text className="text-[26px] font-extrabold tracking-tight text-text-primary">Activity</Text>
        <Text className="text-[14px] text-text-secondary">Everything you've saved, in order</Text>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE, paddingHorizontal: 20 }}
      >
        {groups.map((group) => (
          <View key={group.label} className="pt-5">
            <Text className="pb-1 text-[12px] font-semibold uppercase tracking-wider text-text-muted">
              {group.label}
            </Text>
            {group.items.map((item, index) => (
              <ActivityRow key={item.id} item={item} index={index} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
