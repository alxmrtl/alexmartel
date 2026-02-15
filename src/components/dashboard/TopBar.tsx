'use client';

import { useNavigationStore } from '@/store/navigationStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { sections } from '@/config/sections';

interface TopBarProps {
  onConfigToggle: () => void;
  configOpen: boolean;
}

export default function TopBar({ onConfigToggle, configOpen }: TopBarProps) {
  const activePanel = useNavigationStore(state => state.activePanel);
  const activeProjectId = useNavigationStore(state => state.activeProjectId);
  const soundEnabled = useSettingsStore(state => state.soundEnabled);
  const toggleSound = useSettingsStore(state => state.toggleSound);
  const { playSound } = useSoundEffects();

  const activeSection = sections.find(s => s.id === activePanel);
  const displayModule = activeProjectId
    ? `${activeSection?.title || ''} > PROJECT_DETAIL`
    : activeSection?.title?.toUpperCase() || 'SYSTEM';

  const handleSoundToggle = () => {
    toggleSound();
    playSound('click');
  };

  return (
    <div
      className="dashboard-topbar flex items-center justify-between px-4 shrink-0 select-none"
      style={{
        height: 'var(--topbar-height)',
        background: 'var(--window-header)',
        borderBottom: '1px solid rgba(var(--accent-cyan-rgb), 0.2)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
        zIndex: 100,
      }}
    >
      {/* Left: Site title */}
      <div className="flex items-center gap-3">
        <span
          className="text-sm font-bold tracking-[0.15em] uppercase"
          style={{
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 12px var(--glow-cyan)',
          }}
        >
          AMARTEL.OS
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>v1.0</span>
      </div>

      {/* Center: Active module breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>&gt;</span>
        <span
          className="text-xs font-mono font-bold uppercase tracking-wider"
          style={{
            color: activeSection?.accentColor || 'var(--accent-cyan)',
            textShadow: `0 0 8px ${activeSection?.glowColor || 'var(--glow-cyan)'}`,
          }}
        >
          {displayModule}
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* CFG button — only visible when WidgetRail is hidden */}
        <button
          onClick={onConfigToggle}
          className="xl:hidden px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded cursor-pointer transition-all"
          style={{
            background: configOpen ? 'rgba(var(--accent-cyan-rgb), 0.15)' : 'rgba(var(--accent-cyan-rgb), 0.06)',
            color: 'var(--accent-cyan)',
            border: `1px solid rgba(var(--accent-cyan-rgb), ${configOpen ? '0.5' : '0.25'})`,
            textShadow: '0 0 6px var(--glow-cyan)',
            boxShadow: configOpen ? '0 0 10px var(--glow-cyan)' : 'none',
          }}
        >
          CFG
        </button>

        {/* Sound toggle */}
        <button
          onClick={handleSoundToggle}
          className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded cursor-pointer transition-all"
          style={{
            background: soundEnabled ? 'rgba(var(--accent-green-rgb), 0.1)' : 'transparent',
            color: soundEnabled ? 'var(--accent-green)' : 'var(--text-dim)',
            border: `1px solid ${soundEnabled ? 'rgba(var(--accent-green-rgb), 0.3)' : 'var(--window-border)'}`,
            textShadow: soundEnabled ? '0 0 6px var(--glow-green)' : 'none',
          }}
        >
          {soundEnabled ? 'SND' : 'MUT'}
        </button>

        {/* Status LED */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--accent-green)',
              boxShadow: '0 0 6px var(--glow-green)',
              animation: 'breathe 3s ease-in-out infinite',
            }}
          />
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-wider"
            style={{ color: 'var(--accent-green)', textShadow: '0 0 6px var(--glow-green)' }}
          >
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
