#!/bin/bash

# Create directory structure for NGO content
echo "Creating content directory structure..."

mkdir -p ../ngo-content/{logos,hero-images,gallery,team,partners,stories,news}

# Create placeholder structure
cat > ../ngo-content/README.md << 'EOF'
# NGO Content Directory

## Structure
- `/logos` - Organization logos
- `/hero-images` - Home page hero slider images
- `/gallery` - Activity photos for gallery page
- `/team` - Leadership team photos
- `/partners` - Partner organization logos
- `/stories` - Success story photos
- `/news` - News and event images

## Instructions
1. Place files in appropriate folders
2. Use clear file names (e.g., food-distribution-abuja-2024.jpg)
3. Include a manifest.json file describing each image
EOF

# Create manifest template
cat > ../ngo-content/manifest.json << 'EOF'
{
  "organization": {
    "name": "Hope for the Hopeless Initiative",
    "cacNumber": "",
    "registrationDate": ""
  },
  "bankAccounts": [],
  "contactInfo": {
    "email": {},
    "phone": {},
    "address": {},
    "social": {}
  },
  "team": [],
  "partners": {
    "corporate": [],
    "international": [],
    "local": []
  },
  "stories": [],
  "gallery": [],
  "stats": {}
}
EOF

echo "Content directory created at ../ngo-content/"
echo "Please add your content files to the appropriate folders"