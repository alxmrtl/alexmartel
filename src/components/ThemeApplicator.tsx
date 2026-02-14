'use client';

import { useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

export default function ThemeApplicator() {
  const colorScheme = useSettingsStore(state => state.colorScheme);
  const uiScale = useSettingsStore(state => state.uiScale);

  useEffect(() => {
    const html = document.documentElement;
    if (colorScheme === 'neon-cyber') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', colorScheme);
    }
    html.setAttribute('data-scale', String(uiScale));
  }, [colorScheme, uiScale]);

  return null;
}
