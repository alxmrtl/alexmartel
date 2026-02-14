'use client';

import { useState } from 'react';

interface ProjectData {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  tech: { name: string; icon: string }[];
  status: 'live' | 'beta' | 'development';
  links: { label: string; url: string; icon: string }[];
  philosophy?: string;
}

const projectsData: Record<string, ProjectData> = {
  repos: {
    id: 'repos',
    name: 'REP.OS',
    icon: 'RPT',
    tagline: 'REPS. LOGGED. DONE.',
    description: 'A revolutionary minimalist fitness tracking application with terminal aesthetics. REP.OS promotes micro-workouts distributed throughout the day rather than traditional gym session blocks. Designed for users who are overwhelmed by complex, feature-heavy fitness apps.',
    features: [
      'One-tap rep logging with animated feedback',
      'Personal records tracking with historical data',
      'Streak mechanics with target completion',
      'Terminal-inspired monospace UI',
      'PWA - installable on any device',
      'Offline-first with local storage',
      'CSV/JSON data export',
    ],
    tech: [
      { name: 'Next.js 15', icon: 'NXT' },
      { name: 'TypeScript', icon: 'TSC' },
      { name: 'Tailwind CSS', icon: 'TWD' },
      { name: 'PWA', icon: 'PWA' },
    ],
    status: 'beta',
    links: [
      { label: 'Live Demo', url: '#', icon: 'WEB' },
      { label: 'GitHub', url: '#', icon: 'GIT' },
    ],
    philosophy: 'Movement is identity. Every rep is a vote for the person you want to become. REP.OS transforms fitness from a chore into a series of small wins throughout your day.',
  },
  flowspace: {
    id: 'flowspace',
    name: 'FlowSpace',
    icon: 'FLW',
    tagline: 'Plan. Focus. Review.',
    description: 'A productivity PWA based on the FourFlow framework. FlowSpace helps you cultivate sustained focus through the PLAN → FOCUS → REVIEW workflow. Features the innovative "Focus Reps" system - counting each choice to stay focused when distracted.',
    features: [
      'Four-pillar structure (Spirit, Story, Space, Self)',
      'Focus Reps - gamified attention training',
      'Navigation Mode vs Focus Mode UI',
      'Local-first IndexedDB storage',
      'Privacy-focused, offline-capable',
      'Zen minimalist focus interface',
    ],
    tech: [
      { name: 'React 18', icon: 'RCT' },
      { name: 'Vite', icon: 'VTE' },
      { name: 'Zustand', icon: 'ZST' },
      { name: 'IndexedDB', icon: 'IDB' },
    ],
    status: 'beta',
    links: [
      { label: 'Live Demo', url: '#', icon: 'WEB' },
    ],
    philosophy: 'FlowSpace is NOT another productivity grinder. It\'s a focus muscle trainer, a meaning-maker, and a flow companion. The goal: finish a focus session, glance at your rep count, and smile.',
  },
  clearpath: {
    id: 'clearpath',
    name: 'ClearPath',
    icon: 'CLR',
    tagline: 'Your journey to clarity.',
    description: 'A comprehensive smoking cessation app using evidence-based approaches to breaking habits and building healthier ones. ClearPath combines behavioral science with compassionate design to support users through their quit journey.',
    features: [
      'Personalized quit plan creation',
      'Craving management tools',
      'Progress tracking & milestones',
      'Health recovery timeline',
      'Money saved calculator',
      'Community support features',
    ],
    tech: [
      { name: 'React Native', icon: 'RCN' },
      { name: 'TypeScript', icon: 'TSC' },
      { name: 'Expo', icon: 'EXP' },
    ],
    status: 'development',
    links: [],
    philosophy: 'Recovery is not linear. ClearPath meets you where you are, celebrates every smoke-free moment, and helps you build the life you want.',
  },
  'infinite-banker': {
    id: 'infinite-banker',
    name: 'Infinite Banker',
    icon: 'FIN',
    tagline: 'Be your own bank.',
    description: 'A financial education app teaching the infinite banking concept. Learn how to build wealth through strategic use of whole life insurance policies and become your own source of financing.',
    features: [
      'Interactive policy illustrations',
      'Loan vs withdrawal calculator',
      'Educational content library',
      'Policy performance tracking',
      'Compound growth visualizations',
    ],
    tech: [
      { name: 'Vite', icon: 'VTE' },
      { name: 'React', icon: 'RCT' },
      { name: 'Supabase', icon: 'SPA' },
      { name: 'Tailwind', icon: 'TWD' },
    ],
    status: 'development',
    links: [],
    philosophy: 'Financial freedom starts with understanding. Infinite Banker demystifies complex financial strategies and puts you in control of your wealth.',
  },
  'fourflow-os': {
    id: 'fourflow-os',
    name: 'FourFlowOS',
    icon: 'SYS',
    tagline: 'A neon neural interface.',
    description: 'This very site — a cyberpunk desktop experience with draggable windows, neon-lit apertures, and a living grid background. Built from scratch with zero UI libraries, every pixel is intentional.',
    features: [
      'Draggable, resizable window system',
      'Cyberpunk grid with circuit-trace overlay',
      'Neon-bordered aperture cards with scanlines',
      'Floating dock with window management',
      'Synthesized electronic Web Audio sounds',
      'Terminal-style boot sequence',
      'Responsive across all devices',
    ],
    tech: [
      { name: 'Next.js', icon: 'NXT' },
      { name: 'Tailwind CSS', icon: 'TWD' },
      { name: 'Zustand', icon: 'ZST' },
      { name: 'Web Audio API', icon: 'AUD' },
    ],
    status: 'live',
    links: [],
    philosophy: 'Your portfolio should feel like you. Not a template, not a clone — a living reflection of your aesthetic and craft.',
  },
};

