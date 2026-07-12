export interface TimelineItemData {
  id: string; // Used for React keys
  label: string; // Generic label (could be Year, Chapter, Location, Exact Date)
  title: string;
  description: string;
}

export interface LoveStoryProps {
  stories: TimelineItemData[];
}
