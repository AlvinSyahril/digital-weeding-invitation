"use client";

import { useState, useEffect } from 'react';
import { CountdownTimerProps, TimeLeft } from './types';
import { calculateRemainingTime, formatTimeValue } from './utils';
import CountdownCard from './CountdownCard';
import styles from './Countdown.module.css';

export default function CountdownTimer({ timestamp }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  // Strategy for Zero Hydration Warning:
  // Render nothing or empty structure until client mount
  useEffect(() => {
    // Initial calculation immediately on mount
    const initialCheck = calculateRemainingTime(timestamp);
    setTimeLeft(initialCheck.timeLeft);
    setIsFinished(initialCheck.isFinished);
    setIsInvalid(initialCheck.isInvalid);
    setMounted(true);

    // If finished or invalid right from the start, no need to set up interval
    if (initialCheck.isFinished || initialCheck.isInvalid) {
      return;
    }

    // Set up the interval for tick every second
    const timer = setInterval(() => {
      const currentStatus = calculateRemainingTime(timestamp);
      
      if (currentStatus.isFinished) {
        setIsFinished(true);
        clearInterval(timer); // Zero Memory Leak: Clear interval as soon as it's done
      } else {
        setTimeLeft(currentStatus.timeLeft);
      }
    }, 1000);

    // Interval Cleanup on unmount
    return () => clearInterval(timer);
  }, [timestamp]);

  // SSR state: render structural skeleton with 00s to reserve layout space and prevent CLS
  if (!mounted) {
    return (
      <div className={styles.timerWrapper} aria-hidden="true">
        <CountdownCard value="00" label="Days" />
        <CountdownCard value="00" label="Hours" />
        <CountdownCard value="00" label="Mins" />
        <CountdownCard value="00" label="Secs" />
      </div>
    );
  }

  // Edge Case: Invalid Date Handling
  if (isInvalid) {
    return (
      <div className={styles.timerWrapper}>
        <div className={styles.messageBox}>
          <span className={styles.finishedText}>Awaiting Date Announcement</span>
        </div>
      </div>
    );
  }

  // Event Finished State Handling
  if (isFinished) {
    return (
      <div className={styles.timerWrapper}>
        <div className={styles.messageBox}>
          <span className={styles.finishedText}>The Wedding Has Begun</span>
        </div>
      </div>
    );
  }

  // Active Timer state
  return (
    <div className={styles.timerWrapper}>
      {/* Screen reader only live region */}
      <span className="sr-only" aria-live="polite">
        {`${timeLeft.days} days, ${timeLeft.hours} hours left until the wedding`}
      </span>
      
      {/* Visual representation */}
      <CountdownCard value={formatTimeValue(timeLeft.days)} label="Days" />
      <CountdownCard value={formatTimeValue(timeLeft.hours)} label="Hours" />
      <CountdownCard value={formatTimeValue(timeLeft.minutes)} label="Mins" />
      <CountdownCard value={formatTimeValue(timeLeft.seconds)} label="Secs" />
    </div>
  );
}
