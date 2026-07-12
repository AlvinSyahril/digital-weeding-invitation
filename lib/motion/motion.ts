/**
 * Motion Design Tokens
 * 
 * Centralized motion tokens ensuring all animations share the same DNA.
 * "Invisible Motion": Motion helps the eye shift focus naturally, not demand attention.
 */

export const MotionTokens = {
  duration: {
    fast: 180,    // For rapid micro-interactions, fade-outs
    normal: 350,  // Standard for layout reveals, hovers
    slow: 700,    // Cinematic sequences, envelope logic
  },
  easing: {
    default: 'cubic-bezier(0.22, 1, 0.36, 1)', // The signature elegant curve
  },
  distance: {
    small: 12,
    fade: 20,
    slide: 40,
    reveal: 80,
  },
  scale: {
    hover: 1.01,
    camera: 1.015,
    image: 1.03,
  },
  blur: {
    default: 6,
    max: 10,
  }
} as const;

export type MotionDuration = keyof typeof MotionTokens.duration;
export type MotionDistance = keyof typeof MotionTokens.distance;
export type MotionScale = keyof typeof MotionTokens.scale;
