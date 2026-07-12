export interface RSVPFormData {
  name: string;
  attendance: string; // 'yes' | 'no' | ''
  guestCount: number;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
