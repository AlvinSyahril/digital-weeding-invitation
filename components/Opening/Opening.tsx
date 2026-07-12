"use client";

import { useState, useEffect } from 'react';
import { OpeningOverlayProps, OpeningState } from './types';
import Envelope from './Envelope';
import styles from './Opening.module.css';

export default function Opening({ guestName }: OpeningOverlayProps) {
  const [openingState, setOpeningState] = useState<OpeningState>('idle');

  // Handle scroll locking and cleanup
  useEffect(() => {
    if (openingState !== 'completed') {
      document.body.style.overflow = 'hidden';
      document.body.classList.remove('invitation-opened');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.add('invitation-opened');
      window.dispatchEvent(new Event('invitationOpened'));
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openingState]);

  const handleOpen = () => {
    if (openingState !== 'idle') return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setOpeningState('revealingInvitation');
      setTimeout(() => {
        document.querySelector('main')?.classList.add('main-revealed');
        setOpeningState('completed');
        window.dispatchEvent(new Event('invitation:opened'));
      }, 500);
      return;
    }
    
    // Normal Cinematic Sequence (3.5s)
    
    // 0ms: Break Seal
    setOpeningState('breakingSeal');
    
    // 350ms: Open Flap
    setTimeout(() => {
      setOpeningState('openingEnvelope');
    }, 350);
    
    // 1050ms: Reveal Letter
    setTimeout(() => {
      setOpeningState('revealingLetter');
    }, 1050);
    
    // 1850ms: Hold Focus
    setTimeout(() => {
      setOpeningState('holdingFocus');
    }, 1850);
    
    // 2350ms: Natural Light Reveal
    setTimeout(() => {
      setOpeningState('naturalLightReveal');
    }, 2350);
    
    // 2650ms: Reveal Invitation Overlay
    setTimeout(() => {
      setOpeningState('revealingInvitation');
      // Trigger Hero reveal concurrently with the envelope sliding away
      document.querySelector('main')?.classList.add('main-revealed');
    }, 2650);
    
    // 3150ms: Play music (500ms after Hero starts revealing)
    setTimeout(() => {
      window.dispatchEvent(new Event('invitation:opened'));
    }, 3150);
    
    // 3500ms: Completed
    setTimeout(() => {
      setOpeningState('completed');
    }, 3500);
  };

  if (openingState === 'completed') return null;

  const isExiting = openingState === 'revealingInvitation';
  const isAnimating = openingState !== 'idle';

  return (
    <div className={`${styles.overlay} ${isExiting ? styles.overlayExit : ''} ${isAnimating ? styles.overlayAnimating : ''} invitation-opened-guard`}>
      <Envelope 
        openingState={openingState} 
        guestName={guestName} 
        onOpen={handleOpen} 
      />
      
      <div className={`${styles.tapIndicator} ${openingState !== 'idle' ? styles.tapIndicatorHidden : ''}`}>
        Tap to Open
      </div>
    </div>
  );
}
