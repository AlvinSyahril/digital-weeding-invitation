export interface OpeningOverlayProps {
  guestName?: string;
}

export interface GuestGreetingProps {
  guestName?: string;
}

export type OpeningState = 
  | 'idle' 
  | 'breakingSeal' 
  | 'openingEnvelope' 
  | 'revealingLetter' 
  | 'holdingFocus' 
  | 'naturalLightReveal' 
  | 'revealingInvitation' 
  | 'completed';
