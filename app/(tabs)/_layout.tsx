import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';

import { TabButton, ImportTabButton } from '@/components/navigation/TabButton';
import { isWeb } from '@/lib/platform';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const barBottom = Math.max(insets.bottom, 12);

  return (
    <Tabs>
      <View className="flex-1 bg-bg-primary">
        <TabSlot />
      </View>

      {/* Visual-only blurred pill, absolutely positioned behind the real TabList.
          TabList must stay a direct child of Tabs for screen registration to work,
          so the frosted-glass chrome lives in this separate sibling instead of wrapping it. */}
      <BlurView
        intensity={isWeb ? 0 : 60}
        tint="dark"
        pointerEvents="none"
        className="absolute left-4 right-4 overflow-hidden rounded-[28px] border border-borderStrong"
        style={{
          bottom: barBottom,
          height: 64,
          backgroundColor: isWeb ? 'rgba(23,24,28,0.92)' : 'rgba(23,24,28,0.55)',
        }}
      />

      <TabList
        className="absolute left-4 right-4 flex-row"
        style={{ bottom: barBottom, height: 64 }}
      >
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon="home-outline" activeIcon="home" label="Home" />
        </TabTrigger>
        <TabTrigger name="activity" href="/activity" asChild>
          <TabButton icon="pulse-outline" activeIcon="pulse" label="Activity" />
        </TabTrigger>
        <TabTrigger name="import" href="/import" asChild>
          <ImportTabButton icon="cloud-download-outline" activeIcon="cloud-download" label="Import" />
        </TabTrigger>
        <TabTrigger name="search" href="/search" asChild>
          <TabButton icon="search-outline" activeIcon="search" label="Search" />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile" asChild>
          <TabButton icon="person-circle-outline" activeIcon="person-circle" label="Profile" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
