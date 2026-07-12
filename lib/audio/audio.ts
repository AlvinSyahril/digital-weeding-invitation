"use client";

import { createContext, useContext } from 'react';

export type AudioState = 'idle' | 'loading' | 'blocked' | 'playing' | 'paused';

export interface AudioContextType {
  state: AudioState;
  volume: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
