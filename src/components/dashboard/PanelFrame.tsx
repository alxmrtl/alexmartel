'use client';

import { ReactNode } from 'react';

interface PanelFrameProps {
  title?: string;
  icon?: string;
  accentColor?: string;
  glowColor?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function PanelFrame({
  title,
  icon,
  accentColor = 'var(--accent-cyan)',
  glowColor = 'var(--glow-cyan)',
  children,
  className = '',
  noPadding = false,
}: PanelFrameProps) {
  return (
    <div
      className={`panel-frame relative flex flex-col overflow-hidden ${className}`}
      style={{
        background: 'var(--window-bg)',
        border: `1px solid ${accentColor}`,
        borderRadius: 'var(--window-radius)',
        boxShadow: `0 0 8px ${glowColor}, inset 0 0 8px rgba(0, 229, 255, 0.02)`,
      }}
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none z-10" style={{ borderTop: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}` }} />
      <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none z-10" style={{ borderTop: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}` }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none z-10" style={{ borderBottom: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}` }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none z-10" style={{ borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}` }} />

      {/* Title bar */}
      {title && (
        <div
          className="flex items-center gap-2 px-3 shrink-0 select-none"
          style={{
            height: '28px',
            background: 'var(--window-header)',
            borderBottom: `1px solid rgba(0, 229, 255, 0.1)`,
          }}
        >
          {icon && (
            <span
              className="text-[10px] font-bold font-mono"
              style={{ color: accentColor, textShadow: `0 0 6px ${glowColor}` }}
            >
              {icon}
            </span>
          )}
          <span
            className="text-[10px] font-mono uppercase tracking-widest truncate"
            style={{ color: accentColor }}
          >
            {title}
          </span>
        </div>
      )}

      {/* Content */}
      <div
        className={`flex-1 overflow-auto ${noPadding ? '' : 'p-3'}`}
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.01) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
