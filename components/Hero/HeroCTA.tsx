"use client";

import styles from './Hero.module.css';

interface HeroCTAProps {
  onOpen?: () => void;
}

export default function HeroCTA({ onOpen }: HeroCTAProps) {
  return (
    <button 
      className={styles.ctaButton} 
      aria-label="Open Invitation"
      onClick={onOpen}
    >
      Open Invitation
    </button>
  );
}
