import Image from 'next/image';
import { HeroProps } from './types';
import styles from './Hero.module.css';
import { MotionFade } from '../ui';
import FlowerParticles from './FlowerParticles';
import { localization } from '../../lib/data';

export default function Hero({ bride, groom, date, illustrationImage, frameImage, onOpen }: HeroProps) {
  // Luxury Editorial Sequence Delays
  const getDelay = (index: number) => index * 200;
  let animIndex = 0;

  const delays = {
    eyebrow: getDelay(animIndex++),
    groomName: getDelay(animIndex++),
    ampersand: getDelay(animIndex++),
    brideName: getDelay(animIndex++),
    date: getDelay(animIndex++),
    image: getDelay(animIndex++),
  };

  return (
    <section className={styles.heroContainer}>
      <FlowerParticles />
      {/* LUXURY EDITORIAL GRID */}
      <div className={styles.heroGrid}>
        
        {/* LEFT COLUMN: Typography & CTA */}
        <div className={styles.textColumn}>
          <div className={styles.contentWrapper}>
            
            <MotionFade delay={delays.eyebrow} direction="up">
              <div className={styles.eyebrow}>
                {localization.theWeddingOf}
              </div>
            </MotionFade>
            
            <div className={styles.namesBlock}>
              <MotionFade delay={delays.groomName} direction="right">
                <h1 className={styles.name}>{groom.firstName}</h1>
              </MotionFade>
              
              <MotionFade delay={delays.ampersand} direction="up">
                <span className={styles.ampersand}>&</span>
              </MotionFade>
              
              <MotionFade delay={delays.brideName} direction="left">
                <h1 className={styles.name}>{bride.firstName}</h1>
              </MotionFade>
            </div>
            
            <MotionFade delay={delays.date} direction="up">
              <div className={styles.date}>
                {date.fullDate}
              </div>
            </MotionFade>

          </div>
        </div>

        {/* RIGHT COLUMN: Illustration */}
        <div className={styles.imageColumn}>
          <MotionFade delay={delays.image} direction="up" className={styles.imageFadeWrapper}>
            <div className={styles.imageWrapper}>
              {illustrationImage && (
                <Image 
                  src={illustrationImage}
                  alt="Couple Illustration"
                  fill
                  priority
                  className={styles.heroImage}
                  sizes="(max-width: 1024px) 90vw, 560px"
                />
              )}
            </div>
          </MotionFade>
        </div>

      </div>
    </section>
  );
}
