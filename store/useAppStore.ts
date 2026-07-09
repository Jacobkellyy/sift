import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthProvider =
  | 'apple'
  | 'google'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'reddit'
  | 'email'
  | 'guest';

export type ImportPlatform = 'tiktok' | 'instagram' | 'facebook' | 'reddit';

interface AppState {
  hasOnboarded: boolean;
  isAuthenticated: boolean;
  authProvider: AuthProvider | null;
  completedItemIds: string[];
  reduceMotion: boolean;
  pendingImportCount: number;
  connectedPlatforms: Record<ImportPlatform, boolean>;
  clearPendingImports: () => void;
  toggleConnection: (platform: ImportPlatform) => void;
  completeOnboarding: () => void;
  signIn: (provider: AuthProvider) => void;
  signOut: () => void;
  toggleItemDone: (id: string) => void;
  setReduceMotion: (value: boolean) => void;
  resetOnboarding: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      isAuthenticated: false,
      authProvider: null,
      completedItemIds: [],
      reduceMotion: false,
      pendingImportCount: 14,
      connectedPlatforms: { tiktok: true, instagram: true, facebook: false, reddit: true },
      clearPendingImports: () => set({ pendingImportCount: 0 }),
      toggleConnection: (platform) =>
        set((state) => ({
          connectedPlatforms: {
            ...state.connectedPlatforms,
            [platform]: !state.connectedPlatforms[platform],
          },
        })),
      completeOnboarding: () => set({ hasOnboarded: true }),
      signIn: (provider) =>
        set({ isAuthenticated: true, authProvider: provider, hasOnboarded: true }),
      signOut: () => set({ isAuthenticated: false, authProvider: null }),
      toggleItemDone: (id) =>
        set((state) => ({
          completedItemIds: state.completedItemIds.includes(id)
            ? state.completedItemIds.filter((i) => i !== id)
            : [...state.completedItemIds, id],
        })),
      setReduceMotion: (value) => set({ reduceMotion: value }),
      resetOnboarding: () =>
        set({ hasOnboarded: false, isAuthenticated: false, authProvider: null }),
    }),
    {
      name: 'sift-app-state',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
