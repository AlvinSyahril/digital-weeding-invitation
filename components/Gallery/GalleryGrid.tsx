"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { GalleryGridProps } from './types';
import { getNextIndex, getPreviousIndex } from './utils';
import Lightbox from './Lightbox';
import styles from './Gallery.module.css';
import { MotionFade } from '../ui';

export default function GalleryGrid({ data }: GalleryGridProps) {
  // Lightbox state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Slider state
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);

  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastActiveIndexRef = useRef<number | null>(null);

  // Combine all images for Lightbox & Slider
  const allImages = [];
  if (data.featuredImage) allImages.push(data.featuredImage);
  if (data.images) allImages.push(...data.images);

  const handleOpenLightbox = (index: number) => {
    setActiveIndex(index);
    lastActiveIndexRef.current = index;
  };

  const handleCloseLightbox = () => {
    setActiveIndex(null);
    if (lastActiveIndexRef.current !== null && thumbnailRefs.current[0]) {
      setTimeout(() => {
        thumbnailRefs.current[0]?.focus();
      }, 0);
    }
  };

  // Lightbox navigation
  const handleNextLightbox = () => {
    if (activeIndex === null) return;
    const nextIdx = getNextIndex(activeIndex, allImages.length);
    setActiveIndex(nextIdx);
    lastActiveIndexRef.current = nextIdx;
  };

  const handlePreviousLightbox = () => {
    if (activeIndex === null) return;
    const prevIdx = getPreviousIndex(activeIndex, allImages.length);
    setActiveIndex(prevIdx);
    lastActiveIndexRef.current = prevIdx;
  };

  // Slider navigation
  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSliderIndex((prev) => getNextIndex(prev, allImages.length));
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSliderIndex((prev) => getPreviousIndex(prev, allImages.length));
  };

  if (allImages.length === 0) return null;

  const currentImage = allImages[currentSliderIndex];
  
  // Custom object-position for specific images that get cropped poorly at center
  const getObjectPosition = (src: string) => {
    if (src.includes('HRM_2127.jpg')) return 'center 25%';
    return 'center center';
  };

  return (
    <>
      <div className={styles.heroSectionWrapper}>
        <MotionFade direction="up" delay={50} className={styles.fullWidth}>
          <button
            ref={(el) => {
              thumbnailRefs.current[0] = el;
            }}
            className={styles.featuredWrapper}
            onClick={() => handleOpenLightbox(currentSliderIndex)}
            aria-label="Open gallery image"
          >
            {allImages.map((img, idx) => (
              <Image
                key={img}
                src={img}
                alt="Gallery Image"
                fill
                className={styles.featuredImage}
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{ 
                  objectPosition: getObjectPosition(img),
                  opacity: idx === currentSliderIndex ? 1 : 0,
                  transition: 'opacity 0.6s ease, transform var(--motion-dur-slow) var(--motion-ease-default)',
                  zIndex: idx === currentSliderIndex ? 2 : 1
                }}
                priority={idx === 0 || idx === 1}
              />
            ))}
            
            {allImages.length > 1 && (
              <>
                <div 
                  className={`${styles.sliderNavButton} ${styles.sliderPrev}`} 
                  onClick={handlePrevSlide}
                  role="button"
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </div>
                <div 
                  className={`${styles.sliderNavButton} ${styles.sliderNext}`} 
                  onClick={handleNextSlide}
                  role="button"
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </>
            )}
          </button>
        </MotionFade>

        {data.quote && (
          <MotionFade direction="up" delay={150} className={styles.fullWidth}>
            <div className={styles.floatingQuoteCard}>
              <p className={styles.quoteText}>"{data.quote.text}"</p>
              {data.quote.author && <span className={styles.quoteAuthor}>— {data.quote.author}</span>}
            </div>
          </MotionFade>
        )}
      </div>

      {activeIndex !== null && allImages.length > 0 && (
        <Lightbox
          images={allImages}
          currentIndex={activeIndex}
          onClose={handleCloseLightbox}
          onNext={handleNextLightbox}
          onPrevious={handlePreviousLightbox}
        />
      )}
    </>
  );
}
