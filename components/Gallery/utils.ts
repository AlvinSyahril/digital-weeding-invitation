/**
 * Pure helper for looping to the next index safely.
 * Allows infinite navigation.
 */
export function getNextIndex(currentIndex: number, totalLength: number): number {
  if (totalLength <= 0) return 0;
  return (currentIndex + 1) % totalLength;
}

/**
 * Pure helper for looping to the previous index safely.
 * Handles negative wrapping logic.
 */
export function getPreviousIndex(currentIndex: number, totalLength: number): number {
  if (totalLength <= 0) return 0;
  // Add totalLength before modulo to handle negative results securely
  return (currentIndex - 1 + totalLength) % totalLength;
}
