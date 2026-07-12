import Image from 'next/image';
import { FooterProps } from './types';
import { FOOTER_ANIMATION } from './constants';
import styles from './Footer.module.css';
import { MotionFade, Ornament } from '../ui';

export default function Footer({ brideName, groomName, logo }: FooterProps) {
  return (
    <footer className={styles.footer} role="contentinfo">
      <Ornament position="top-center" />

      {logo && (
        <MotionFade direction="up" delay={FOOTER_ANIMATION.STAGGER}>
          <div className={styles.logoWrapper}>
            <Image src={logo} alt="Monogram" width={80} height={80} className={styles.logoImage} />
          </div>
        </MotionFade>
      )}

      <MotionFade direction="up" delay={FOOTER_ANIMATION.STAGGER * 2}>
        <div className={styles.thankYouText}>Thank You</div>
      </MotionFade>

      <MotionFade direction="up" delay={FOOTER_ANIMATION.STAGGER * 2}>
        <div className={styles.divider} aria-hidden="true" />
      </MotionFade>

      <MotionFade direction="up" delay={FOOTER_ANIMATION.STAGGER * 3}>
        <h2 className={styles.coupleNames}>
          {brideName} & {groomName}
        </h2>
      </MotionFade>

      <div className={styles.credits}>
        Made by <a href="https://nexorastudio.my.id" target="_blank" rel="noopener noreferrer" aria-label="Nexora Studio Website">Nexora Studio</a> | <a href="https://instagram.com/vinnssmokee" target="_blank" rel="noopener noreferrer" aria-label="Instagram @vinnssmokee">@vinnssmokee</a>
      </div>
    </footer>
  );
}
