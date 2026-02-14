import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  soundEnabled: boolean;
  hasSeenBoot: boolean;

  toggleSound: () => void;
  setHasSeenBoot: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      hasSeenBoot: false,

      toggleSound: () => set(state => ({ soundEnabled: !state.soundEnabled })),
      setHasSeenBoot: (value: boolean) => set({ hasSeenBoot: value }),
    }),
    {
      name: 'am-settings',
    }
  )
);
