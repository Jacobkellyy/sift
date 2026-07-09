import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

/** True once the persisted zustand store has finished reading from AsyncStorage. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(useAppStore.persist.hasHydrated());

  useEffect(() => {
    if (hydrated) return;
    const unsub = useAppStore.persist.onFinishHydration(() => setHydrated(true));
    if (useAppStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, [hydrated]);

  return hydrated;
}
