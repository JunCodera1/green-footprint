import React from "react";

interface AboutHeroProps {
  isDarkMode: boolean;
}

const AboutHero: React.FC<AboutHeroProps> = ({ isDarkMode }) => {
  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          poster="/images/about-poster.jpg"
        >
          <source src="/videos/team-planting.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black ${
            isDarkMode ? "opacity-70" : "opacity-50"
          }`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Empowering 1 million people to fight climate change
          </h1>
          <p className="text-xl md:text-2xl text-green-100">
            Join us in our mission to create a sustainable future for all
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
