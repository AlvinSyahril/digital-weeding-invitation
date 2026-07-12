import styles from './Opening.module.css';
import WaxSeal from './WaxSeal';
import Letter from './Letter';
import { OpeningState } from './types';
import { localization } from '../../lib/data';

interface EnvelopeProps {
  openingState: OpeningState;
  guestName?: string;
  onOpen: () => void;
}

export default function Envelope({ openingState, guestName, onOpen }: EnvelopeProps) {
  const isSealBroken = openingState !== 'idle';
  const isFlapOpen = openingState !== 'idle' && openingState !== 'breakingSeal';

  return (
    <div 
      className={`${styles.envelopeContainer} ${openingState === 'idle' ? styles.envelopeClickable : ''}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onOpen();
        }
      }}
      aria-label={localization.openInvitation}
    >
      <div className={styles.envelopeWrapper}>
        {/* Shadow layer for the whole envelope */}
        <div className={styles.envelopeShadow}></div>
        
        {/* Back layer (inside of the envelope) */}
        <div className={styles.envelopeBack}></div>
        
        {/* Letter (slides out from pocket) */}
        <Letter guestName={guestName} openingState={openingState} />
        
        {/* Front Pocket (covers the lower half of the letter) */}
        <div className={styles.envelopePocket}></div>
        
        {/* Flap (covers the top half initially) */}
        <div className={`${styles.envelopeFlap} ${isFlapOpen ? styles.envelopeFlapOpen : ''}`}></div>
        
        {/* Wax Seal (holds flap down) */}
        <WaxSeal isBroken={isSealBroken} />
      </div>
    </div>
  );
}
