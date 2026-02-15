'use client';

import ClockWidget from './ClockWidget';
import ConfigWidget from './ConfigWidget';
import QuickLinksWidget from './QuickLinksWidget';
import MiniProfileWidget from './MiniProfileWidget';

export default function WidgetRail() {
  return (
    <aside
      className="dashboard-widget-rail shrink-0 hidden xl:flex flex-col gap-3 p-3 overflow-auto"
      style={{
        width: 'var(--widget-rail-width)',
        borderLeft: '1px solid rgba(var(--accent-cyan-rgb), 0.15)',
        background: 'rgba(10, 10, 26, 0.5)',
      }}
    >
      <ClockWidget />
      <ConfigWidget />
      <QuickLinksWidget />
      <MiniProfileWidget />
    </aside>
  );
}
