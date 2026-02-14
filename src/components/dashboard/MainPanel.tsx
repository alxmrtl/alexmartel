'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/store/navigationStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { sections } from '@/config/sections';
import PanelFrame from './PanelFrame';
import AboutMe from '../apps/AboutMe';
import Portfolio from '../apps/Portfolio';
import ProjectDetail from '../apps/ProjectDetail';
import Blog from '../apps/Blog';
import Contact from '../apps/Contact';
import NowPage from '../apps/NowPage';
import ForgeHealth from '../apps/ForgeHealth';

const componentRegistry: Record<string, React.ComponentType> = {
  AboutMe,
  Portfolio,
  Blog,
  Contact,
  NowPage,
  ForgeHealth,
};

export default function MainPanel() {
  const activePanel = useNavigationStore(state => state.activePanel);
  const activeProjectId = useNavigationStore(state => state.activeProjectId);
  const closeProjectDetail = useNavigationStore(state => state.closeProjectDetail);
  const { playSound } = useSoundEffects();

  const activeSection = sections.find(s => s.id === activePanel);
  const Component = activeSection ? componentRegistry[activeSection.component] : null;

  const handleBack = () => {
    playSound('navigate');
    closeProjectDetail();
  };

  return (
    <div className="dashboard-main flex-1 min-w-0 flex flex-col overflow-hidden">
      <PanelFrame
        title={activeSection?.title || 'System'}
        icon={activeSection?.icon}
        accentColor={activeSection?.accentColor}
        glowColor={activeSection?.glowColor}
        className="flex-1"
        noPadding
      >
        <AnimatePresence mode="wait">
          {/* Project Detail drill-down */}
          {activePanel === 'portfolio' && activeProjectId ? (
            <motion.div
              key={`project-${activeProjectId}`}
              className="h-full flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Back button */}
              <div
                className="flex items-center gap-2 px-3 py-2 shrink-0"
                style={{ borderBottom: '1px solid var(--window-border)' }}
              >
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors"
                  style={{ color: 'var(--accent-cyan)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent-magenta)';
                    e.currentTarget.style.textShadow = '0 0 8px var(--glow-magenta)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--accent-cyan)';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  &lt; Back to Portfolio
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <ProjectDetail props={{ projectId: activeProjectId }} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activePanel}
              className="h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {Component && <Component />}
            </motion.div>
          )}
        </AnimatePresence>
      </PanelFrame>
    </div>
  );
}
