import { Person, EventDate } from '../../types/models';

export interface HeroProps {
  bride: Person;
  groom: Person;
  date: EventDate;
  illustrationImage?: string;
  frameImage?: string;
  quote?: string;
  onOpen?: () => void;
}
