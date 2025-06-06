import React from "react";
import { Award } from "lucide-react";

interface Partner {
  name: string;
  logo: string;
  link: string;
}

interface PressFeature {
  name: string;
  logo: string;
  link: string;
  quote: string;
}

interface PartnersPressProps {
  partners: Partner[];
  pressFeatures: PressFeature[];
  isDarkMode: boolean;
}

const PartnersPress: React.FC<PartnersPressProps> = ({
  partners,
  pressFeatures,
  isDarkMode,
}) => {
  return (
    <div className="py-16">
      {/* Partners Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Trusted by Industry Leaders
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Working together with leading organizations to create a sustainable
            future
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`transform transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "opacity-80 hover:opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Press Section */}
      <div className={`${isDarkMode ? "bg-gray-800" : "bg-green-50"} py-16`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Award
                className={`w-12 h-12 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              />
            </div>
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Featured In
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressFeatures.map((feature) => (
              <a
                key={feature.name}
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-xl transform transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-green-100"
                }`}
              >
                <img
                  src={feature.logo}
                  alt={feature.name}
                  className="h-8 object-contain mb-4"
                />
                <blockquote
                  className={`text-lg italic ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "{feature.quote}"
                </blockquote>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPress;
