import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColorScheme = 'neon-cyber' | 'amber-terminal' | 'matrix' | 'vaporwave' | 'arctic' | 'infrared';
export type UIScale = 0.8 | 0.9 | 1.0 | 1.1 | 1.2;

interface SettingsStore {
  soundEnabled: boolean;
  hasSeenBoot: boolean;
  colorScheme: ColorScheme;
  uiScale: UIScale;

  toggleSound: () => void;
  setHasSeenBoot: (value: boolean) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setUIScale: (scale: UIScale) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      hasSeenBoot: false,
      colorScheme: 'neon-cyber' as ColorScheme,
      uiScale: 1.0 as UIScale,

      toggleSound: () => set(state => ({ soundEnabled: !state.soundEnabled })),
      setHasSeenBoot: (value: boolean) => set({ hasSeenBoot: value }),
      setColorScheme: (scheme: ColorScheme) => set({ colorScheme: scheme }),
      setUIScale: (scale: UIScale) => set({ uiScale: scale }),
    }),
    {
      name: 'am-settings',
    }
  )
);
