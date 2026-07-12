import { forwardRef } from 'react';
import { clientAssets } from '../../lib/clientAssets';

const AudioPlayer = forwardRef<HTMLAudioElement>((props, ref) => {
  return (
    <audio 
      ref={ref} 
      src={clientAssets.music} 
      loop 
      preload="auto" 
      // Ensure it doesn't display any default browser UI
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
