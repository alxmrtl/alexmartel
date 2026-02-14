'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  'INITIALIZING SYSTEM...',
  'LOADING NEURAL INTERFACE...',
  'ESTABLISHING SECURE LINK...',
  'MOUNTING CONTROL PANEL...',
  'CALIBRATING DISPLAY MATRIX...',
  'SYSTEM READY.',
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [showName, setShowName] = useState(false);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    const soundTimer = setTimeout(() => {
      playSound('startup');
    }, 300);

    // Type out boot messages one by one
    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, msg]);
      }, 200 + i * 350);
    });

    // Show name with glitch after messages
    setTimeout(() => {
      setShowName(true);
    }, 200 + bootMessages.length * 350 + 200);

    // Start exit
    const exitTimer = setTimeout(() => {
      setVisible(false);
    }, 200 + bootMessages.length * 350 + 1200);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(exitTimer);
    };
  }, [playSound]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex: 99999,
            background: 'var(--bg-primary)',
          }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255, 0.02) 2px, rgba(0, 229, 255, 0.02) 4px)',
              zIndex: 1,
            }}
          />

          {/* Terminal messages */}
          <div className="relative z-10 w-full max-w-md px-8 mb-8">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                className="text-xs font-mono mb-1"
                style={{
                  color: i === lines.length - 1 && line === 'SYSTEM READY.'
                    ? '#00ff9d'
                    : '#4a5580',
                  fontFamily: 'var(--font-mono)',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                <span style={{ color: '#2d3460' }}>&gt; </span>
                {line}
              </motion.div>
            ))}
          </div>

          {/* Name — with glitch effect */}
          <AnimatePresence>
            {showName && (
              <motion.h1
                className="text-4xl font-bold tracking-[0.3em] uppercase text-center relative z-10"
                style={{
                  color: '#00e5ff',
                  fontFamily: 'var(--font-display)',
                  textShadow: '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.2)',
                  animation: 'textGlitch 0.3s ease-in-out 1',
                }}
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                Alex Martel
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence>
            {showName && (
              <motion.p
                className="text-xs tracking-[0.2em] mt-3 uppercase relative z-10"
                style={{
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                developer &middot; architect &middot; flow engineer
              </motion.p>
            )}
          </AnimatePresence>

          {/* Progress bar — neon cyan with glow */}
          <div className="mt-8 w-48 h-0.5 relative z-10" style={{ background: 'var(--bg-tertiary)' }}>
            <div
              className="h-full"
              style={{
                background: '#00e5ff',
                boxShadow: '0 0 12px rgba(0, 229, 255, 0.6), 0 0 24px rgba(0, 229, 255, 0.3)',
                animation: `progress-line ${0.2 + bootMessages.length * 0.35 + 1.0}s ease-out forwards`,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
