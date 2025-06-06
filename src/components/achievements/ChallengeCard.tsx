import React from "react";
import type { Challenge } from "../../types/achievement";
import { Calendar, Users, TreePine } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin: (challengeId: string) => void;
  isDarkMode?: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onJoin,
  isDarkMode = false,
}) => {
  const isActive =
    new Date() >= new Date(challenge.startDate) &&
    new Date() <= new Date(challenge.endDate);

  const daysLeft = Math.ceil(
    (new Date(challenge.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg overflow-hidden`}
    >
      <div
        className={`p-4 ${
          challenge.type === "daily"
            ? "bg-blue-500"
            : challenge.type === "weekly"
            ? "bg-purple-500"
            : "bg-green-500"
        } text-white`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{challenge.title}</h3>
          <span className="text-sm bg-white/20 px-2 py-1 rounded">
            {challenge.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p
          className={`text-sm mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {challenge.description}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {isActive ? `${daysLeft} days left` : "Completed"}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {challenge.participants} joined
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TreePine className="w-5 h-5 text-green-500 mr-2" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {challenge.carbonReduction}kg CO₂ reduced
              </span>
            </div>
            <div
              className={`text-sm font-medium ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              +{challenge.reward.value} {challenge.reward.type}
            </div>
          </div>

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
                {Math.round(challenge.progress * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${challenge.progress * 100}%` }}
              />
            </div>
          </div>

          {isActive && !challenge.completed && (
            <button
              onClick={() => onJoin(challenge.id)}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              Join Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
