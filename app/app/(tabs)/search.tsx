import { useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { SearchBar } from '@/components/search/SearchBar';
import { ActivityRow } from '@/components/activity/ActivityRow';
import { PressableScale } from '@/components/ui/PressableScale';
import { ALL_ITEMS } from '@/data/mockData';
import { CATEGORIES, CATEGORY_ORDER, TAB_BAR_CLEARANCE } from '@/lib/theme';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_ITEMS.filter((item) => {
      const cat = CATEGORIES[item.category];
      return (
        item.title.toLowerCase().includes(q) ||
        cat.label.toLowerCase().includes(q) ||
        item.sourceHandle.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['top']}>
      <View className="gap-3 px-5 pb-2 pt-2">
        <Text className="text-[26px] font-extrabold tracking-tight text-text-primary">Search</Text>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE, paddingHorizontal: 20 }}
      >
        {query.trim().length === 0 ? (
          <Animated.View entering={FadeIn.duration(300)} className="gap-3 pt-4">
            <Text className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
              Browse by collection
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {CATEGORY_ORDER.map((key) => {
                const cat = CATEGORIES[key];
                return (
                  <PressableScale
                    key={key}
                    onPress={() => router.push(`/category/${key}`)}
                    className="flex-row items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2.5"
                  >
                    <Ionicons name={cat.icon} size={14} color={cat.accent} />
                    <Text className="text-[13px] font-medium text-text-secondary">{cat.label}</Text>
                  </PressableScale>
                );
              })}
            </View>
          </Animated.View>
        ) : results.length === 0 ? (
          <View className="items-center pt-16">
            <Text className="text-[14px] text-text-muted">No results for "{query}"</Text>
          </View>
        ) : (
          <View className="pt-2">
            <Text className="pb-1 pt-3 text-[12px] font-semibold uppercase tracking-wider text-text-muted">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </Text>
            {results.map((item, index) => (
              <ActivityRow key={item.id} item={item} index={index} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
