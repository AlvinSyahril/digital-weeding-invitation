import { Hero } from '../components/Hero';
import { Couple } from '../components/Couple';
import { Countdown } from '../components/Countdown';
import { Event, EventCardData } from '../components/Event';
import { LoveStory, TimelineItemData } from '../components/LoveStory';
import { Gallery } from '../components/Gallery';
import { Gift, GiftData } from '../components/Gift';
import { RSVP } from '../components/RSVP';
import { Footer } from '../components/Footer';
import { Opening } from '../components/Opening';
import { AudioProvider } from '../components/Audio';
import data from '../data/invitation.json';
import { Person, Guest, EventDate } from '../types/models';
import { clientAssets } from '../lib/clientAssets';

export default function Home() {
  // Parsing JSON data to match strong typed models
  const bride: Person = {
    firstName: data.bride.name,
    lastName: "",
    fullName: data.bride.fullName,
    parents: data.bride.parents,
    instagram: data.bride.instagram,
    photo: clientAssets.couple.bride
  };

  const groom: Person = {
    firstName: data.groom.name,
    lastName: "",
    fullName: data.groom.fullName,
    parents: data.groom.parents,
    instagram: data.groom.instagram,
    photo: clientAssets.couple.groom
  };

  const eventDate: EventDate = {
    day: data.date.day,
    fullDate: data.date.fullDate,
    timestamp: data.date.timestamp
  };

  // Mock guest for demonstration
  const guest: Guest = {
    name: "Tamu Undangan",
    category: "VIP"
  };

  // Create Event Model Adapter
  const events: EventCardData[] = [
    {
      id: "ceremony",
      title: data.event.ceremony.title,
      time: data.event.ceremony.time,
      venue: data.event.ceremony.venue,
      address: data.event.ceremony.address,
      navigationUrl: data.event.ceremony.navigationUrl
    },
    {
      id: "reception",
      title: data.event.reception.title,
      time: data.event.reception.time,
      venue: data.event.reception.venue,
      address: data.event.reception.address,
      navigationUrl: data.event.reception.navigationUrl
    }
  ].filter(Boolean);

  // Create Love Story Model Adapter
  const loveStories: TimelineItemData[] = (data.loveStory || []).map((story, idx) => ({
    id: `story-${idx}`,
    label: story.label,
    title: story.title,
    description: story.description
  }));
  
  // Gallery Model Adapter
  const galleryData = data.gallery;

  // Gift Model Adapter
  const giftData: GiftData | null = data.gift ? {
    title: data.gift.title,
    description: data.gift.description,
    banks: data.gift.banks || []
  } : null;

  return (
    <AudioProvider>
      <Opening guestName={guest.name} />
      <main>
      <Hero 
        bride={bride} 
        groom={groom} 
        date={eventDate} 
        illustrationImage={clientAssets.heroIllustration}
        frameImage={clientAssets.heroFrame}
      />
      <Couple 
        bride={bride} 
        groom={groom} 
      />
      <Countdown 
        timestamp={eventDate.timestamp} 
      />
      <Event 
        events={events} 
      />
      {loveStories.length > 0 && <LoveStory stories={loveStories} />}
      {(galleryData?.images?.length > 0 || galleryData?.featuredImage) && <Gallery data={galleryData} />}
      {giftData && giftData.banks?.length > 0 && <Gift gift={giftData} />}
      <RSVP />
      <Footer 
        brideName={bride.firstName} 
        groomName={groom.firstName} 
        logo={clientAssets.logo}
      />
      </main>
    </AudioProvider>
  );
}
