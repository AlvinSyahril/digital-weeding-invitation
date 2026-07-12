const fs = require('fs');

fs.writeFileSync('lib/data.ts', "import data from '../data/invitation.json';\nexport const localization = data.localization;\nexport default data;");

const filesToUpdate = [
  'components/Countdown/Countdown.tsx',
  'components/Hero/Hero.tsx',
  'components/Opening/Envelope.tsx',
  'components/Opening/Letter.tsx',
  'components/RSVP/RSVP.tsx',
  'components/Gallery/Gallery.tsx',
  'components/Gift/Gift.tsx'
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add import statement if not exists
    if (!content.includes('import { localization }')) {
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex) + "\nimport { localization } from '../../lib/data';" + content.slice(nextLineIndex);
      } else {
        content = "import { localization } from '../../lib/data';\n" + content;
      }
    }
    
    // Replace require call
    content = content.replace(/require\('\.\.\/\.\.\/data\/invitation\.json'\)\.localization/g, 'localization');
    
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed imports');
