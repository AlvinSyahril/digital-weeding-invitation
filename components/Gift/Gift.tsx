import { GiftProps } from './types';
import { GIFT_ANIMATION } from './constants';
import BankCard from './BankCard';
import styles from './Gift.module.css';
import { SectionContainer, SectionHeader, MotionFade } from '../ui';
import { localization } from '../../lib/data';

export default function Gift({ gift }: GiftProps) {
  // Empty State: if gift is null or banks array is empty/missing
  if (!gift || !gift.banks || gift.banks.length === 0) {
    return (
      <SectionContainer id="gift" backgroundColor="background">
        <SectionHeader title={localization.gift} subtitle="Send a Blessing" />
        <div className={styles.emptyState}>
          No gift information available at the moment.
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="gift" backgroundColor="background">
      <div className={styles.giftSection}>
        <SectionHeader title={gift.title} subtitle="Send a Blessing" />
        
        {gift.description && (
          <MotionFade direction="up" delay={100}>
            <p className={styles.description}>{gift.description}</p>
          </MotionFade>
        )}
        
        <div className={styles.banksGrid}>
          {gift.banks.map((bank, index) => (
            <MotionFade 
              key={`${bank.name}-${bank.account}`} 
              direction="up" 
              delay={(index + 1) * GIFT_ANIMATION.STAGGER}
            >
              <BankCard
                name={bank.name}
                account={bank.account}
                recipient={bank.recipient}
              />
            </MotionFade>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
