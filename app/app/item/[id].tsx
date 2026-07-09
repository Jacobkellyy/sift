import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { PressableScale } from '@/components/ui/PressableScale';
import { Button } from '@/components/ui/Button';
import { SourceBadge } from '@/components/category/SourceBadge';
import { findItemById, relativeSavedLabel } from '@/data/mockData';
import { openInMaps } from '@/lib/maps';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/lib/theme';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = findItemById(id);
  const completedItemIds = useAppStore((s) => s.completedItemIds);
  const toggleItemDone = useAppStore((s) => s.toggleItemDone);

  if (!item) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bg-primary">
        <Text className="text-text-muted">Item not found.</Text>
      </SafeAreaView>
    );
  }

  const cat = CATEGORIES[item.category];
  const isDone = completedItemIds.includes(item.id);
  const doneLabel: Record<typeof item.category, string> = {
    cooking: 'Cooked this',
    eat: 'Been here',
    bars: 'Been here',
    travel: 'Visited',
    wishlist: 'Purchased',
    watch: 'Watched',
    beauty: 'Tried it',
    memes: 'Seen',
    misc: 'Done',
  };

  return (
    <View className="flex-1 bg-bg-primary">
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={{ height: 340 }}>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          <LinearGradient
            colors={['rgba(13,13,15,0.5)', 'transparent', 'rgba(13,13,15,0.95)']}
            locations={[0, 0.4, 1]}
            style={{ position: 'absolute', inset: 0 }}
          />
          <SafeAreaView edges={['top']} className="flex-row justify-between px-4">
            <PressableScale
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full bg-black/40"
            >
              <Ionicons name="close" size={20} color="#fff" />
            </PressableScale>
            <PressableScale
              onPress={() => toggleItemDone(item.id)}
              className="h-10 w-10 items-center justify-center rounded-full bg-black/40"
            >
              <Ionicons name={isDone ? 'checkmark-circle' : 'bookmark-outline'} size={20} color={isDone ? '#5FC49A' : '#fff'} />
            </PressableScale>
          </SafeAreaView>
        </View>

        <View className="gap-5 px-5 pb-10 pt-5">
          <View className="gap-2">
            <View
              className="flex-row items-center gap-1.5 self-start rounded-full border border-white/10 px-2.5 py-1"
              style={{ backgroundColor: `${cat.accent}26` }}
            >
              <Ionicons name={cat.icon} size={12} color={cat.accent} />
              <Text className="text-[11px] font-semibold" style={{ color: cat.accent }}>
                {cat.label}
              </Text>
            </View>
            <Text className="text-[26px] font-extrabold leading-[32px] text-text-primary">
              {item.title}
            </Text>
            <View className="flex-row items-center justify-between pt-1">
              <SourceBadge platform={item.sourcePlatform} handle={item.sourceHandle} />
              <Text className="text-[12px] text-text-muted">{relativeSavedLabel(item.savedAt)}</Text>
            </View>
          </View>

          <ItemDetails item={item} />

          <Button
            label={isDone ? `✓ ${doneLabel[item.category]}` : `Mark as ${doneLabel[item.category].toLowerCase()}`}
            variant={isDone ? 'social' : 'primary'}
            onPress={() => toggleItemDone(item.id)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-border" />;
}

function Row({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-2.5">
      <View className="flex-row items-center gap-2">
        <Ionicons name={icon} size={15} color="#8A909C" />
        <Text className="text-[13.5px] text-text-secondary">{label}</Text>
      </View>
      <Text className="text-[13.5px] font-semibold text-text-primary">{value}</Text>
    </View>
  );
}

function ItemDetails({ item }: { item: NonNullable<ReturnType<typeof findItemById>> }) {
  switch (item.category) {
    case 'cooking':
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Row icon="time-outline" label="Cook time" value={`${item.cookTimeMinutes} min`} />
          <Divider />
          <Row icon="bar-chart-outline" label="Difficulty" value={item.difficulty} />
          <Divider />
          <Row icon="people-outline" label="Servings" value={`${item.servings}`} />
          <View className="pt-3">
            <Text className="pb-2 text-[12px] font-semibold uppercase tracking-wider text-text-muted">
              Ingredients
            </Text>
            <View className="flex-row flex-wrap gap-1.5">
              {item.ingredients.map((ing) => (
                <View key={ing} className="rounded-full bg-bg-elevated px-2.5 py-1">
                  <Text className="text-[12px] text-text-secondary">{ing}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    case 'eat':
    case 'bars': {
      const isRestaurant = item.category === 'eat';
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Row icon="location-outline" label="Neighborhood" value={item.neighborhood} />
          <Divider />
          <Row icon="navigate-outline" label="Distance" value={`${item.distanceMiles} mi`} />
          <Divider />
          <Row
            icon="time-outline"
            label={isRestaurant ? 'Status' : 'Open until'}
            value={isRestaurant ? ((item as any).openNow ? 'Open now' : 'Closed') : (item as any).openUntil}
          />
          <Divider />
          <Row icon="star-outline" label="Rating" value={`${item.rating} / 5`} />
          <View className="pt-3">
            <Button
              label="Get directions"
              variant="social"
              icon={<Ionicons name="navigate" size={16} color="#fff" />}
              onPress={() => openInMaps(`${item.title} ${item.neighborhood}`)}
            />
          </View>
        </View>
      );
    }
    case 'travel':
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Row icon="flag-outline" label="Country" value={item.country} />
          <Divider />
          <Row icon="pricetag-outline" label="Vibe" value={item.tag} />
          <Divider />
          <Row icon="sunny-outline" label="Best season" value={item.bestSeason} />
          <View className="pt-3">
            <Button
              label="Open in Maps"
              variant="social"
              icon={<Ionicons name="globe-outline" size={16} color="#fff" />}
              onPress={() => openInMaps(`${item.city}, ${item.country}`)}
            />
          </View>
        </View>
      );
    case 'wishlist':
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Row icon="pricetag-outline" label="Price" value={`$${item.price}`} />
          <Divider />
          <Row icon="storefront-outline" label="Shop" value={item.shop} />
          <Divider />
          <Row icon="cube-outline" label="Availability" value={item.inStock ? 'In stock' : 'Out of stock'} />
        </View>
      );
    case 'watch':
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Row icon="film-outline" label="Type" value={item.mediaType} />
          <Divider />
          <Row icon="time-outline" label="Runtime" value={`${item.runtimeMinutes} min`} />
          <Divider />
          <Row icon="star-outline" label="Rating" value={`${item.rating} / 10`} />
          <View className="pt-3">
            <Text className="pb-2 text-[12px] font-semibold uppercase tracking-wider text-text-muted">
              Streaming on
            </Text>
            <View className="flex-row flex-wrap gap-1.5">
              {item.streaming.map((s) => (
                <View key={s} className="rounded-full bg-bg-elevated px-2.5 py-1">
                  <Text className="text-[12px] text-text-secondary">{s}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    case 'beauty':
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Row icon="pricetag-outline" label="Price" value={`$${item.price}`} />
          <Divider />
          <Row icon="storefront-outline" label="Shop" value={item.shop} />
          <Divider />
          <Row icon="sparkles-outline" label="Type" value={item.productType} />
        </View>
      );
    case 'memes':
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Text className="text-[14px] text-text-secondary">{item.caption}</Text>
        </View>
      );
    case 'misc':
      return (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Text className="text-[14px] text-text-secondary">{item.note}</Text>
        </View>
      );
  }
}
