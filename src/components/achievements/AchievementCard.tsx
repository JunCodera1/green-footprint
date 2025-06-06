import React from "react";
import type { Achievement } from "../../types/achievement";
import { Trophy, Medal, Star } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
  isDarkMode?: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isDarkMode = false,
}) => {
  const progressPercentage = (achievement.progress / achievement.target) * 100;

  const renderIcon = () => {
    const iconProps = { className: "w-6 h-6" };
    switch (achievement.category) {
      case "reduction":
        return <Trophy {...iconProps} />;
      case "lifestyle":
        return <Medal {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6 transition-transform hover:scale-105`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-full ${
            achievement.completed
              ? "bg-green-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-gray-400"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {renderIcon()}
        </div>
        <div
          className={`text-sm font-medium ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {achievement.reward.value} {achievement.reward.type}
        </div>
      </div>

      <h3
        className={`text-lg font-semibold mb-2 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {achievement.name}
      </h3>

      <p
        className={`text-sm mb-4 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {achievement.description}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Progress
          </span>
          <span
            className={`font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {achievement.progress}/{achievement.target}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              achievement.completed ? "bg-green-500" : "bg-blue-500"
            } transition-all duration-500`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>

        {achievement.completed && achievement.completedAt && (
          <div className="text-xs text-center mt-2 text-gray-500">
            Completed on{" "}
            {new Date(achievement.completedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};
