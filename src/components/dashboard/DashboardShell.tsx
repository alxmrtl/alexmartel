'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import LivingCanvas from '../canvas/LivingCanvas';
import BootSequence from './BootSequence';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import WidgetRail from '../widgets/WidgetRail';

export default function DashboardShell() {
  const [showBoot, setShowBoot] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hasSeenBoot = useSettingsStore(state => state.hasSeenBoot);
  const setHasSeenBoot = useSettingsStore(state => state.setHasSeenBoot);

  useEffect(() => {
    setIsHydrated(true);
    if (hasSeenBoot) {
      setShowBoot(false);
    }
  }, [hasSeenBoot]);

  const handleBootComplete = useCallback(() => {
    setShowBoot(false);
    setHasSeenBoot(true);
  }, [setHasSeenBoot]);

  if (!isHydrated) {
    return <div className="h-screen w-screen" style={{ background: 'var(--bg-primary)' }} />;
  }

  return (
    <>
      {showBoot && <BootSequence onComplete={handleBootComplete} />}

      <div className="relative h-screen w-screen overflow-hidden flex flex-col" style={{ background: 'var(--bg-primary)' }}>
        {/* Living Canvas — animated background */}
        <LivingCanvas />

        {/* Top Bar */}
        <TopBar />

        {/* Main layout: Sidebar + MainPanel + WidgetRail */}
        <div className="dashboard-layout flex flex-1 min-h-0 relative" style={{ zIndex: 1 }}>
          {/* Mobile hamburger */}
          <button
            className="fixed top-2 left-2 z-[60] lg:hidden w-8 h-8 flex items-center justify-center rounded cursor-pointer"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              top: 'calc(var(--topbar-height) + 8px)',
            }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-cyan)' }}>
              {sidebarOpen ? 'X' : '='}
            </span>
          </button>

          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <MainPanel />

          <WidgetRail />
        </div>
      </div>
    </>
  );
}
