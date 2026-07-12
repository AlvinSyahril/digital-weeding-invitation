export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownProps {
  timestamp: string; // ISO 8601 string
}

export interface CountdownCardProps {
  value: number | string;
  label: string;
}

export interface CountdownTimerProps {
  timestamp: string;
}
