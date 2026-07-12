"use client";

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { AudioContext, AudioState } from '../../lib/audio';
import { fadeVolume, easeInOutSine, easeOutCubic } from '../../lib/audio/fade';
import { AUDIO_CONSTANTS } from '../../lib/audio/constants';
import AudioPlayer from './AudioPlayer';
import AudioButton from './AudioButton';
import CourtesyToast from './CourtesyToast';
import styles from './Audio.module.css';

import { clientAssets } from '../../lib/clientAssets';

interface AudioProviderProps {
  children: ReactNode;
}

export default function AudioProvider({ children }: AudioProviderProps) {
  const [state, setState] = useState<AudioState>('idle');
  const [volume, setVolume] = useState(0); // Actual volume for context
  const [showCourtesy, setShowCourtesy] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeCancelRef = useRef<(() => void) | null>(null);
  const courtesyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const hasMusic = !!clientAssets.music;

  // Track if we ever successfully played (for the courtesy toast)
  const hasEverPlayedRef = useRef(false);

  // Initialize from session storage for mute preference
  useEffect(() => {
    try {
      const savedMutePref = sessionStorage.getItem('wedding-audio-muted');
      if (savedMutePref === 'true') {
        // If they muted it previously, we shouldn't autoplay on invitation:opened
        // We just stay idle/paused when triggered.
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const handlePlaySuccess = useCallback(() => {
    setState('playing');
    
    // Show courtesy toast ONLY on first successful playback
    if (!hasEverPlayedRef.current) {
      hasEverPlayedRef.current = true;
      setShowCourtesy(true);
      
      courtesyTimeoutRef.current = setTimeout(() => {
        setShowCourtesy(false);
      }, AUDIO_CONSTANTS.COURTESY_DURATION);
    }
  }, []);

  const performFade = useCallback((from: number, to: number, duration: number, onComplete?: () => void) => {
    if (fadeCancelRef.current) {
      fadeCancelRef.current();
    }
    
    fadeCancelRef.current = fadeVolume({
      from,
      to,
      duration,
      easing: to > from ? easeInOutSine : easeOutCubic,
      onUpdate: (val) => {
        setVolume(val);
        if (audioRef.current) {
          audioRef.current.volume = val;
        }
      },
      onComplete: () => {
        fadeCancelRef.current = null;
        if (onComplete) onComplete();
      }
    });
  }, []);

  const play = useCallback(() => {
    if (!hasMusic || !audioRef.current) return;
    
    const audioEl = audioRef.current;
    setState('loading');
    
    // Always check for reduced motion to skip long fades
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fadeDuration = prefersReducedMotion ? 180 : AUDIO_CONSTANTS.FADE_IN_DURATION;
    
    audioEl.play()
      .then(() => {
        handlePlaySuccess();
        performFade(audioEl.volume, AUDIO_CONSTANTS.DEFAULT_VOLUME, fadeDuration);
        sessionStorage.setItem('wedding-audio-muted', 'false');
      })
      .catch((err) => {
        console.warn("Autoplay prevented:", err);
        setState('blocked');
      });
  }, [handlePlaySuccess, performFade]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fadeDuration = prefersReducedMotion ? 180 : AUDIO_CONSTANTS.FADE_OUT_DURATION;
    
    performFade(audioRef.current.volume, 0, fadeDuration, () => {
      audioRef.current?.pause();
      setState('paused');
      sessionStorage.setItem('wedding-audio-muted', 'true');
    });
  }, [performFade]);

  const toggle = useCallback(() => {
    if (state === 'playing') {
      pause();
    } else {
      play();
    }
  }, [state, play, pause]);

  // Listen for the envelope opening event
  useEffect(() => {
    const handleInvitationOpened = () => {
      // Check if user previously muted intentionally
      const isMuted = sessionStorage.getItem('wedding-audio-muted') === 'true';
      
      if (!isMuted) {
        // We start with 0 volume
        if (audioRef.current) audioRef.current.volume = 0;
        setVolume(0);
        play();
      } else {
        setState('paused');
      }
    };

    window.addEventListener('invitation:opened', handleInvitationOpened);
    return () => window.removeEventListener('invitation:opened', handleInvitationOpened);
  }, [play]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (courtesyTimeoutRef.current) clearTimeout(courtesyTimeoutRef.current);
      if (fadeCancelRef.current) fadeCancelRef.current();
    };
  }, []);

  const contextValue = {
    state,
    volume,
    play,
    pause,
    toggle
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
      {hasMusic && (
        <>
          <AudioPlayer ref={audioRef} />
          <div className={styles.audioControlsWrapper}>
            {showCourtesy && <CourtesyToast />}
            {state !== 'idle' && <AudioButton />}
          </div>
        </>
      )}
    </AudioContext.Provider>
  );
}
