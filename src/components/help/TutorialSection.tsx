import React, { useState } from "react";
import {
  Play,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface TutorialSectionProps {
  isDarkMode: boolean;
}

interface Tutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface GuideStep {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspots: {
    x: number;
    y: number;
    label: string;
  }[];
}

const TutorialSection: React.FC<TutorialSectionProps> = ({ isDarkMode }) => {
  const [currentGuideStep, setCurrentGuideStep] = useState(0);

  const tutorials: Tutorial[] = [
    {
      id: "1",
      title: "Getting Started with Carbon Tracking",
      duration: "1:45",
      thumbnail: "/tutorials/carbon-tracking-thumb.jpg",
      videoUrl: "/tutorials/carbon-tracking.mp4",
    },
    {
      id: "2",
      title: "Understanding Your Impact Score",
      duration: "1:30",
      thumbnail: "/tutorials/impact-score-thumb.jpg",
      videoUrl: "/tutorials/impact-score.mp4",
    },
    {
      id: "3",
      title: "Tips for Reducing Emissions",
      duration: "1:55",
      thumbnail: "/tutorials/emissions-tips-thumb.jpg",
      videoUrl: "/tutorials/emissions-tips.mp4",
    },
  ];

  const guideSteps: GuideStep[] = [
    {
      id: "1",
      title: "Enter Your Transportation Data",
      description: "Input your daily commute details and travel information.",
      image: "/guides/transport-input.jpg",
      hotspots: [
        { x: 20, y: 30, label: "Select transport type" },
        { x: 60, y: 45, label: "Enter distance" },
      ],
    },
    {
      id: "2",
      title: "Add Home Energy Usage",
      description: "Input your monthly electricity and gas consumption.",
      image: "/guides/energy-input.jpg",
      hotspots: [
        { x: 25, y: 35, label: "Enter electricity usage" },
        { x: 70, y: 50, label: "Add gas consumption" },
      ],
    },
    {
      id: "3",
      title: "Review Your Results",
      description:
        "Analyze your carbon footprint and get personalized recommendations.",
      image: "/guides/results-view.jpg",
      hotspots: [
        { x: 30, y: 40, label: "Total emissions" },
        { x: 65, y: 55, label: "Reduction targets" },
      ],
    },
  ];

  return (
    <div>
      <h2
        className={`text-3xl font-bold mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Interactive Tutorials
      </h2>

      {/* Video Tutorials */}
      <div className="mb-12">
        <h3
          className={`text-xl font-semibold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Video Guides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className={`rounded-lg overflow-hidden shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="relative">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                    onClick={() => (window.location.href = tutorial.videoUrl)}
                    aria-label={`Play ${tutorial.title}`}
                  >
                    <Play className="w-6 h-6" />
                  </button>
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {tutorial.duration}
                </span>
              </div>
              <div className="p-4">
                <h4
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tutorial.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div>
        <h3
          className={`text-xl font-semibold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Step-by-Step Guide
        </h3>
        <div
          className={`rounded-lg overflow-hidden shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="relative">
            <img
              src={guideSteps[currentGuideStep].image}
              alt={guideSteps[currentGuideStep].title}
              className="w-full h-96 object-cover"
            />
            {/* Hotspots */}
            {guideSteps[currentGuideStep].hotspots.map((hotspot, index) => (
              <div
                key={index}
                className="absolute"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                <div className="relative group">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute" />
                  <div className="w-4 h-4 bg-green-500 rounded-full relative" />
                  <div
                    className={`absolute left-6 top-0 whitespace-nowrap px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    {hotspot.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6">
            <h4
              className={`text-lg font-medium mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {guideSteps[currentGuideStep].title}
            </h4>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {guideSteps[currentGuideStep].description}
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  setCurrentGuideStep((prev) =>
                    prev > 0 ? prev - 1 : guideSteps.length - 1
                  )
                }
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                aria-label="Previous step"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Step {currentGuideStep + 1} of {guideSteps.length}
              </span>
              <button
                onClick={() =>
                  setCurrentGuideStep((prev) =>
                    prev < guideSteps.length - 1 ? prev + 1 : 0
                  )
                }
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                aria-label="Next step"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialSection;
