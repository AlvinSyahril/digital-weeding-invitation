import Image from 'next/image';
import { clientAssets } from '../../lib/clientAssets';
import GuestGreeting from './GuestGreeting';
import styles from './Opening.module.css';
import { OpeningState } from './types';
import { localization } from '../../lib/data';

interface LetterProps {
  guestName?: string;
  openingState: OpeningState;
}

export default function Letter({ guestName, openingState }: LetterProps) {
  const isRevealed = openingState === 'revealingLetter' || 
                     openingState === 'holdingFocus' || 
                     openingState === 'naturalLightReveal' || 
                     openingState === 'revealingInvitation';
                     
  const hasNaturalLight = openingState === 'naturalLightReveal' || 
                          openingState === 'revealingInvitation';

  return (
    <div className={`${styles.letter} ${isRevealed ? styles.letterRevealed : ''}`}>
      <div className={styles.letterContent}>
        <div className={styles.monogram}>
          {clientAssets.logo && (
            <Image 
              src={clientAssets.logo} 
              alt="Wedding Monogram" 
              width={64} 
              height={64} 
              priority
            />
          )}
        </div>
        
        <p className={styles.theWeddingOf}>{localization.theWeddingOf}</p>
        <h1 className={styles.brideGroom}>Hanief & Dwi</h1>
        
        <div className={styles.divider}></div>
        
        <GuestGreeting guestName={guestName} />
        
      </div>
      
      {/* Natural Light Reveal effect */}
      <div className={`${styles.naturalLight} ${hasNaturalLight ? styles.naturalLightActive : ''}`}></div>
    </div>
  );
}
