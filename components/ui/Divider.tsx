import styles from './Divider.module.css';

interface DividerProps {
  className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
  return (
    <div className={`${styles.dividerContainer} ${className}`} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.diamond} />
      <span className={styles.line} />
    </div>
  );
}
