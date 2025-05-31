import React from "react";
import { Lightbulb, Check } from "lucide-react";

interface Recommendation {
  id: number;
  title: string;
  description: string;
  potentialSaving: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "hard":
        return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Lightbulb className="w-6 h-6 text-emerald-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Personalized Recommendations
        </h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start">
              <Check className="w-5 h-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {recommendation.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                      recommendation.difficulty
                    )}`}
                  >
                    {recommendation.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {recommendation.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Category: {recommendation.category}
                  </span>
                  <span className="font-medium text-emerald-600">
                    Potential saving: {recommendation.potentialSaving} kg
                    CO₂/month
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;
