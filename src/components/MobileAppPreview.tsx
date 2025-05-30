import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Screen {
  id: number;
  title: string;
  image: string;
  description: string;
}

const screens: Screen[] = [
  {
    id: 1,
    title: "Track Your Impact",
    image: "/images/app/screen1.png",
    description:
      "Monitor your daily carbon footprint with our intuitive dashboard",
  },
  {
    id: 2,
    title: "Set Goals",
    image: "/images/app/screen2.png",
    description: "Set personalized eco-friendly goals and track your progress",
  },
  {
    id: 3,
    title: "Join Challenges",
    image: "/images/app/screen3.png",
    description: "Participate in community challenges and earn green rewards",
  },
];

const MobileAppPreview: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentScreen(
      (prev) => (prev + newDirection + screens.length) % screens.length
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Phone Frame */}
      <div className="relative w-[280px] h-[580px] mx-auto">
        <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-xl">
          {/* Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-t-[3rem]">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="absolute inset-2 bg-white rounded-[2.75rem] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentScreen}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0"
            >
              <img
                src={screens[currentScreen].image}
                alt={screens[currentScreen].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {screens.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => {
                  setDirection(index > currentScreen ? 1 : -1);
                  setCurrentScreen(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentScreen ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* App Store Badges */}
      <div className="mt-8 flex justify-center space-x-4">
        <a
          href="#"
          className="transition-transform hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/app/app-store-badge.png"
            alt="Download on the App Store"
            className="h-12"
          />
        </a>
        <a
          href="#"
          className="transition-transform hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/app/google-play-badge.png"
            alt="Get it on Google Play"
            className="h-12"
          />
        </a>
      </div>

      {/* Screen Info */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {screens[currentScreen].title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {screens[currentScreen].description}
        </p>
      </div>
    </div>
  );
};

export default MobileAppPreview;
