import styles from './Opening.module.css';

interface WaxSealProps {
  isBroken: boolean;
}

export default function WaxSeal({ isBroken }: WaxSealProps) {
  return (
    <div className={`${styles.waxSeal} ${isBroken ? styles.waxSealBroken : ''}`}>
      DH
    </div>
  );
}
