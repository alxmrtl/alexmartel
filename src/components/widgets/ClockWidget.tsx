'use client';

import { useState, useEffect } from 'react';
import PanelFrame from '../dashboard/PanelFrame';

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setColonVisible(prev => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).toUpperCase();

  return (
    <PanelFrame title="Clock" icon="[CLK]">
      <div className="text-center py-1">
        <div
          className="text-2xl font-bold tracking-[0.15em]"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--accent-cyan)',
            textShadow: '0 0 15px var(--glow-cyan)',
          }}
        >
          {hours}
          <span style={{ opacity: colonVisible ? 1 : 0.3 }}>:</span>
          {minutes}
          <span className="text-base ml-1" style={{ color: 'var(--accent-cyan)', opacity: 0.6 }}>{seconds}</span>
        </div>
        <div
          className="text-[10px] font-mono tracking-wider mt-1"
          style={{ color: 'var(--text-dim)' }}
        >
          {dateStr}
        </div>
      </div>
    </PanelFrame>
  );
}
