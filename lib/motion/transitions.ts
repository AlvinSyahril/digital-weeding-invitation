import { MotionTokens } from './motion';

/**
 * Motion Presets
 * Predefined animation structures to ensure consistency across the application.
 */

export const MotionPresets = {
  // CSS String Builders for standard inline styles (if needed)
  transition: {
    default: `all ${MotionTokens.duration.normal}ms ${MotionTokens.easing.default}`,
    fast: `all ${MotionTokens.duration.fast}ms ${MotionTokens.easing.default}`,
    slow: `all ${MotionTokens.duration.slow}ms ${MotionTokens.easing.default}`,
    opacityOnly: `opacity ${MotionTokens.duration.normal}ms ${MotionTokens.easing.default}`,
  },
  
  // Transform presets
  transform: {
    hoverLift: `translateY(-4px) scale(${MotionTokens.scale.hover})`,
    imageZoom: `scale(${MotionTokens.scale.image})`,
  }
} as const;
