"use client";

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { LightboxProps } from './types';
import styles from './Gallery.module.css';

/**
 * Pure "Dumb" Modal Component.
 * Receives images, active index, and navigation callbacks.
 */
export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // Focus Trap & Keyboard Navigation Refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // Body Scroll Lock & Event Listeners
  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'Tab') {
        // Focus Trap implementation
        const focusableElements = [closeBtnRef.current, prevBtnRef.current, nextBtnRef.current].filter(Boolean) as HTMLElement[];
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus into modal for A11y
    closeBtnRef.current?.focus();

    return () => {
      // Unlock body scroll
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  // Safety constraint: Never render empty lightbox
  if (!images || images.length === 0) {
    return null;
  }

  const currentImageUrl = images[currentIndex];

  if (!mounted) return null;

  return createPortal(
    <div 
      className={styles.lightboxOverlay}
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <button 
        ref={closeBtnRef}
        className={styles.closeButton} 
        onClick={onClose}
        aria-label="Close gallery"
      >
        ✕
      </button>

      <button 
        ref={prevBtnRef}
        className={`${styles.navButton} ${styles.navPrev}`} 
        onClick={onPrevious}
        aria-label="Previous image"
      >
        ❮
      </button>

      <div className={styles.lightboxContent}>
        <div className={styles.lightboxImageWrapper}>
          <Image
            src={currentImageUrl}
            alt={`Gallery image ${currentIndex + 1} of ${images.length}`}
            fill
            className={styles.lightboxImage}
            sizes="100vw"
            quality={90}
            priority // Image inside opened modal should load immediately
          />
        </div>
      </div>

      <button 
        ref={nextBtnRef}
        className={`${styles.navButton} ${styles.navNext}`} 
        onClick={onNext}
        aria-label="Next image"
      >
        ❯
      </button>
    </div>,
    document.body
  );
}
