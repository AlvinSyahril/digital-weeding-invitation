import { TimelineItemData } from './types';
import styles from './LoveStory.module.css';

/**
 * Pure UI Component (Zero Business Logic).
 * Simply displays one point in the timeline.
 */
export default function TimelineItem({
  label,
  title,
  description
}: Omit<TimelineItemData, 'id'>) {
  return (
    <>
      <div className={styles.timelineDot} aria-hidden="true" />
      <div className={styles.itemContent}>
        <span className={styles.label}>{label}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </>
  );
}
