import { RSVP_ANIMATION } from './constants';
import RSVPForm from './RSVPForm';
import styles from './RSVP.module.css';
import { SectionContainer, SectionHeader, MotionFade, Ornament } from '../ui';
import { localization } from '../../lib/data';

export default function RSVP() {
  return (
    <SectionContainer id="rsvp" backgroundColor="surface">
      <Ornament position="top-right" />
      
      <div className={styles.rsvpSection}>
        <SectionHeader title="RSVP" subtitle="Are You Attending?" />
        
        <div className={styles.rsvpWrapper}>
          <MotionFade direction="up" delay={RSVP_ANIMATION.STAGGER}>
            <RSVPForm />
          </MotionFade>
        </div>
      </div>
      
      <Ornament position="bottom-left" />
    </SectionContainer>
  );
}
