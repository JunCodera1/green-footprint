import React, { useState } from "react";
import {
  HelpCircle,
  Clock,
  Award,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { QuizCardProps } from "../../types/education";

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  onStart,
  isDarkMode = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = () => {
    switch (quiz.difficulty) {
      case "beginner":
        return "text-green-500";
      case "intermediate":
        return "text-yellow-500";
      case "advanced":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div
        className={`p-6 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {quiz.title}
            </h3>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center text-sm ${getDifficultyColor()}`}
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                {quiz.difficulty.charAt(0).toUpperCase() +
                  quiz.difficulty.slice(1)}
              </span>
              {quiz.timeLimit && (
                <span
                  className={`inline-flex items-center text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Clock className="w-4 h-4 mr-1" />
                  {quiz.timeLimit} min
                </span>
              )}
              <span
                className={`inline-flex items-center text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Award className="w-4 h-4 mr-1" />
                {quiz.reward.points} points
              </span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {quiz.category}
          </div>
        </div>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {quiz.description}
        </p>
      </div>

      {/* Questions Preview */}
      <div className="p-6">
        <h4
          className={`text-sm font-medium mb-3 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Questions Overview
        </h4>
        <div className="space-y-3">
          {quiz.questions.slice(0, 3).map((question) => (
            <div
              key={question.id}
              className={`flex items-start space-x-3 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {question.type === "multiple-choice" ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : question.type === "true-false" ? (
                <XCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              ) : (
                <HelpCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              )}
              <p className="line-clamp-1">{question.text}</p>
            </div>
          ))}
          {quiz.questions.length > 3 && (
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              +{quiz.questions.length - 3} more questions
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`p-4 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-50"
        } flex items-center justify-between`}
      >
        <div>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Passing Score
          </p>
          <p
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {quiz.passingScore}%
          </p>
        </div>
        <button
          onClick={() => onStart(quiz.id)}
          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            isDarkMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          aria-label={`Start ${quiz.title} quiz`}
        >
          Start Quiz
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
