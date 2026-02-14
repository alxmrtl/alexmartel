'use client';

import { useState, useEffect } from 'react';
import PanelFrame from '../dashboard/PanelFrame';

interface Metric {
  label: string;
  value: number;
  color: string;
  glow: string;
}

export default function StatusWidget() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'SYS', value: 92, color: 'var(--accent-green)', glow: 'var(--glow-green)' },
    { label: 'NET', value: 87, color: 'var(--accent-cyan)', glow: 'var(--glow-cyan)' },
    { label: 'MEM', value: 64, color: 'var(--accent-amber)', glow: 'var(--glow-amber)' },
    { label: 'CPU', value: 45, color: 'var(--accent-magenta)', glow: 'var(--glow-magenta)' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev =>
        prev.map(m => ({
          ...m,
          value: Math.min(100, Math.max(20, m.value + (Math.random() - 0.5) * 8)),
        }))
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PanelFrame title="System Status" icon="[STS]" accentColor="var(--accent-green)" glowColor="var(--glow-green)">
      <div className="space-y-2.5">
        {metrics.map(metric => (
          <div key={metric.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: metric.color }}>
                {metric.label}
              </span>
              <span className="text-[10px] font-mono" style={{ color: 'var(--text-dim)' }}>
                {Math.round(metric.value)}%
              </span>
            </div>
            <div className="h-1 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${metric.value}%`,
                  background: metric.color,
                  boxShadow: `0 0 6px ${metric.glow}`,
                  transition: 'width 1s ease-out',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}
