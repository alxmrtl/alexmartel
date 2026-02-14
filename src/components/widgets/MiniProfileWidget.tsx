'use client';

import PanelFrame from '../dashboard/PanelFrame';

export default function MiniProfileWidget() {
  return (
    <PanelFrame title="Profile" icon="[USR]" accentColor="var(--accent-magenta)" glowColor="var(--glow-magenta)">
      <div className="text-center">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded mx-auto flex items-center justify-center text-sm font-mono font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(255, 45, 123, 0.15))',
            border: '1px solid var(--accent-cyan)',
            color: 'var(--accent-cyan)',
            boxShadow: '0 0 12px var(--glow-cyan)',
          }}
        >
          AM
        </div>

        <div
          className="text-xs font-bold font-mono uppercase tracking-wider"
          style={{
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Alex Martel
        </div>
        <div
          className="text-[10px] font-mono mt-0.5"
          style={{ color: 'var(--text-dim)' }}
        >
          Creator &middot; Builder
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {['Dev', 'Coach', 'Design'].map(tag => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider"
              style={{
                background: 'rgba(0, 229, 255, 0.1)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </PanelFrame>
  );
}
