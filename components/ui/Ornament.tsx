import { ReactNode } from 'react';
import styles from './Ornament.module.css';

interface OrnamentProps {
  children?: ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-center' | 'bottom-center';
  className?: string;
}

export default function Ornament({ 
  children, 
  position = 'top-left',
  className = '' 
}: OrnamentProps) {
  
  const positionClass = styles[position] || styles['top-left'];
  
  return (
    <div className={`${styles.ornamentWrapper} ${positionClass} ${className}`} aria-hidden="true">
      {children ? children : (
        /* Default Fallback Floral Vector Placeholder (can be replaced with an actual theme SVG) */
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="var(--color-flower-accent)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
          <path d="M50 20 Q60 50 50 80 Q40 50 50 20Z" fill="var(--color-primary)" opacity="0.6"/>
          <path d="M20 50 Q50 60 80 50 Q50 40 20 50Z" fill="var(--color-primary)" opacity="0.6"/>
        </svg>
      )}
    </div>
  );
}
