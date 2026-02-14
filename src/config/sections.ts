export interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  component: string;
  hint: string;
  accentColor: string;
  glowColor: string;
  accentRgb: string;
}

export const sections: SectionConfig[] = [
  {
    id: 'about-me',
    title: 'User',
    icon: '[USR]',
    component: 'AboutMe',
    hint: 'Neural profile & capabilities',
    accentColor: 'var(--accent-cyan)',
    glowColor: 'var(--glow-cyan)',
    accentRgb: 'var(--accent-cyan-rgb)',
  },
  {
    id: 'portfolio',
    title: 'Projects',
    icon: '[PRJ]',
    component: 'Portfolio',
    hint: 'Deployed systems & builds',
    accentColor: 'var(--accent-amber)',
    glowColor: 'var(--glow-amber)',
    accentRgb: 'var(--accent-amber-rgb)',
  },
  {
    id: 'blog',
    title: 'Notes',
    icon: '[LOG]',
    component: 'Blog',
    hint: 'Transmission logs & ideas',
    accentColor: 'var(--accent-green)',
    glowColor: 'var(--glow-green)',
    accentRgb: 'var(--accent-green-rgb)',
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '[COM]',
    component: 'Contact',
    hint: 'Open a comm channel',
    accentColor: 'var(--accent-magenta)',
    glowColor: 'var(--glow-magenta)',
    accentRgb: 'var(--accent-magenta-rgb)',
  },
  {
    id: 'forge',
    title: 'FORGE',
    icon: '[FRG]',
    component: 'ForgeHealth',
    hint: 'Current health routine',
    accentColor: 'var(--accent-orange)',
    glowColor: 'var(--glow-orange)',
    accentRgb: 'var(--accent-orange-rgb)',
  },
];
