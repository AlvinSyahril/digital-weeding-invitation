import { CountdownProps } from './types';
import { generateCalendarLink } from './utils';
import CountdownTimer from './CountdownTimer';
import styles from './Countdown.module.css';
import { SectionContainer, SectionHeader, Button, MotionFade } from '../ui';
import { localization } from '../../lib/data';

export default function Countdown({ timestamp }: CountdownProps) {
  // Use abstract generator for calendar link
  const calendarLink = generateCalendarLink('google', 'Aurelia & Julian Wedding', timestamp);

  return (
    <SectionContainer id="countdown" backgroundColor="background">
      <div className={styles.countdownSection}>
        <SectionHeader 
          title={localization.saveTheDate}
          subtitle="Count Every Second"
        />
        
        <CountdownTimer timestamp={timestamp} />
        
        <MotionFade delay={300} direction="up">
          <Button 
            as="a" 
            href={calendarLink} 
            target="_blank" 
            rel="noopener noreferrer"
            variant="primary"
          >
            Add to Calendar
          </Button>
        </MotionFade>
      </div>
    </SectionContainer>
  );
}
