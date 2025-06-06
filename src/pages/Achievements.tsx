import React, { useState, useEffect } from "react";
import type {
  Achievement,
  Challenge,
  UserProgress,
} from "../types/achievement";
import { AchievementCard } from "../components/achievements/AchievementCard";
import { ChallengeCard } from "../components/achievements/ChallengeCard";
import Navigation from "../components/mainCompo/Navigation";
import Footer from "../components/mainCompo/Footer";
import { useDarkMode } from "../contexts/DarkModeContext";
import { Trophy, Target, Flame, ChevronUp } from "lucide-react";

// Mock data
const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "Carbon Warrior",
    description: "Reduce your carbon footprint by 100kg",
    icon: "trophy",
    category: "reduction",
    progress: 75,
    target: 100,
    completed: false,
    reward: {
      type: "points",
      value: 500,
    },
  },
  {
    id: "2",
    name: "Tree Hugger",
    description: "Plant 10 trees through our partners",
    icon: "tree",
    category: "lifestyle",
    progress: 10,
    target: 10,
    completed: true,
    completedAt: "2024-03-15",
    reward: {
      type: "badge",
      value: 1,
    },
  },
  // Add more achievements...
];

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "No Car Week",
    description: "Use public transport or bike for a whole week",
    type: "weekly",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    participants: 156,
    carbonReduction: 50,
    reward: {
      type: "points",
      value: 1000,
    },
    progress: 0.6,
    completed: false,
  },
  // Add more challenges...
];

const mockProgress: UserProgress = {
  level: 12,
  currentPoints: 2500,
  pointsToNextLevel: 5000,
  totalCarbonReduced: 1250,
  completedAchievements: 15,
  totalAchievements: 30,
  currentStreak: 5,
  longestStreak: 14,
};

type AchievementCategory = "all" | "reduction" | "lifestyle" | "community";

export const Achievements: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] =
    useState<AchievementCategory>("all");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJoinChallenge = (challengeId: string) => {
    console.log("Joining challenge:", challengeId);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredAchievements = mockAchievements.filter(
    (achievement) =>
      selectedCategory === "all" || achievement.category === selectedCategory
  );

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />

      <div className="pt-20">
        {/* User Progress Section */}
        <div className="container mx-auto px-4 py-8">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8`}>
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Level {mockProgress.level}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    XP Progress
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-900"}
                  >
                    {mockProgress.currentPoints}/
                    {mockProgress.pointsToNextLevel}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{
                      width: `${
                        (mockProgress.currentPoints /
                          mockProgress.pointsToNextLevel) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-green-500" />
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mockProgress.completedAchievements}/
                  {mockProgress.totalAchievements}
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Achievements Completed
              </p>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-8 h-8 text-orange-500" />
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mockProgress.currentStreak} Days
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Current Streak
              </p>
              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Longest: {mockProgress.longestStreak} days
              </p>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <ChevronUp className="w-8 h-8 text-blue-500" />
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mockProgress.totalCarbonReduced}kg
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total CO₂ Reduced
              </p>
            </div>
          </div>

          {/* Active Challenges Section */}
          <div className="mb-12">
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Active Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onJoin={handleJoinChallenge}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Achievements
              </h2>
              <div className="flex space-x-2">
                {["all", "reduction", "lifestyle", "community"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(category as AchievementCategory)
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? isDarkMode
                            ? "bg-green-500 text-white"
                            : "bg-green-100 text-green-700"
                          : isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};
