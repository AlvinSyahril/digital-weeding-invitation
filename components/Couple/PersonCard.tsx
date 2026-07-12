import Image from 'next/image';
import { PersonCardProps } from './types';
import styles from './Couple.module.css';
import { Button, MotionFade } from '../ui';

export default function PersonCard({ person, role, delay }: PersonCardProps) {
  // Graceful fallback for empty, null, or missing photos
  const DEFAULT_PROFILE_IMAGE = `/assets/images/placeholder-${role.toLowerCase()}.jpg`;
  const photoUrl = person.photo && person.photo.trim() !== '' ? person.photo : DEFAULT_PROFILE_IMAGE;
  
  // Safe URL logic for Instagram
  let instagramUrl = '';
  if (person.instagram) {
    if (person.instagram.startsWith('http')) {
      instagramUrl = person.instagram;
    } else {
      instagramUrl = `https://instagram.com/${person.instagram.replace('@', '')}`;
    }
  }

  return (
    <MotionFade delay={delay} direction="up" className={styles.personCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={photoUrl}
          alt={`Photo of ${person.fullName}`}
          fill
          loading="lazy"
          className={styles.image}
        />
      </div>
      
      <span className={styles.role}>{role}</span>
      <h3 className={styles.name}>{person.fullName}</h3>
      
      {person.parents && (
        <p className={styles.parents}>{person.parents}</p>
      )}
      
      {person.instagram && instagramUrl && (
        <div className={styles.instagramWrapper}>
          <Button 
            as="a" 
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            aria-label={`Instagram profile of ${person.fullName}`}
          >
            {person.instagram}
          </Button>
        </div>
      )}
    </MotionFade>
  );
}
