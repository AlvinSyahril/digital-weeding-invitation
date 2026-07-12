import { TimeLeft } from './types';

/**
 * Calculates the remaining time between now and a target timestamp.
 * Uses `new Date().getTime()` as recommended for consistency with ISO 8601 inputs.
 */
export function calculateRemainingTime(targetTimestamp: string): {
  timeLeft: TimeLeft;
  isFinished: boolean;
  isInvalid: boolean;
} {
  const defaultTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (!targetTimestamp) {
    return { timeLeft: defaultTimeLeft, isFinished: false, isInvalid: true };
  }

  const targetDate = new Date(targetTimestamp).getTime();
  
  if (isNaN(targetDate)) {
    return { timeLeft: defaultTimeLeft, isFinished: false, isInvalid: true };
  }

  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    return { timeLeft: defaultTimeLeft, isFinished: true, isInvalid: false };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    timeLeft: { days, hours, minutes, seconds },
    isFinished: false,
    isInvalid: false
  };
}

/**
 * Formats numbers to string and pads with zero if less than 10.
 */
export function formatTimeValue(value: number): string {
  return value < 10 ? `0${value}` : value.toString();
}

/**
 * Generates an abstracted Calendar URL (Google for now, extensible later)
 */
export function generateCalendarLink(
  type: 'google' | 'apple' | 'ics', 
  title: string, 
  timestamp: string
): string {
  if (type === 'google') {
    // Basic Google Calendar link generation logic
    const startDate = new Date(timestamp).toISOString().replace(/-|:|\.\d\d\d/g, "");
    // Assumption: Event is roughly 2 hours for template simplicity
    const endTimestamp = new Date(timestamp).getTime() + (2 * 60 * 60 * 1000);
    const endDate = new Date(endTimestamp).toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}`;
  }
  
  // Fallback for others (to be implemented)
  return '#';
}
