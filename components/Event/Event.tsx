import { EventProps } from './types';
import { EVENT_ANIMATION } from './constants';
import EventCard from './EventCard';
import styles from './Event.module.css';
import { SectionContainer, SectionHeader, MotionFade } from '../ui';

export default function Event({ events }: EventProps) {
  // Graceful Empty State handling
  if (!events || events.length === 0) {
    return (
      <SectionContainer id="event" backgroundColor="surface">
        <SectionHeader title="Wedding Events" subtitle="Join Us At" />
        <div className={styles.emptyState}>
          Event details will be announced soon.
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="event" backgroundColor="surface">
      <div className={styles.eventSection}>
        <SectionHeader title="Wedding Events" subtitle="Join Us At" />
        
        <div className={styles.eventsGrid}>
          {events.map((eventData, index) => (
            <MotionFade 
              key={eventData.id} 
              direction="up" 
              delay={index * EVENT_ANIMATION.STAGGER}
            >
              <EventCard
                title={eventData.title}
                time={eventData.time}
                venue={eventData.venue}
                address={eventData.address}
                navigationUrl={eventData.navigationUrl}
              />
            </MotionFade>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
