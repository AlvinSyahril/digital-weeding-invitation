"use client";

import { useEffect, useRef, useState, ReactNode } from 'react';
import styles from './MotionFade.module.css';

interface MotionFadeProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number; // ms
  className?: string;
}

export default function MotionFade({ 
  children, 
  direction = 'up',
  delay = 0,
  className = ''
}: MotionFadeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isReduced, setIsReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);

    let hasIntersected = false;

    const tryReveal = () => {
      // If it's intersecting AND the invitation is opened (or if there's no opening screen), then reveal
      if (hasIntersected && (document.body.classList.contains('invitation-opened') || !document.querySelector('.invitation-opened-guard'))) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasIntersected = true;
          tryReveal();
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    window.addEventListener('invitationOpened', tryReveal);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      window.removeEventListener('invitationOpened', tryReveal);
    };
  }, []);

  const directionClass = isVisible ? styles.visible : styles[`hidden-${direction}`];
  
  // Strip out delays for reduced motion to ensure rapid feedback
  const appliedDelay = isReduced ? 0 : delay;
  
  return (
    <div 
      ref={ref} 
      className={`${styles.motionWrapper} ${directionClass} ${className}`}
      style={{ transitionDelay: `${appliedDelay}ms` }}
    >
      {children}
    </div>
  );
}
