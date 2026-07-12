/**
 * Easing functions for natural volume transitions.
 * Human hearing is logarithmic, so linear volume changes sound unnatural.
 */

// easeInOutSine
export const easeInOutSine = (t: number): number => {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};

// easeOutCubic
export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export type FadeOptions = {
  from: number;
  to: number;
  duration: number;
  onUpdate: (volume: number) => void;
  onComplete?: () => void;
  easing?: (t: number) => number;
};

/**
 * Fades a value over time using requestAnimationFrame.
 * Returns a function to cancel the fade early.
 */
export const fadeVolume = ({
  from,
  to,
  duration,
  onUpdate,
  onComplete,
  easing = easeInOutSine
}: FadeOptions): (() => void) => {
  let startTime: number | null = null;
  let animationFrameId: number;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    let progress = Math.min(elapsed / duration, 1);
    
    // Apply easing
    const easedProgress = easing(progress);
    
    // Calculate current volume
    const currentVolume = from + (to - from) * easedProgress;
    
    onUpdate(currentVolume);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      if (onComplete) onComplete();
    }
  };

  animationFrameId = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
};
