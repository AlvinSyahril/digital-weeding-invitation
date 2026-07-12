import { EventCardData } from './types';
import styles from './Event.module.css';
import { Card, Button } from '../ui';

/**
 * Pure UI Component (Zero Business Logic).
 * Simply displays the provided event details.
 */
export default function EventCard({
  title,
  time,
  venue,
  address,
  navigationUrl
}: Omit<EventCardData, 'id'>) {
  return (
    <div className={styles.eventCardContent}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.time}>{time}</p>
      
      <div className={styles.locationBlock}>
        <span className={styles.venue}>{venue}</span>
        <span className={styles.address}>{address}</span>
      </div>
      
      {navigationUrl && (
        <div className={styles.mapAction}>
          <a
            href={navigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
            aria-label={`Open map for ${title}`}
          >
            VIEW MAP ➔
          </a>
        </div>
      )}
    </div>
  );
}
