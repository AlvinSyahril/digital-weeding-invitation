import { CoupleProps } from './types';
import { COUPLE_ANIMATION } from './constants';
import PersonCard from './PersonCard';
import styles from './Couple.module.css';
import { SectionContainer, SectionHeader, Divider, Ornament } from '../ui';

export default function Couple({ bride, groom }: CoupleProps) {
  return (
    <SectionContainer id="couple" backgroundColor="surface">
      <Ornament position="top-left" />
      <Ornament position="bottom-right" />
      
      <div className={styles.coupleContainer}>
        <SectionHeader 
          title="The Happy Couple" 
          subtitle="Meet"
        />
        
        <div className={styles.cardsWrapper}>
          <PersonCard 
            person={bride} 
            role="Bride" 
            delay={COUPLE_ANIMATION.DELAY_BRIDE} 
          />
          
          {/* Divider appears passively without specific internal stagger delay, but we wrap it in MotionFade if we want it to animate with the flow.
              Since it's between Bride and Groom in DOM but Flex handles layout, let's just render it directly. */}
          <Divider />
          
          <PersonCard 
            person={groom} 
            role="Groom" 
            delay={COUPLE_ANIMATION.DELAY_GROOM} 
          />
        </div>
      </div>
    </SectionContainer>
  );
}
