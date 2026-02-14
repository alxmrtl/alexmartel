export interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  component: string;
  hint: string;
  accentColor: string;
  glowColor: string;
}

export const sections: SectionConfig[] = [
  {
    id: 'about-me',
    title: 'About Me',
    icon: '[USR]',
    component: 'AboutMe',
    hint: 'Neural profile & capabilities',
    accentColor: 'var(--accent-cyan)',
    glowColor: 'var(--glow-cyan)',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    icon: '[PRJ]',
    component: 'Portfolio',
    hint: 'Deployed systems & builds',
    accentColor: 'var(--accent-amber)',
    glowColor: 'var(--glow-amber)',
  },
  {
    id: 'blog',
    title: 'Blog / Writing',
    icon: '[LOG]',
    component: 'Blog',
    hint: 'Transmission logs & ideas',
    accentColor: 'var(--accent-green)',
    glowColor: 'var(--glow-green)',
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '[COM]',
    component: 'Contact',
    hint: 'Open a comm channel',
    accentColor: 'var(--accent-magenta)',
    glowColor: 'var(--glow-magenta)',
  },
  {
    id: 'now',
    title: 'Now',
    icon: '[SYS]',
    component: 'NowPage',
    hint: 'Current system status',
    accentColor: 'var(--accent-purple)',
    glowColor: 'var(--glow-purple)',
  },
  {
    id: 'forge',
    title: 'FORGE',
    icon: '[FRG]',
    component: 'ForgeHealth',
    hint: 'Health optimization protocol',
    accentColor: 'var(--accent-orange)',
    glowColor: 'var(--glow-orange)',
  },
];
