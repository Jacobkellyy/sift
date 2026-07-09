import { useMemo } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GreetingHeader } from '@/components/home/GreetingHeader';
import { WeekendPicks } from '@/components/home/WeekendPicks';
import { CategoryTile } from '@/components/home/CategoryTile';
import { HeroCategoryTile } from '@/components/home/HeroCategoryTile';
import { getCategorySummaries, getWeekendPicks } from '@/data/categorySummary';
import { ALL_ITEMS } from '@/data/mockData';
import { TAB_BAR_CLEARANCE } from '@/lib/theme';

const GRID_PADDING = 20;
const GRID_GAP = 12;
const COLUMNS = 3;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const tileSize = (width - GRID_PADDING * 2 - GRID_GAP * (COLUMNS - 1)) / COLUMNS;

  const summaries = useMemo(() => getCategorySummaries(), []);
  const weekendPicks = useMemo(() => getWeekendPicks(), []);

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE }}
      >
        <GreetingHeader totalCount={ALL_ITEMS.length} />
        <WeekendPicks items={weekendPicks} />

        <View className="px-5 pb-3 pt-5">
          <Text className="text-[18px] font-bold text-text-primary">Your collections</Text>
        </View>

        <View style={{ paddingHorizontal: GRID_PADDING }} className="pb-3">
          <HeroCategoryTile summary={summaries[0]} />
        </View>

        <View
          style={{ paddingHorizontal: GRID_PADDING, gap: GRID_GAP }}
          className="flex-row flex-wrap"
        >
          {summaries.slice(1).map((summary, index) => (
            <CategoryTile key={summary.key} summary={summary} size={tileSize} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
