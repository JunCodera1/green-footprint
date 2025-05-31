#!/bin/bash

# Install dependencies
npm install @react-three/drei @react-three/fiber three @types/three
npm install framer-motion
npm install tailwindcss postcss autoprefixer
npm install @vitejs/plugin-react

# Create necessary directories
mkdir -p public/models
mkdir -p public/textures
mkdir -p src/assets/images

# Initialize Tailwind CSS
npx tailwindcss init -p

# Create necessary asset directories
mkdir -p public/models
mkdir -p public/textures

# Download 3D models and textures
echo "Please download and place the following files in the appropriate directories:

public/models/
- tree.glb
- solar_panel.glb
- wind_turbine.glb

public/textures/
- earth_daymap.jpg
- earth_bumpmap.jpg
- earth_specular.jpg
- earth_clouds.png

public/images/app/
- screen1.png
- screen2.png
- screen3.png
- app-store-badge.png
- google-play-badge.png"

# Add scripts to package.json
npm pkg set scripts.dev="vite"
npm pkg set scripts.build="tsc && vite build"
npm pkg set scripts.preview="vite preview"

echo "Setup complete! Please follow these steps:

1. Download the required 3D models and textures
2. Place them in their respective directories
3. Run 'npm run dev' to start the development server

Note: You may need to adjust the paths in the code to match your actual file structure." 