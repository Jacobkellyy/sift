import { Children, Fragment, type ReactNode, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { SettingsRow, ToggleRow } from '@/components/profile/SettingsRow';
import { Button } from '@/components/ui/Button';
import { useAppStore, type AuthProvider } from '@/store/useAppStore';
import { ALL_ITEMS } from '@/data/mockData';
import { TAB_BAR_CLEARANCE } from '@/lib/theme';

const PROVIDER_LABEL: Record<AuthProvider, string> = {
  apple: 'Apple ID',
  google: 'Google',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
  reddit: 'Reddit',
  email: 'Email',
  guest: 'Guest',
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  const rows = Children.toArray(children);
  return (
    <View className="gap-2">
      <Text className="px-1 text-[12px] font-semibold uppercase tracking-wider text-text-muted">
        {title}
      </Text>
      <View className="rounded-2xl border border-border bg-card px-3">
        {rows.map((row, index) => (
          <Fragment key={index}>
            {row}
            {index < rows.length - 1 && <View className="h-px bg-border" />}
          </Fragment>
        ))}
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const authProvider = useAppStore((s) => s.authProvider);
  const reduceMotion = useAppStore((s) => s.reduceMotion);
  const setReduceMotion = useAppStore((s) => s.setReduceMotion);
  const connectedPlatforms = useAppStore((s) => s.connectedPlatforms);
  const signOut = useAppStore((s) => s.signOut);
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);
  const [notifications, setNotifications] = useState(true);

  const handleSignOut = () => {
    signOut();
    resetOnboarding();
    router.replace('/onboarding');
  };

  const providerLabel = authProvider ? PROVIDER_LABEL[authProvider] : 'Guest';
  const connectedCount = Object.values(connectedPlatforms).filter(Boolean).length;

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE, paddingHorizontal: 20, gap: 20 }}
      >
        <Animated.View entering={FadeIn.duration(350)} className="flex-row items-center gap-4 pt-4">
          <View className="h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
            <Ionicons name="person" size={26} color="#B8BDC9" />
          </View>
          <View className="gap-1">
            <Text className="text-[20px] font-extrabold text-text-primary">Signed in</Text>
            <Text className="text-[13px] text-text-secondary">via {providerLabel}</Text>
          </View>
        </Animated.View>

        <LinearGradient colors={['#231F17', '#17181C']} className="gap-3 overflow-hidden rounded-3xl border border-border p-5">
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-category-wishlist/20">
              <Ionicons name="sparkles" size={20} color="#D4B24C" />
            </View>
            <View className="flex-1">
              <Text className="text-[15.5px] font-bold text-text-primary">Sift Pro</Text>
              <Text className="text-[12.5px] text-text-secondary">
                Unlimited imports, AI itineraries, grocery lists
              </Text>
            </View>
          </View>
          <Button label="Upgrade" variant="social" />
        </LinearGradient>

        <Section title="Account">
          <SettingsRow icon="link-outline" label="Connected accounts" subtitle={`${connectedCount} of 4 connected`} showChevron onPress={() => router.push('/import')} />
          <SettingsRow icon="cloud-download-outline" label="Import status" subtitle={`${ALL_ITEMS.length} items imported`} showChevron onPress={() => router.push('/import')} />
        </Section>

        <Section title="Preferences">
          <ToggleRow icon="moon-outline" label="Dark mode" subtitle="Sift is dark by design" value disabled />
          <ToggleRow icon="notifications-outline" label="Notifications" value={notifications} onValueChange={setNotifications} />
          <ToggleRow
            icon="pulse-outline"
            label="Reduce motion"
            subtitle="Calmer, simpler animations"
            value={reduceMotion}
            onValueChange={setReduceMotion}
          />
        </Section>

        <Section title="Privacy & Support">
          <SettingsRow icon="shield-checkmark-outline" label="Privacy" showChevron />
          <SettingsRow icon="help-circle-outline" label="Help & feedback" showChevron />
        </Section>

        <Button label="Sign out" variant="social" onPress={handleSignOut} />
      </ScrollView>
    </SafeAreaView>
  );
}
