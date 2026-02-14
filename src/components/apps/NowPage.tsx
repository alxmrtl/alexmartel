'use client';

import { motion } from 'framer-motion';

interface NowSection {
  title: string;
  icon: string;
  accentColor: string;
  glowColor: string;
  items: string[];
}

const nowSections: NowSection[] = [
  {
    title: 'Building',
    icon: 'BLD',
    accentColor: 'var(--accent-amber)',
    glowColor: 'var(--glow-amber)',
    items: [
      'FourFlowOS — this neural interface',
      'REP.OS — micro-workout tracker (beta)',
      'FlowSpace — focus & productivity PWA',
    ],
  },
  {
    title: 'Reading',
    icon: 'LOG',
    accentColor: 'var(--accent-green)',
    glowColor: 'var(--glow-green)',
    items: [
      'Flow by Mihaly Csikszentmihalyi',
      'Refactoring UI by Adam Wathan',
      'The Almanack of Naval Ravikant',
    ],
  },
  {
    title: 'Practicing',
    icon: 'PRC',
    accentColor: 'var(--accent-purple)',
    glowColor: 'var(--glow-purple)',
    items: [
      'Morning flow rituals',
      'Micro-workouts throughout the day',
      'Evening reflection journaling',
    ],
  },
  {
    title: 'Exploring',
    icon: 'EXP',
    accentColor: 'var(--accent-magenta)',
    glowColor: 'var(--glow-magenta)',
    items: [
      'Web Audio API for generative soundscapes',
      'CSS-only animation techniques',
      'Minimalist design philosophy',
    ],
  },
];

export default function NowPage() {
  return (
    <div className="h-full overflow-auto p-4 font-mono">
      <div className="mb-5">
        <h2
          className="text-lg font-bold uppercase tracking-wider"
          style={{
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 15px var(--glow-cyan)',
          }}
        >
          System Status
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
          // Current processes. Updated regularly.
        </p>
      </div>

      <div className="space-y-5">
        {nowSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.12 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold"
                style={{
                  color: section.accentColor,
                  textShadow: `0 0 8px ${section.glowColor}`,
                }}
              >
                [{section.icon}]
              </span>
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: section.accentColor }}
              >
                {section.title}
              </h3>
            </div>
            <div className="space-y-1 ml-7">
              {section.items.map((item, j) => (
                <motion.div
                  key={j}
                  className="text-sm py-1.5 px-3 rounded"
                  style={{
                    color: 'var(--text-secondary)',
                    background: j % 2 === 0 ? 'var(--bg-tertiary)' : 'transparent',
                    borderLeft: j % 2 === 0 ? `2px solid ${section.accentColor}` : '2px solid transparent',
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.12 + j * 0.05 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-6 pt-4 text-xs text-center"
        style={{
          borderTop: '1px solid var(--window-border)',
          color: 'var(--text-dim)',
        }}
      >
        Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent-purple)', textShadow: '0 0 6px var(--glow-purple)' }}>nownownow.com</a>
      </div>
    </div>
  );
}
