import { useAudio } from '../../lib/audio';
import styles from './Audio.module.css';

export default function AudioButton() {
  const { state, toggle } = useAudio();

  const isPlaying = state === 'playing';
  const isBlocked = state === 'blocked';
  const isLoading = state === 'loading';

  const getAriaLabel = () => {
    if (isBlocked) return "Enable background music";
    return isPlaying ? "Pause background music" : "Play background music";
  };

  return (
    <button 
      className={`${styles.audioButton} ${isPlaying ? styles.spinning : ''}`}
      onClick={toggle}
      aria-label={getAriaLabel()}
      tabIndex={0}
      title={isBlocked ? "Tap to enable music" : undefined}
    >
      {isLoading ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.iconLoading}>
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ) : isBlocked ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      ) : isPlaying ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      )}
    </button>
  );
}
