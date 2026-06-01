import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';


// Define the folders to create
const folders = [
  'logos',
  'hero-images',
  'gallery',
  'team',
  'partners',
  'stories',
  'news'
];

// Base directory (one level up from client)
const baseDir = join(__dirname, '..', '..', 'ngo-content');

// Create main directory and subfolders
console.log('📁 Creating content directory structure...');

// Create main folder
if (!existsSync(baseDir)) {
  mkdirSync(baseDir, { recursive: true });
  console.log(`✅ Created: ${baseDir}`);
}

// Create subfolders
folders.forEach(folder => {
  const folderPath = join(baseDir, folder);
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath, { recursive: true });
    console.log(`✅ Created: ${folder}`);
  }
});

// Create README.md
const readmeContent = `# NGO Content Directory

## Structure
- /logos - Organization logos
- /hero-images - Home page hero slider images  
- /gallery - Activity photos for gallery page
- /team - Leadership team photos
- /partners - Partner organization logos
- /stories - Success story photos
- /news - News and event images

## Instructions
1. Place files in appropriate folders
2. Use clear file names (e.g., food-distribution-abuja-2024.jpg)
3. Update manifest.json with descriptions
`;

writeFileSync(join(baseDir, 'README.md'), readmeContent);
console.log('✅ Created: README.md');

// Create manifest.json
const manifest = {
  organization: {
    name: "Hope for the Hopeless Initiative",
    cacNumber: "",
    registrationDate: ""
  },
  bankAccounts: [],
  contactInfo: {
    email: {
      general: "",
      donations: "",
      volunteer: "",
      partnerships: ""
    },
    phone: {
      main: "",
      emergency: ""
    },
    address: {
      street: "",
      city: "",
      state: "",
      country: "Nigeria",
      postalCode: ""
    },
    social: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: ""
    }
  },
  team: [],
  partners: {
    corporate: [],
    international: [],
    local: []
  },
  stories: [],
  gallery: [],
  stats: {
    childrenSupported: 1250,
    mealsDistributed: 8750,
    youthReached: 3200,
    communitiesImpacted: 15,
    volunteersEngaged: 120,
    partnershipsEstablished: 25
  }
};

writeFileSync(join(baseDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('✅ Created: manifest.json');

console.log('\n✨ Content directory structure created successfully!');
console.log(`📂 Location: ${baseDir}`);
console.log('\n📋 Next steps:');
console.log('1. Add your logo files to /logos');
console.log('2. Add hero images to /hero-images');
console.log('3. Add gallery photos to /gallery');
console.log('4. Update manifest.json with your information');