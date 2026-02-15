'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import LivingCanvas from '../canvas/LivingCanvas';
import BootSequence from './BootSequence';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import WidgetRail from '../widgets/WidgetRail';
import ConfigWidget from '../widgets/ConfigWidget';

export default function DashboardShell() {
  const [showBoot, setShowBoot] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

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

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => {
      const next = !prev;
      if (next) setConfigOpen(false);
      return next;
    });
  }, []);

  const handleConfigToggle = useCallback(() => {
    setConfigOpen(prev => {
      const next = !prev;
      if (next) setSidebarOpen(false);
      return next;
    });
  }, []);

  if (!isHydrated) {
    return <div className="h-screen w-screen" style={{ background: '#050510' }} />;
  }

  return (
    <>
      {showBoot && <BootSequence onComplete={handleBootComplete} />}

      {/* Starry background — full viewport */}
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: '#050510' }}>
        <div className="starry-bg" />

        {/* OS Window Container */}
        <div className="os-window" style={{ background: 'var(--bg-primary)' }}>
          {/* OS Title Bar */}
          <div className="os-titlebar">
            <span className="os-titlebar-title">Alex Martel OS</span>
          </div>

          {/* Inner content area — zoom scales content while window frame stays fixed */}
          <div className="relative flex-1 flex flex-col overflow-hidden" style={{ zoom: 'var(--ui-scale)' }}>
            {/* Living Canvas — animated background */}
            <LivingCanvas />

            {/* Top Bar */}
            <TopBar onConfigToggle={handleConfigToggle} configOpen={configOpen} />

            {/* Main layout: Sidebar + MainPanel + WidgetRail */}
            <div
              className="dashboard-layout flex flex-1 min-h-0 relative"
              style={{
                zIndex: 1,
                gap: 'var(--section-gap)',
                padding: 'var(--section-gap)',
                paddingTop: 0,
              }}
            >
              {/* Mobile hamburger */}
              <button
                className="absolute top-2 left-2 z-[60] lg:hidden w-8 h-8 flex items-center justify-center rounded cursor-pointer"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(var(--accent-cyan-rgb), 0.3)',
                }}
                onClick={handleSidebarToggle}
                aria-label="Toggle navigation"
              >
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-cyan)' }}>
                  {sidebarOpen ? 'X' : '='}
                </span>
              </button>

              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

              <MainPanel />

              <WidgetRail />

              {/* Config Drawer (small screens — visible below xl) */}
              {configOpen && (
                <div
                  className="absolute inset-0 bg-black/50 z-40 xl:hidden"
                  onClick={() => setConfigOpen(false)}
                />
              )}
              <div
                className={`absolute top-0 right-0 h-full z-50 xl:hidden transition-transform duration-300
                  ${configOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{
                  width: '280px',
                  background: 'var(--bg-secondary)',
                  borderLeft: '1px solid rgba(var(--accent-cyan-rgb), 0.15)',
                }}
              >
                <div className="p-3 overflow-auto h-full">
                  <ConfigWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
