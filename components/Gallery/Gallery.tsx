import { GalleryProps } from './types';
import GalleryGrid from './GalleryGrid';
import styles from './Gallery.module.css';
import { SectionContainer, MotionFade } from '../ui';
import { localization } from '../../lib/data';

export default function Gallery({ data }: GalleryProps) {
  if (!data || (!data.images?.length && !data.featuredImage)) {
    return null;
  }

  return (
    <SectionContainer id="gallery" backgroundColor="surface" className={styles.sectionOverride}>
      <div className={styles.galleryWrapper}>
        <div className={styles.backgroundLayer} />
        
        <div className={styles.gallerySection}>
          
          <MotionFade direction="up">
            <div className={styles.introBlock}>
              {data.eyebrow && <span className={styles.eyebrow}>{data.eyebrow}</span>}
              <h2 className={styles.title}>{data.title}</h2>
              {data.description && <p className={styles.description}>{data.description}</p>}
            </div>
          </MotionFade>

          <GalleryGrid data={data} />
          
        </div>
      </div>
    </SectionContainer>
  );
}
