'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  quotes,
  weekPlan,
  workouts,
  meals,
  getSuppSchedule,
  tips,
  sleepProtocol,
  recoverySteps,
  defaultForgeData,
  getExerciseInfo,
  intensityColors,
  type ForgeData,
  type Tip,
} from '@/config/forgeData';

type SidePanel = 'fuel' | 'supps' | 'sleep' | 'stats' | 'recovery' | 'exercise';

const sideTabs: { id: SidePanel; label: string }[] = [
  { id: 'fuel', label: 'FUEL' },
  { id: 'supps', label: 'SUPPS' },
  { id: 'sleep', label: 'SLEEP' },
  { id: 'stats', label: 'STATS' },
  { id: 'recovery', label: 'SOS' },
];

const panelAnim = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.2 },
};

export default function ForgeHealth() {
  const today = new Date();
  const dayIndex = today.getDay();

  const [selectedDay, setSelectedDay] = useState(dayIndex);
  const [sidePanel, setSidePanel] = useState<SidePanel>('fuel');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [prevPanel, setPrevPanel] = useState<SidePanel>('fuel');
  const [forgeData, setForgeData] = useState<ForgeData>(defaultForgeData);

  // Stable random values (set once on mount)
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [tip] = useState<Tip>(() => tips[Math.floor(Math.random() * tips.length)]);

  const workout = workouts[selectedDay];
  const isToday = selectedDay === dayIndex;
  const isThursday = dayIndex === 4;
  const suppSchedule = useMemo(() => getSuppSchedule(isThursday), [isThursday]);

  // Load body stats from localStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem('forge_data');
      if (cached) setForgeData(JSON.parse(cached));
    } catch { /* use defaults */ }
  }, []);

  // Derived stats
  const latest = forgeData.logs.length > 0 ? forgeData.logs[forgeData.logs.length - 1] : null;
  const currentWeight = latest ? latest.weight : forgeData.profile.startWeight;
  const currentBF = latest ? latest.bf : forgeData.profile.startBF;
  const weightChange = currentWeight - forgeData.profile.startWeight;

  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handleExerciseInfo = (exerciseName: string) => {
    if (sidePanel !== 'exercise') setPrevPanel(sidePanel);
    setSelectedExercise(exerciseName);
    setSidePanel('exercise');
  };

  const handleCloseExercise = () => {
    setSidePanel(prevPanel);
    setSelectedExercise(null);
  };

  const handleSideTab = (tab: SidePanel) => {
    setSelectedExercise(null);
    setSidePanel(tab);
  };

  // ─── SVG Weight Chart ───
  const renderChart = () => {
    const logs = forgeData.logs;
    if (logs.length < 2) {
      return (
        <div
          className="flex items-center justify-center text-[10px] font-mono"
          style={{ color: 'var(--text-tertiary)', height: 100 }}
        >
          Log more data points to see trend
        </div>
      );
    }

    const weights = logs.map(l => l.weight);
    const minW = Math.min(...weights) - 2;
    const maxW = Math.max(...weights) + 2;
    const range = maxW - minW || 1;

    const points = weights
      .map((v, i) => {
        const x = logs.length === 1 ? 50 : (i / (logs.length - 1)) * 90 + 5;
        const y = (1 - (v - minW) / range) * 80 + 10;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <div className="relative" style={{ height: 100 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <polyline
            points={points}
            fill="none"
            stroke="var(--accent-orange)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {weights.map((v, i) => {
            const x = logs.length === 1 ? 50 : (i / (logs.length - 1)) * 90 + 5;
            const y = (1 - (v - minW) / range) * 80 + 10;
            return <circle key={i} cx={x} cy={y} r="1.5" fill="var(--accent-orange)" />;
          })}
        </svg>
        <div
          className="absolute top-1 left-2 text-[9px] font-mono"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Weight trend
        </div>
        <div className="absolute bottom-1 left-2 text-[8px] font-mono" style={{ color: 'var(--text-dim)' }}>
          {logs[0].date}
        </div>
        <div className="absolute bottom-1 right-2 text-[8px] font-mono" style={{ color: 'var(--text-dim)' }}>
          {logs[logs.length - 1].date}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col font-mono">
      {/* ═══ Header ═══ */}
      <div
        className="shrink-0 flex items-center gap-3 px-4 py-1.5"
        style={{ borderBottom: '1px solid var(--window-border)' }}
      >
        {/* FORGE title */}
        <span
          className="text-base font-bold tracking-widest shrink-0"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-amber))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          FORGE
        </span>

        {/* Quote */}
        <span
          className="flex-1 text-[10px] italic truncate min-w-0"
          style={{ color: 'var(--text-tertiary)' }}
        >
          &ldquo;{quote}&rdquo;
        </span>

        {/* Quick stats */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold" style={{ color: 'var(--accent-orange)' }}>
            {currentWeight} lbs
          </span>
          <span className="text-[9px]" style={{ color: 'var(--text-dim)' }}>|</span>
          <span className="text-[10px] font-bold" style={{ color: 'var(--accent-orange)' }}>
            {currentBF}% BF
          </span>
        </div>

        {/* Date */}
        <span className="text-[10px] shrink-0" style={{ color: 'var(--text-tertiary)' }}>
          {dateStr}
        </span>
      </div>

      {/* ═══ Weekly Overview Strip ═══ */}
      <div
        className="shrink-0 flex gap-1 px-3 py-1.5"
        style={{ borderBottom: '1px solid var(--window-border)' }}
      >
        {weekPlan.map((day, i) => {
          const isSelected = i === selectedDay;
          const isDayToday = i === dayIndex;
          const accent = isDayToday ? 'var(--accent-orange)' : isSelected ? 'var(--accent-cyan)' : 'transparent';

          return (
            <button
              key={day.day}
              onClick={() => setSelectedDay(i)}
              className="flex-1 py-1 px-1 rounded cursor-pointer transition-all text-center"
              style={{
                background: isSelected
                  ? isDayToday
                    ? 'rgba(var(--accent-orange-rgb), 0.1)'
                    : 'rgba(var(--accent-cyan-rgb), 0.06)'
                  : 'var(--bg-tertiary)',
                border: `1px solid ${isSelected ? accent : 'var(--window-border)'}`,
                borderLeft: `3px solid ${intensityColors[day.intensity]}`,
                boxShadow: isSelected ? `0 0 8px ${isDayToday ? 'var(--glow-orange)' : 'var(--glow-cyan)'}` : 'none',
              }}
            >
              <div
                className="text-[9px] font-bold uppercase tracking-wide"
                style={{ color: isDayToday ? 'var(--accent-orange)' : 'var(--text-tertiary)' }}
              >
                {day.day}
              </div>
              <div
                className="text-[8px] leading-tight mt-0.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                {day.focus}
              </div>
            </button>
          );
        })}
      </div>

      {/* ═══ Main Content Area ═══ */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* ─── Workout Panel (Left) ─── */}
        <div className="flex-1 overflow-auto p-3 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Workout Title */}
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {isToday ? "Today's Workout" : workout.title.split(' \u2014 ')[0]}
                </h3>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                  style={{
                    background: 'var(--accent-orange)',
                    color: '#000',
                  }}
                >
                  {weekPlan[selectedDay].dayFull}
                </span>
                {!isToday && (
                  <span className="text-[9px] ml-auto" style={{ color: 'var(--text-tertiary)' }}>
                    (viewing)
                  </span>
                )}
              </div>

              {/* Mission Block */}
              <div
                className="rounded p-2.5 mb-3"
                style={{
                  background: 'rgba(var(--accent-cyan-rgb), 0.04)',
                  border: '1px solid rgba(var(--accent-cyan-rgb), 0.12)',
                }}
              >
                <div
                  className="text-[9px] uppercase tracking-widest font-bold mb-1"
                  style={{ color: 'var(--accent-cyan)' }}
                >
                  Mission
                </div>
                <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {workout.mission}
                </div>
                <div className="text-[10px] mt-1 leading-relaxed" style={{ color: 'var(--accent-green)' }}>
                  {workout.benefit}
                </div>
              </div>

              {/* Exercise List */}
              <ol className="space-y-0.5 pl-4 list-decimal">
                {workout.exercises.map((ex, i) => {
                  const isIndented = ex.startsWith('  ');
                  const text = isIndented ? ex.trim() : ex;
                  const info = getExerciseInfo(text);

                  return (
                    <li
                      key={i}
                      className={`text-[11px] leading-relaxed ${isIndented ? 'ml-3 list-disc' : ''}`}
                      style={{
                        color: 'var(--text-secondary)',
                        listStyleType: isIndented ? 'disc' : undefined,
                      }}
                    >
                      <span>{text}</span>
                      {info && (
                        <button
                          onClick={() => handleExerciseInfo(text)}
                          className="inline-flex items-center justify-center w-3.5 h-3.5 ml-1.5 rounded-full text-[8px] font-bold cursor-pointer transition-opacity align-middle"
                          style={{
                            color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-cyan)',
                            opacity: sidePanel === 'exercise' && selectedExercise === text ? 1 : 0.5,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                          onMouseLeave={e => {
                            if (!(sidePanel === 'exercise' && selectedExercise === text)) {
                              e.currentTarget.style.opacity = '0.5';
                            }
                          }}
                        >
                          i
                        </button>
                      )}
                    </li>
                  );
                })}
              </ol>

              {/* Workout Note */}
              {workout.note && (
                <div
                  className="mt-3 p-2 rounded-r text-[10px] leading-relaxed"
                  style={{
                    background: 'rgba(var(--accent-orange-rgb), 0.06)',
                    borderLeft: '2px solid var(--accent-orange)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {workout.note}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Side Panel (Right) ─── */}
        <div
          className="w-full md:w-[260px] lg:w-[280px] xl:w-[300px] shrink-0 flex flex-col"
          style={{ borderLeft: '1px solid var(--window-border)' }}
        >
          {/* Tab Buttons */}
          <div
            className="shrink-0 flex flex-wrap gap-1 p-1.5"
            style={{ borderBottom: '1px solid var(--window-border)' }}
          >
            {sideTabs.map(tab => {
              const isActive = sidePanel === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSideTab(tab.id)}
                  className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded cursor-pointer transition-all"
                  style={{
                    color: isActive ? 'var(--accent-orange)' : 'var(--text-tertiary)',
                    background: isActive ? 'rgba(var(--accent-orange-rgb), 0.1)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(var(--accent-orange-rgb), 0.3)' : 'transparent'}`,
                    textShadow: isActive ? '0 0 6px var(--glow-orange)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-2.5">
            <AnimatePresence mode="wait">
              {/* ── Fuel Tab ── */}
              {sidePanel === 'fuel' && (
                <motion.div key="fuel" {...panelAnim} className="space-y-2">
                  <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: 'var(--accent-orange)' }}>
                    // Daily Fuel
                  </div>
                  {meals.map((meal, i) => (
                    <div
                      key={i}
                      className="pb-2"
                      style={{ borderBottom: i < meals.length - 1 ? '1px solid var(--window-border)' : 'none' }}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-[9px] font-bold uppercase" style={{ color: 'var(--accent-amber)' }}>
                          {meal.time}
                        </span>
                        <span className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {meal.name}
                        </span>
                      </div>
                      {meal.items && (
                        <div className="text-[9px] mt-0.5 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                          {meal.items}
                        </div>
                      )}
                      {meal.supps && (
                        <div className="text-[9px] mt-0.5" style={{ color: 'var(--accent-cyan)' }}>
                          {meal.supps}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Macros Bar */}
                  <div
                    className="grid grid-cols-4 gap-1 pt-2 text-center"
                    style={{ borderTop: '1px solid var(--window-border)' }}
                  >
                    {[
                      { val: '~2,700', label: 'Cal' },
                      { val: '190g', label: 'Protein' },
                      { val: '285g', label: 'Carbs' },
                      { val: '92g', label: 'Fats' },
                    ].map(m => (
                      <div key={m.label}>
                        <div className="text-xs font-bold" style={{ color: 'var(--accent-orange)' }}>
                          {m.val}
                        </div>
                        <div className="text-[8px] uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Supplements Tab ── */}
              {sidePanel === 'supps' && (
                <motion.div key="supps" {...panelAnim} className="space-y-2">
                  <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: 'var(--accent-orange)' }}>
                    // Supplement Schedule {isThursday && <span style={{ color: 'var(--accent-purple)' }}>(Game Day)</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {suppSchedule.map((block, i) => (
                      <div
                        key={i}
                        className="p-2 rounded"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--window-border)',
                        }}
                      >
                        <div
                          className="text-[8px] font-bold uppercase tracking-wider mb-1"
                          style={{ color: 'var(--accent-amber)' }}
                        >
                          {block.title}
                        </div>
                        <ul className="space-y-0.5">
                          {block.items.map((item, j) => (
                            <li key={j} className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Sleep Tab ── */}
              {sidePanel === 'sleep' && (
                <motion.div key="sleep" {...panelAnim} className="space-y-3">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--accent-orange)' }}>
                      // Sleep Protocol
                    </div>
                    <ul className="space-y-1">
                      {sleepProtocol.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                            style={{ background: 'var(--accent-purple)' }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Tip */}
                  <div
                    className="p-2 rounded"
                    style={{
                      background: 'var(--bg-tertiary)',
                      borderLeft: '2px solid var(--accent-cyan)',
                    }}
                  >
                    <div className="text-[8px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--accent-cyan)' }}>
                      {tip.cat}
                    </div>
                    <div className="text-[10px] leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                      {tip.text}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Stats Tab ── */}
              {sidePanel === 'stats' && (
                <motion.div key="stats" {...panelAnim} className="space-y-3">
                  <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: 'var(--accent-orange)' }}>
                    // Body Stats
                  </div>

                  {/* Stat Boxes */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <div
                      className="p-2 rounded text-center"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--window-border)' }}
                    >
                      <div className="text-sm font-bold" style={{ color: 'var(--accent-orange)' }}>
                        {currentWeight}
                      </div>
                      <div className="text-[8px] uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>
                        Weight
                      </div>
                      <div className="text-[8px]" style={{ color: 'var(--text-tertiary)' }}>
                        {weightChange === 0
                          ? '\u2014'
                          : `${weightChange > 0 ? '+' : ''}${weightChange} lbs`}
                      </div>
                    </div>
                    <div
                      className="p-2 rounded text-center"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--window-border)' }}
                    >
                      <div className="text-sm font-bold" style={{ color: 'var(--accent-orange)' }}>
                        {currentBF}%
                      </div>
                      <div className="text-[8px] uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>
                        Body Fat
                      </div>
                      <div className="text-[8px]" style={{ color: 'var(--accent-green)' }}>
                        Goal: {forgeData.profile.goalBF}%
                      </div>
                    </div>
                    <div
                      className="p-2 rounded text-center"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--window-border)' }}
                    >
                      <div className="text-sm font-bold" style={{ color: 'var(--accent-orange)' }}>
                        {forgeData.logs.length}
                      </div>
                      <div className="text-[8px] uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>
                        Entries
                      </div>
                      <div className="text-[8px]" style={{ color: 'var(--text-tertiary)' }}>
                        Since Day 1
                      </div>
                    </div>
                  </div>

                  {/* Weight Chart */}
                  <div
                    className="rounded overflow-hidden"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--window-border)' }}
                  >
                    {renderChart()}
                  </div>

                  {/* Recent Logs */}
                  {forgeData.logs.length > 0 && (
                    <div>
                      <div className="text-[8px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-tertiary)' }}>
                        Recent Logs
                      </div>
                      {forgeData.logs
                        .slice(-5)
                        .reverse()
                        .map((log, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center py-1 px-2 mb-0.5 rounded text-[9px]"
                            style={{ background: 'var(--bg-tertiary)' }}
                          >
                            <span style={{ color: 'var(--text-secondary)' }}>
                              <strong>{log.weight}</strong> lbs / {log.bf}% BF
                            </span>
                            <span style={{ color: 'var(--text-dim)' }}>{log.date}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Recovery Tab ── */}
              {sidePanel === 'recovery' && (
                <motion.div key="recovery" {...panelAnim} className="space-y-3">
                  <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: 'var(--accent-orange)' }}>
                    // Recovery Mode
                  </div>

                  <div
                    className="p-2.5 rounded"
                    style={{
                      background: 'rgba(var(--accent-orange-rgb), 0.05)',
                      border: '1px solid rgba(var(--accent-orange-rgb), 0.15)',
                    }}
                  >
                    <h4 className="text-[11px] font-bold mb-2" style={{ color: 'var(--accent-orange)' }}>
                      One Rule: Next Meal, Back to Default
                    </h4>
                    <ul className="space-y-1.5">
                      {recoverySteps.map((step, i) => (
                        <li
                          key={i}
                          className="text-[10px] leading-relaxed flex items-start gap-1.5"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span className="shrink-0 mt-0.5" style={{ color: 'var(--accent-orange)' }}>
                            &bull;
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="text-[10px] text-center py-2 px-3 rounded font-semibold"
                    style={{
                      color: 'var(--accent-green)',
                      background: 'rgba(var(--accent-green-rgb), 0.05)',
                      border: '1px solid rgba(var(--accent-green-rgb), 0.15)',
                    }}
                  >
                    One bad meal in 21 is &lt;5%. You&apos;re fine.
                  </div>
                </motion.div>
              )}

              {/* ── Exercise Info Panel ── */}
              {sidePanel === 'exercise' && selectedExercise && (
                <motion.div key="exercise" {...panelAnim} className="space-y-3">
                  {/* Back button */}
                  <button
                    onClick={handleCloseExercise}
                    className="text-[9px] uppercase tracking-wider cursor-pointer transition-colors"
                    style={{ color: 'var(--accent-cyan)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent-magenta)';
                      e.currentTarget.style.textShadow = '0 0 6px var(--glow-magenta)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--accent-cyan)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    &lt; Back
                  </button>

                  <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: 'var(--accent-orange)' }}>
                    // Exercise Detail
                  </div>

                  <h4 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    {selectedExercise}
                  </h4>

                  {(() => {
                    const info = getExerciseInfo(selectedExercise);
                    if (!info) return null;
                    return (
                      <div className="space-y-3">
                        <div
                          className="p-2.5 rounded"
                          style={{
                            background: 'var(--bg-tertiary)',
                            borderLeft: '2px solid var(--accent-cyan)',
                          }}
                        >
                          <div className="text-[8px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--accent-cyan)' }}>
                            Form
                          </div>
                          <div className="text-[10px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {info.form}
                          </div>
                        </div>

                        <div
                          className="p-2.5 rounded"
                          style={{
                            background: 'var(--bg-tertiary)',
                            borderLeft: '2px solid var(--accent-green)',
                          }}
                        >
                          <div className="text-[8px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--accent-green)' }}>
                            Why It Matters
                          </div>
                          <div className="text-[10px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {info.tip}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
