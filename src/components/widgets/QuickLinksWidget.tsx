'use client';

import PanelFrame from '../dashboard/PanelFrame';

const links = [
  { icon: 'WEB', label: 'Website', href: '#' },
  { icon: 'X  ', label: 'Twitter / X', href: '#' },
  { icon: 'LNK', label: 'LinkedIn', href: '#' },
  { icon: 'MSG', label: 'Email', href: 'mailto:hello@alexmartel.com' },
];

export default function QuickLinksWidget() {
  return (
    <PanelFrame title="Quick Links" icon="[LNK]" accentColor="var(--accent-purple)" glowColor="var(--glow-purple)">
      <div className="space-y-1">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-tertiary)';
              e.currentTarget.style.color = 'var(--accent-cyan)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <span className="font-bold" style={{ color: 'var(--accent-purple)' }}>[{link.icon}]</span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </PanelFrame>
  );
}
