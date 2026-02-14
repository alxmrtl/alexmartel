'use client';

import { useSettingsStore, type ColorScheme, type UIScale } from '@/store/settingsStore';

const COLOR_SCHEMES: { id: ColorScheme; label: string; primary: string; secondary: string }[] = [
  { id: 'neon-cyber',      label: 'Neon Cyber',      primary: '#00e5ff', secondary: '#ff2d7b' },
  { id: 'amber-terminal',  label: 'Amber Terminal',  primary: '#ffb800', secondary: '#ff6b35' },
  { id: 'matrix',          label: 'Matrix',          primary: '#00ff9d', secondary: '#b8ff00' },
  { id: 'vaporwave',       label: 'Vaporwave',       primary: '#b44dff', secondary: '#ff69b4' },
  { id: 'arctic',          label: 'Arctic',          primary: '#88ccff', secondary: '#e0f0ff' },
  { id: 'infrared',        label: 'Infrared',        primary: '#ff3333', secondary: '#ffb800' },
];

const SCALE_OPTIONS: { value: UIScale; label: string }[] = [
  { value: 0.8, label: 'XS' },
  { value: 0.9, label: 'S' },
  { value: 1.0, label: 'M' },
  { value: 1.1, label: 'L' },
  { value: 1.2, label: 'XL' },
];

export default function ThemeControl({ onClose }: { onClose: () => void }) {
  const colorScheme = useSettingsStore(state => state.colorScheme);
  const uiScale = useSettingsStore(state => state.uiScale);
  const setColorScheme = useSettingsStore(state => state.setColorScheme);
  const setUIScale = useSettingsStore(state => state.setUIScale);

  const applyTheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    const html = document.documentElement;
    if (scheme === 'neon-cyber') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', scheme);
    }
  };

  const applyScale = (scale: UIScale) => {
    setUIScale(scale);
    document.documentElement.setAttribute('data-scale', String(scale));
  };

  return (
    <div
      className="absolute right-0 top-full mt-1 z-[200] animate-fade-in"
      style={{
        width: 260,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--window-border)',
        borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 12px var(--theme-glow-primary)',
        padding: 16,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent-cyan)' }}
        >
          Theme
        </span>
        <button
          onClick={onClose}
          className="text-[10px] font-mono cursor-pointer px-1.5 py-0.5 rounded"
          style={{
            color: 'var(--text-dim)',
            border: '1px solid var(--window-border)',
            background: 'transparent',
          }}
        >
          ESC
        </button>
      </div>

      {/* Color Scheme Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {COLOR_SCHEMES.map(scheme => {
          const isActive = colorScheme === scheme.id;
          return (
            <button
              key={scheme.id}
              onClick={() => applyTheme(scheme.id)}
              className="flex flex-col items-center gap-1.5 p-2 rounded cursor-pointer transition-all"
              style={{
                background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: isActive
                  ? `1px solid ${scheme.primary}`
                  : '1px solid transparent',
                boxShadow: isActive
                  ? `0 0 8px ${scheme.primary}40`
                  : 'none',
              }}
            >
              {/* Duotone swatch */}
              <div className="flex gap-0.5">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{
                    background: scheme.primary,
                    boxShadow: `0 0 6px ${scheme.primary}60`,
                  }}
                />
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{
                    background: scheme.secondary,
                    boxShadow: `0 0 6px ${scheme.secondary}60`,
                  }}
                />
              </div>
              <span
                className="text-[8px] font-mono uppercase tracking-wider leading-tight text-center"
                style={{ color: isActive ? scheme.primary : 'var(--text-tertiary)' }}
              >
                {scheme.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scale Control */}
      <div>
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-2"
          style={{ color: 'var(--accent-cyan)' }}
        >
          Scale
        </span>
        <div className="flex items-center gap-1">
          {SCALE_OPTIONS.map(opt => {
            const isActive = uiScale === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => applyScale(opt.value)}
                className="flex-1 py-1.5 text-[10px] font-mono font-bold uppercase rounded cursor-pointer transition-all"
                style={{
                  background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                  border: isActive
                    ? '1px solid var(--accent-cyan)'
                    : '1px solid var(--window-border)',
                  textShadow: isActive ? '0 0 6px var(--glow-cyan)' : 'none',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
