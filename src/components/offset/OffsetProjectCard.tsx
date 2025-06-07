import React from "react";
import type { OffsetProjectCardProps } from "../../types/offset";
import { TreePine, Zap, Globe2, Star } from "lucide-react";


export const OffsetProjectCard: React.FC<OffsetProjectCardProps> = ({
  project,
  onPurchase,
  isDarkMode = false,
}) => {
  const renderIcon = () => {
    const iconProps = { className: "w-6 h-6" };
    switch (project.type) {
      case "tree-planting":
        return <TreePine {...iconProps} />;
      case "renewable-energy":
        return <Zap {...iconProps} />;
      default:
        return <Globe2 {...iconProps} />;
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105`}
    >
      <div className="relative">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm ${
            isDarkMode ? "bg-gray-900/80" : "bg-white/80"
          }`}
        >
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className={isDarkMode ? "text-white" : "text-gray-900"}>
              {project.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3
              className={`text-lg font-semibold mb-1 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {project.name}
            </h3>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              by {project.provider}
            </p>
          </div>
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {renderIcon()}
          </div>
        </div>

        <p
          className={`text-sm mb-4 line-clamp-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {project.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Location
            </span>
            <span
              className={`font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              {project.location}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Available Credits
            </span>
            <span
              className={`font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              {project.availableTons} tons
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Verification
            </span>
            <span
              className={`font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              {project.verificationStandard}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Price per ton
            </p>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              ${project.pricePerTon}
            </p>
          </div>
          <button
            onClick={() => onPurchase(project)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Purchase Credits
          </button>
        </div>
      </div>
    </div>
  );
};
