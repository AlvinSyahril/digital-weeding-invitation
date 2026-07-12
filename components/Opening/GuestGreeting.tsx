import styles from './Opening.module.css';
import { GuestGreetingProps } from './types';

export default function GuestGreeting({ guestName }: GuestGreetingProps) {
  return (
    <div className={styles.guestGreeting}>
      <p className={styles.greetingPrefix}>
        Kepada Yth. Bapak / Ibu / Saudara/i
      </p>
      <h2 className={styles.guestName}>
        {guestName ? guestName : 'Tamu Undangan'}
      </h2>
    </div>
  );
}
