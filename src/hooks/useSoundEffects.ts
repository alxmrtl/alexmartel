'use client';

import { useCallback, useRef } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

type SoundType = 'click' | 'open' | 'close' | 'minimize' | 'maximize' | 'error' | 'startup' | 'navigate';

function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  volume: number = 0.06
) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

function playClick(ctx: AudioContext) {
  playTone(ctx, 800, 0.03, 'square', 0.03);
}

function playOpen(ctx: AudioContext) {
  playTone(ctx, 440, 0.08, 'sawtooth', 0.05);
  setTimeout(() => playTone(ctx, 660, 0.08, 'square', 0.04), 60);
}

function playClose(ctx: AudioContext) {
  playTone(ctx, 660, 0.06, 'square', 0.04);
  setTimeout(() => playTone(ctx, 330, 0.1, 'sawtooth', 0.03), 60);
}

function playMinimize(ctx: AudioContext) {
  playTone(ctx, 520, 0.05, 'square', 0.03);
  setTimeout(() => playTone(ctx, 360, 0.06, 'square', 0.02), 50);
}

function playMaximize(ctx: AudioContext) {
  playTone(ctx, 360, 0.05, 'square', 0.03);
  setTimeout(() => playTone(ctx, 520, 0.06, 'square', 0.02), 50);
}

function playError(ctx: AudioContext) {
  playTone(ctx, 200, 0.12, 'sawtooth', 0.06);
  setTimeout(() => playTone(ctx, 160, 0.15, 'sawtooth', 0.06), 150);
}

function playNavigate(ctx: AudioContext) {
  playTone(ctx, 600, 0.06, 'square', 0.03);
  setTimeout(() => playTone(ctx, 900, 0.05, 'square', 0.02), 40);
}

// Arpeggiated synth chord (ascending): C4 → E4 → G4 → C5
function playStartup(ctx: AudioContext) {
  const notes = [
    { freq: 261.63, delay: 0 },     // C4
    { freq: 329.63, delay: 120 },    // E4
    { freq: 392.00, delay: 240 },    // G4
    { freq: 523.25, delay: 360 },    // C5
  ];

  notes.forEach(({ freq, delay }) => {
    setTimeout(() => {
      playTone(ctx, freq, 1.0, 'sawtooth', 0.06);
      playTone(ctx, freq, 1.2, 'square', 0.03);
    }, delay);
  });
}

export function useSoundEffects() {
  const soundEnabled = useSettingsStore(state => state.soundEnabled);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((sound: SoundType) => {
    if (!soundEnabled) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    switch (sound) {
      case 'click':
        playClick(ctx);
        break;
      case 'open':
        playOpen(ctx);
        break;
      case 'close':
        playClose(ctx);
        break;
      case 'minimize':
        playMinimize(ctx);
        break;
      case 'maximize':
        playMaximize(ctx);
        break;
      case 'error':
        playError(ctx);
        break;
      case 'startup':
        playStartup(ctx);
        break;
      case 'navigate':
        playNavigate(ctx);
        break;
    }
  }, [soundEnabled, getAudioContext]);

  return { playSound };
}
