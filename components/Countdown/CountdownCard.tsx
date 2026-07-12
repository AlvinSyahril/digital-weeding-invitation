import { CountdownCardProps } from './types';
import styles from './Countdown.module.css';

/**
 * A stable card representing one piece of the countdown (e.g. 45 Days)
 * Receives the formatted value and label. 
 * Rendering is kept minimal to reduce overhead.
 */
export default function CountdownCard({ value, label }: CountdownCardProps) {
  return (
    <div className={styles.countdownCard} aria-hidden="true">
      <span className={styles.number}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
