import { Linking, Platform } from 'react-native';

export function openInMaps(query: string) {
  const encoded = encodeURIComponent(query);
  const url =
    Platform.OS === 'ios'
      ? `https://maps.apple.com/?q=${encoded}`
      : `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  Linking.openURL(url).catch(() => {});
}
