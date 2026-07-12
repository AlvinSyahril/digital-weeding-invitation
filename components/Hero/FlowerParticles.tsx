"use client";

import { useEffect, useState } from 'react';
import styles from './FlowerParticles.module.css';

interface Particle {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  colorType: 'blue' | 'gold' | 'lightBlue';
}

export default function FlowerParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const particleCount = 20;
    const colors: ('blue' | 'gold' | 'lightBlue')[] = ['blue', 'gold', 'lightBlue', 'blue', 'lightBlue'];
    
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${12 + Math.random() * 20}s`,
      animationDelay: `-${Math.random() * 20}s`,
      size: `${8 + Math.random() * 14}px`,
      colorType: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className={styles.particleContainer}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`${styles.petal} ${styles[p.colorType]}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
          }}
        />
      ))}
    </div>
  );
}
