/**
 * Pure UI interface. EventCard does not know about the original JSON structure.
 */
export interface EventCardData {
  id: string; // Used for React keys
  title: string;
  time: string;
  venue: string;
  address: string;
  navigationUrl?: string; // Generic URL for maps (Google, Apple, Waze)
}

/**
 * Event Section Props accepts an array of normalized events.
 */
export interface EventProps {
  events: EventCardData[];
}
