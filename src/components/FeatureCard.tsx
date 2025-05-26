import React from "react";
import type { Feature } from "../types";

interface FeatureCardProps {
  feature: Feature;
  isDarkMode: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, isDarkMode }) => {
  return (
    <div className="group">
      <div
        className={`backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${
          isDarkMode
            ? "bg-gray-800/80 border-gray-700"
            : "bg-white/80 border-white/50"
        }`}
      >
        <div className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <h3
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {feature.title}
        </h3>
        <p
          className={`leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
