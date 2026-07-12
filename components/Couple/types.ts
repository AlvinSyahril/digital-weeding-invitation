import { Person } from '../../types/models';

export interface CoupleProps {
  bride: Person;
  groom: Person;
}

export interface PersonCardProps {
  person: Person;
  role: 'Bride' | 'Groom';
  delay: number;
}
