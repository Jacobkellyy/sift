import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button } from '@/components/ui/Button';
import { PressableScale } from '@/components/ui/PressableScale';
import { useAppStore, type AuthProvider } from '@/store/useAppStore';

const ICON_SIZE = 19;

const CONTENT_PROVIDERS: { provider: AuthProvider; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { provider: 'tiktok', label: 'Continue with TikTok', icon: 'logo-tiktok' },
  { provider: 'instagram', label: 'Continue with Instagram', icon: 'logo-instagram' },
  { provider: 'facebook', label: 'Continue with Facebook', icon: 'logo-facebook' },
  { provider: 'reddit', label: 'Continue with Reddit', icon: 'logo-reddit' },
];

export default function OnboardingAuth() {
  const signIn = useAppStore((s) => s.signIn);

  const handleSignIn = (provider: AuthProvider) => {
    signIn(provider);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['top', 'bottom']}>
      <View className="flex-row items-center px-4 pt-2">
        <PressableScale
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={22} color="#B8BDC9" />
        </PressableScale>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerClassName="pb-8 gap-7"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(450)} className="gap-2 pt-2">
          <Text className="text-[28px] font-extrabold text-text-primary">Let's get set up</Text>
          <Text className="text-[15px] leading-[21px] text-text-secondary">
            Connect the apps you save from — Sift turns what's already there into organized
            collections. You can always add more later.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(450).delay(80)}>
          <Button
            label="Continue with Apple"
            icon={<Ionicons name="logo-apple" size={ICON_SIZE} color="#0D0D0F" />}
            onPress={() => handleSignIn('apple')}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(450).delay(120)} className="gap-3">
          <Text className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
            Your platforms
          </Text>
          <View className="gap-3">
            {CONTENT_PROVIDERS.map(({ provider, label, icon }) => (
              <Button
                key={provider}
                label={label}
                variant="social"
                icon={<Ionicons name={icon} size={ICON_SIZE} color="#FFFFFF" />}
                onPress={() => handleSignIn(provider)}
              />
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(450).delay(160)} className="gap-3">
          <Text className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
            Other ways
          </Text>
          <View className="gap-3">
            <Button
              label="Continue with Google"
              variant="social"
              icon={<Ionicons name="logo-google" size={ICON_SIZE} color="#FFFFFF" />}
              onPress={() => handleSignIn('google')}
            />
            <Button
              label="Continue with Email"
              variant="social"
              icon={<Ionicons name="mail-outline" size={ICON_SIZE} color="#FFFFFF" />}
              onPress={() => handleSignIn('email')}
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(450).delay(200)} className="items-center pt-2">
          <PressableScale onPress={() => handleSignIn('guest')} scaleTo={0.98}>
            <Text className="text-[14px] font-medium text-text-muted underline">
              Continue as guest
            </Text>
          </PressableScale>
        </Animated.View>

        <Text className="px-4 text-center text-[12px] leading-[17px] text-text-muted">
          By continuing you agree to Sift's Terms of Service and Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