const tabNames = ['Overview', 'Features', 'Tech Stack', 'Philosophy'];

interface ProjectDetailProps {
  props?: { projectId?: string };
}

export default function ProjectDetail({ props }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState(0);
  const projectId = (props?.projectId as string) || 'repos';
  const project = projectsData[projectId] || projectsData.repos;

  const statusStyles: Record<string, { color: string; bg: string; border: string }> = {
    live: { color: 'var(--accent-green)', bg: 'rgba(0, 255, 157, 0.1)', border: 'rgba(0, 255, 157, 0.3)' },
    beta: { color: 'var(--accent-amber)', bg: 'rgba(255, 184, 0, 0.1)', border: 'rgba(255, 184, 0, 0.3)' },
    development: { color: 'var(--accent-magenta)', bg: 'rgba(255, 45, 123, 0.1)', border: 'rgba(255, 45, 123, 0.3)' },
  };

  const filteredTabs = project.philosophy ? tabNames : tabNames.slice(0, 3);

  return (
    <div className="h-full flex flex-col font-mono">
      {/* Header */}
      <div
        className="p-4 shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(255, 45, 123, 0.05) 100%)',
          borderBottom: '1px solid var(--window-border)',
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xl font-bold"
            style={{
              color: 'var(--accent-cyan)',
              textShadow: '0 0 10px var(--glow-cyan)',
            }}
          >
            [{project.icon}]
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{project.name}</h2>
            <p className="text-xs italic" style={{ color: 'var(--text-secondary)' }}>{project.tagline}</p>
          </div>
          <span
            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded"
            style={{
              color: statusStyles[project.status].color,
              background: statusStyles[project.status].bg,
              border: `1px solid ${statusStyles[project.status].border}`,
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0" style={{ borderBottom: '1px solid var(--window-border)' }}>
        {filteredTabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
            style={{
              color: activeTab === i ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
              borderBottom: activeTab === i ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              background: 'transparent',
              textShadow: activeTab === i ? '0 0 8px var(--glow-cyan)' : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Overview Tab */}
        {activeTab === 0 && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

            {project.links.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent-cyan)' }}>// Links</div>
                <div className="flex gap-2">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs rounded font-bold uppercase tracking-wider transition-all"
                      style={{
                        background: 'rgba(0, 229, 255, 0.1)',
                        color: 'var(--accent-cyan)',
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(0, 229, 255, 0.2)';
                        e.currentTarget.style.boxShadow = '0 0 12px var(--glow-cyan)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      [{link.icon}] {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Features', value: project.features.length },
                { label: 'Technologies', value: project.tech.length },
                { label: 'Status', value: project.status },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="p-3 text-center rounded"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--window-border)',
                  }}
                >
                  <div
                    className="text-xl font-bold capitalize"
                    style={{
                      color: 'var(--accent-cyan)',
                      textShadow: '0 0 8px var(--glow-cyan)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 1 && (
          <div className="space-y-1">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded"
                style={{
                  background: i % 2 === 0 ? 'var(--bg-tertiary)' : 'transparent',
                  borderLeft: i % 2 === 0 ? '2px solid var(--accent-green)' : '2px solid transparent',
                }}
              >
                <span style={{ color: 'var(--accent-green)' }}>[+]</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Tab */}
        {activeTab === 2 && (
          <div className="grid grid-cols-2 gap-3">
            {project.tech.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--window-border)',
                }}
              >
                <span className="text-sm font-bold" style={{ color: 'var(--accent-cyan)', textShadow: '0 0 6px var(--glow-cyan)' }}>[{tech.icon}]</span>
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{tech.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Philosophy Tab */}
        {activeTab === 3 && project.philosophy && (
          <div
            className="p-4 rounded italic text-sm leading-relaxed"
            style={{
              background: 'rgba(180, 77, 255, 0.05)',
              borderLeft: '2px solid var(--accent-purple)',
              color: 'var(--text-secondary)',
              boxShadow: '-4px 0 15px rgba(180, 77, 255, 0.1)',
            }}
          >
            &ldquo;{project.philosophy}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
