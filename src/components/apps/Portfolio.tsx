'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/store/navigationStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface Project {
  id: string;
  name: string;
  icon: string;
  description: string;
  tech: string[];
  status: 'live' | 'beta' | 'development';
}

const projects: Project[] = [
  {
    id: 'repos',
    name: 'REP.OS',
    icon: 'RPT',
    description: 'Minimalist fitness tracking app with terminal aesthetics. "REPS. LOGGED. DONE." Track micro-workouts throughout your day.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'PWA'],
    status: 'beta',
  },
  {
    id: 'flowspace',
    name: 'FlowSpace',
    icon: 'FLW',
    description: 'Productivity PWA based on the FourFlow framework. Plan, Focus, Review with flow-optimized workflows.',
    tech: ['React', 'Vite', 'Zustand', 'IndexedDB'],
    status: 'beta',
  },
  {
    id: 'clearpath',
    name: 'ClearPath',
    icon: 'CLR',
    description: 'Comprehensive smoking cessation app. Evidence-based approaches to breaking habits and building healthier ones.',
    tech: ['React Native', 'TypeScript'],
    status: 'development',
  },
  {
    id: 'infinite-banker',
    name: 'Infinite Banker',
    icon: 'FIN',
    description: 'Financial education app teaching the infinite banking concept. Build wealth through strategic insurance products.',
    tech: ['Vite', 'React', 'Supabase'],
    status: 'development',
  },
  {
    id: 'amartel-os',
    name: 'AMARTEL.OS',
    icon: 'SYS',
    description: 'This portfolio site — a neon cyberpunk desktop experience built from scratch. Neural interface meets draggable windows.',
    tech: ['Next.js', 'Tailwind', 'Zustand', 'Web Audio'],
    status: 'live',
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'icons' | 'list'>('icons');
  const openProjectDetail = useNavigationStore(state => state.openProjectDetail);
  const { playSound } = useSoundEffects();

  const handleProjectOpen = (project: Project) => {
    playSound('open');
    openProjectDetail(project.id);
  };

  const statusStyles: Record<string, { color: string; bg: string; border: string }> = {
    live: { color: 'var(--accent-green)', bg: 'rgba(var(--accent-green-rgb), 0.1)', border: 'rgba(var(--accent-green-rgb), 0.3)' },
    beta: { color: 'var(--accent-amber)', bg: 'rgba(var(--accent-amber-rgb), 0.1)', border: 'rgba(var(--accent-amber-rgb), 0.3)' },
    development: { color: 'var(--accent-magenta)', bg: 'rgba(var(--accent-magenta-rgb), 0.1)', border: 'rgba(var(--accent-magenta-rgb), 0.3)' },
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ borderBottom: '1px solid var(--window-border)' }}>
        <button
          onClick={() => setViewMode('icons')}
          className="px-3 py-1 text-xs rounded transition-colors cursor-pointer font-mono uppercase tracking-wider"
          style={{
            background: viewMode === 'icons' ? 'rgba(var(--accent-cyan-rgb), 0.1)' : 'transparent',
            color: viewMode === 'icons' ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
            border: viewMode === 'icons' ? '1px solid rgba(var(--accent-cyan-rgb), 0.3)' : '1px solid transparent',
          }}
        >
          Grid
        </button>
        <button
          onClick={() => setViewMode('list')}
          className="px-3 py-1 text-xs rounded transition-colors cursor-pointer font-mono uppercase tracking-wider"
          style={{
            background: viewMode === 'list' ? 'rgba(var(--accent-cyan-rgb), 0.1)' : 'transparent',
            color: viewMode === 'list' ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
            border: viewMode === 'list' ? '1px solid rgba(var(--accent-cyan-rgb), 0.3)' : '1px solid transparent',
          }}
        >
          List
        </button>
        <div className="flex-1" />
        <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>// click to select, double-click to open</span>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto p-3">
        {viewMode === 'icons' ? (
          <div className="grid grid-cols-3 gap-3">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                className="flex flex-col items-center gap-2 p-4 rounded cursor-pointer transition-colors text-center"
                style={{
                  background: selectedProject?.id === project.id ? 'rgba(var(--accent-cyan-rgb), 0.08)' : 'transparent',
                  border: selectedProject?.id === project.id ? '1px solid rgba(var(--accent-cyan-rgb), 0.3)' : '1px solid transparent',
                  boxShadow: selectedProject?.id === project.id ? '0 0 15px var(--glow-cyan)' : 'none',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                onClick={() => setSelectedProject(project)}
                onDoubleClick={() => handleProjectOpen(project)}
                onMouseEnter={e => {
                  if (selectedProject?.id !== project.id) {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.borderColor = 'var(--window-border)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedProject?.id !== project.id) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <span
                  className="text-lg font-mono font-bold"
                  style={{
                    color: 'var(--accent-cyan)',
                    textShadow: '0 0 8px var(--glow-cyan)',
                  }}
                >
                  [{project.icon}]
                </span>
                <span className="text-xs font-medium truncate w-full font-mono" style={{ color: 'var(--text-primary)' }}>
                  {project.name}
                </span>
                <span
                  className="text-[10px] capitalize px-2 py-0.5 rounded font-mono uppercase tracking-wider"
                  style={{
                    color: statusStyles[project.status].color,
                    background: statusStyles[project.status].bg,
                    border: `1px solid ${statusStyles[project.status].border}`,
                  }}
                >
                  {project.status}
                </span>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="text-sm font-mono">
            {/* List header */}
            <div
              className="grid grid-cols-[2fr,1fr,1fr] gap-2 p-2 text-xs font-semibold uppercase tracking-wide"
              style={{
                color: 'var(--accent-cyan)',
                borderBottom: '1px solid var(--window-border)',
              }}
            >
              <span>Name</span>
              <span>Status</span>
              <span>Tech</span>
            </div>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="grid grid-cols-[2fr,1fr,1fr] gap-2 p-2 cursor-pointer rounded transition-colors"
                style={{
                  background: selectedProject?.id === project.id ? 'rgba(var(--accent-cyan-rgb), 0.08)' : 'transparent',
                  color: 'var(--text-secondary)',
                  borderBottom: '1px solid rgba(30, 35, 71, 0.5)',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                onClick={() => setSelectedProject(project)}
                onDoubleClick={() => handleProjectOpen(project)}
                onMouseEnter={e => {
                  if (selectedProject?.id !== project.id) {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedProject?.id !== project.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span className="flex items-center gap-2">
                  <span style={{ color: 'var(--accent-cyan)' }}>[{project.icon}]</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{project.name}</span>
                </span>
                <span className="capitalize" style={{ color: statusStyles[project.status].color }}>
                  {project.status}
                </span>
                <span className="truncate text-xs" style={{ color: 'var(--text-tertiary)' }}>{project.tech.join(', ')}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Preview pane */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="shrink-0 p-3 font-mono"
            style={{
              borderTop: '1px solid var(--window-border)',
              background: 'var(--bg-tertiary)',
              maxHeight: '120px',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            key={selectedProject.id}
          >
            <div className="flex gap-3">
              <span className="text-lg font-bold" style={{ color: 'var(--accent-cyan)' }}>[{selectedProject.icon}]</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{selectedProject.name}</h4>
                <p className="text-xs line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>{selectedProject.description}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {selectedProject.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(var(--accent-cyan-rgb), 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(var(--accent-cyan-rgb), 0.2)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div
        className="shrink-0 px-3 py-1.5 text-xs flex justify-between font-mono"
        style={{
          borderTop: '1px solid var(--window-border)',
          color: 'var(--text-dim)',
        }}
      >
        <span>{projects.length} project(s)</span>
        <span>{selectedProject ? `> ${selectedProject.name}` : '> select a project'}</span>
      </div>
    </div>
  );
}
