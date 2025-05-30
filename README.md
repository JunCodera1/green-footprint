# 🌱 Green Footprint

**Green Footprint** is a web application that helps you **calculate your personal carbon footprint** based on your daily habits, and provides personalized **recommendations to live more sustainably** and reduce your environmental impact.

---

## 🚀 Features

- ✅ Calculate your carbon footprint based on:
  - Transportation (motorbike, car, public transport, etc.)
  - Energy consumption (electricity, gas, etc.)
  - Diet (meat, vegetarian, frequency, etc.)
  - Shopping & lifestyle choices
- 📊 Visualize results using interactive charts (bar, pie, etc.)
- 🎯 Get actionable tips to reduce your CO₂ emissions
- 🧠 Learn about sustainable living through bite-sized knowledge
- 🔒 (Optional) Sign in to save and track your progress over time

---

## 🧑‍💻 Tech Stack

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Chart.js](https://www.chartjs.org/) or [Recharts](https://recharts.org/)

---

## 🛠️ Getting Started

```bash
# Clone the project
git clone https://github.com/JunCodera1/green-footprint.git
cd green-footprint

# Install dependencies
npm install
npm install react-router-dom
npm install react-simple-maps --legacy-peer-deps
# Run development server
npm run dev

# App will be running at:
http://localhost:5173

```

# Green Footprint App

A modern web application for tracking and reducing your carbon footprint with advanced animations and interactions.

## New Features

### 1. Advanced Animations & Interactions

- **Parallax Scrolling**: Smooth parallax effects on landing page and key sections
- **3D Elements**: Interactive 3D Earth and eco-friendly models using Three.js
- **Micro-animations**: Subtle animations on buttons, cards, and interactive elements
- **Page Transitions**: Smooth transitions between pages with loading animations

### 2. Enhanced Theme System

- Multiple color themes:
  - Green (Default)
  - Blue
  - Purple
  - Eco
- Automatic theme switching based on:
  - Time of day (Light/Dark)
  - System preferences
  - User preferences
- Theme customization per user

### 3. Mobile App Preview

- Interactive mobile app mockup
- Animated screen transitions
- App store download links

## Setup

1. Clone the repository
2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
3. Download required assets and place them in their directories:

   - 3D Models (`public/models/`)
   - Textures (`public/textures/`)
   - App Screenshots (`public/images/app/`)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Component Usage

### Parallax Section

```tsx
import ParallaxSection from "./components/ParallaxSection";

<ParallaxSection bgImage="/path/to/image.jpg" speed={0.5}>
  <h1>Your Content</h1>
</ParallaxSection>;
```

### 3D Earth

```tsx
import Earth3D from "./components/Earth3D";

<Earth3D size={400} autoRotate={true} />;
```

### Animated Card

```tsx
import AnimatedCard from "./components/AnimatedCard";

<AnimatedCard
  title="Card Title"
  description="Card description"
  image="/path/to/image.jpg"
  badge="New"
/>;
```

### Theme Provider

```tsx
import { useTheme } from "./hooks/useTheme";

const { mode, color, setMode, setColor } = useTheme();

// Change theme
setColor("blue");
setMode("dark");
```

### Page Transitions

```tsx
import PageTransition from "./components/PageTransition";

<PageTransition>
  <YourPageContent />
</PageTransition>;
```

## Customization

### Theme Colors

Edit `src/styles/themes.css` to modify theme colors:

```css
[data-theme-color="custom"] {
  --primary-50: #...;
  --primary-100: #...;
  /* etc */
}
```

### Animations

Modify animation parameters in components:

- `ParallaxSection.tsx` for parallax effects
- `Earth3D.tsx` for 3D animations
- `AnimatedCard.tsx` for card interactions
- `PageTransition.tsx` for page transitions

## Performance Considerations

- 3D models are loaded lazily
- Page transitions use React Suspense
- Images are optimized for web
- Animations are hardware-accelerated
- Theme changes are persisted in localStorage

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for older browsers:
  - Reduced animations
  - Simplified 3D effects
  - Basic theme support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details
