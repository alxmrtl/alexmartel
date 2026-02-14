'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigationStore } from '@/store/navigationStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { sections } from '@/config/sections';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const activePanel = useNavigationStore(state => state.activePanel);
  const setActivePanel = useNavigationStore(state => state.setActivePanel);
  const { playSound } = useSoundEffects();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleNavClick = (sectionId: string) => {
    if (sectionId !== activePanel) {
      playSound('navigate');
      setActivePanel(sectionId);
    }
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <nav
        className={`dashboard-sidebar flex flex-col shrink-0 select-none
          absolute lg:relative top-0 left-0 h-full lg:h-auto
          z-50 lg:z-auto transition-transform duration-300 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: 'var(--sidebar-width)',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid rgba(var(--accent-cyan-rgb), 0.15)',
        }}
      >
        {/* Nav header */}
        <div
          className="px-3 py-3 text-[10px] font-mono uppercase tracking-widest shrink-0"
          style={{
            color: 'var(--text-dim)',
            borderBottom: '1px solid rgba(var(--accent-cyan-rgb), 0.08)',
          }}
        >
          // Modules
        </div>

        {/* Nav items */}
        <div className="flex-1 py-2 overflow-auto">
          {sections.map((section, i) => {
            const isActive = activePanel === section.id;
            const isHovered = hoveredId === section.id;

            return (
              <motion.button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-left cursor-pointer transition-colors relative"
                style={{
                  background: isActive
                    ? `rgba(${section.accentRgb}, 0.08)`
                    : 'transparent',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1 bottom-1 w-0.5"
                    style={{
                      background: section.accentColor,
                      boxShadow: `0 0 8px ${section.glowColor}`,
                    }}
                    layoutId="sidebar-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <span
                  className="text-xs font-bold font-mono shrink-0 mt-0.5"
                  style={{
                    color: isActive || isHovered ? section.accentColor : 'var(--text-dim)',
                    textShadow: isActive ? `0 0 8px ${section.glowColor}` : 'none',
                    transition: 'color 0.2s, text-shadow 0.2s',
                  }}
                >
                  {section.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-mono font-medium uppercase tracking-wider truncate"
                    style={{
                      color: isActive ? section.accentColor : isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                      textShadow: isActive ? `0 0 6px ${section.glowColor}` : 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    {section.title}
                  </div>
                  <div
                    className="text-[10px] font-mono truncate mt-0.5"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {section.hint}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="px-3 py-2 text-[10px] font-mono shrink-0"
          style={{
            color: 'var(--text-dim)',
            borderTop: '1px solid rgba(var(--accent-cyan-rgb), 0.08)',
          }}
        >
          <span style={{ color: 'var(--accent-cyan)' }}>SYS</span> {sections.length} modules loaded
        </div>
      </nav>
    </>
  );
}
