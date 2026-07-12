import data from '../data/invitation.json';

export const clientAssets = {
  heroIllustration: "/assets/client/hero/illustrarion.png",
  heroFrame: "/assets/client/hero/Floral-frame.jpg",

  couple: {
    groom: "/assets/client/couple/Groom.jpg",
    bride: "/assets/client/couple/Bride.jpg",
  },

  gallery: data.gallery?.images || [],
  music: data.music?.url || "/assets/client/music/The Moment - Wedding Instrumental (No copyright music) - The NAGA Channel.mp3",

  logo: "/assets/client/logo/monogram.svg",
  seoImage: data.seo?.ogImage || "/assets/client/hero/Hero.jpg"
};
