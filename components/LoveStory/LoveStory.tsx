import { LoveStoryProps } from './types';
import { LOVE_STORY_ANIMATION } from './constants';
import TimelineItem from './TimelineItem';
import styles from './LoveStory.module.css';
import { SectionContainer, SectionHeader, Ornament, MotionFade } from '../ui';

export default function LoveStory({ stories }: LoveStoryProps) {
  // Graceful Empty State handling
  // As per architecture plan, if array is empty, do not render to preserve visual rhythm
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <SectionContainer id="lovestory" backgroundColor="background">
      <Ornament position="top-right" />
      <Ornament position="bottom-left" />
      
      <div className={styles.loveStorySection}>
        <SectionHeader title="Our Love Story" subtitle="How It All Began" />
        
        <div className={styles.timeline}>
          {stories.map((story, index) => (
            <div key={story.id} className={styles.timelineItem}>
              <MotionFade 
                direction={index % 2 === 0 ? "right" : "left"} 
                delay={index * LOVE_STORY_ANIMATION.STAGGER}
              >
                <TimelineItem
                  label={story.label}
                  title={story.title}
                  description={story.description}
                />
              </MotionFade>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
