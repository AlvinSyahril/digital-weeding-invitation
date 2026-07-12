const fs = require('fs');

// 1. Fix invitation.json
let data = JSON.parse(fs.readFileSync('data/invitation.json', 'utf8'));
data.music.url = '/assets/client/music/The Moment - Wedding Instrumental (No copyright music) - The NAGA Channel.mp3';
data.gallery.images = [
  '/assets/client/gallery/HRM_2104.jpg',
  '/assets/client/gallery/HRM_2118.jpg',
  '/assets/client/gallery/HRM_2121.jpg',
  '/assets/client/gallery/HRM_2127.jpg',
  '/assets/client/gallery/HRM_2164.jpg',
  '/assets/client/gallery/HRM_2165.jpg',
  '/assets/client/gallery/HRM_2168.jpg'
];
fs.writeFileSync('data/invitation.json', JSON.stringify(data, null, 2));
fs.writeFileSync('data/templates/botanical-blue.demo.json', JSON.stringify(data, null, 2));

// 2. Fix clientAssets.ts
const clientAssetsTs = `import data from '../data/invitation.json';

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
`;
fs.writeFileSync('lib/clientAssets.ts', clientAssetsTs);

console.log('Fixed clientAssets and invitation JSON.');
