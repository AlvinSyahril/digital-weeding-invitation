import { ReactNode } from 'react';
import styles from './SectionContainer.module.css';

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  backgroundColor?: 'surface' | 'background';
}

export default function SectionContainer({ 
  children, 
  id, 
  className = '', 
  backgroundColor = 'background' 
}: SectionContainerProps) {
  
  const bgClass = backgroundColor === 'surface' ? styles.bgSurface : styles.bgBackground;
  
  return (
    <section id={id} className={`${styles.section} ${bgClass} ${className}`}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
}
