import React, { useState } from "react";
import { Download } from "lucide-react";
import Navigation from "../components/mainCompo/Navigation";
import Footer from "../components/mainCompo/Footer";
import ReportCard from "../components/ReportCard";
import RecommendationsList from "../components/RecommendationsList";

// Mock data for demonstration
const mockReports = [
  {
    period: "March 2024",
    totalEmissions: 850.5,
    previousEmissions: 920.3,
    categories: [
      { name: "Transportation", value: 350.2, percentage: 41.2 },
      { name: "Home Energy", value: 280.5, percentage: 33.0 },
      { name: "Food & Diet", value: 150.8, percentage: 17.7 },
      { name: "Shopping", value: 69.0, percentage: 8.1 },
    ],
  },
  {
    period: "February 2024",
    totalEmissions: 920.3,
    previousEmissions: 880.1,
    categories: [
      { name: "Transportation", value: 380.5, percentage: 41.3 },
      { name: "Home Energy", value: 310.2, percentage: 33.7 },
      { name: "Food & Diet", value: 160.5, percentage: 17.4 },
      { name: "Shopping", value: 69.1, percentage: 7.6 },
    ],
  },
];

const mockRecommendations = [
  {
    id: 1,
    title: "Switch to LED Bulbs",
    description:
      "Replace traditional bulbs with LED alternatives to reduce energy consumption.",
    potentialSaving: 15.5,
    difficulty: "easy" as const,
    category: "Home Energy",
  },
  {
    id: 2,
    title: "Use Public Transportation",
    description:
      "Consider using public transportation for your daily commute when possible.",
    potentialSaving: 45.2,
    difficulty: "medium" as const,
    category: "Transportation",
  },
  {
    id: 3,
    title: "Install Solar Panels",
    description:
      "Consider installing solar panels to reduce your reliance on grid electricity.",
    potentialSaving: 120.8,
    difficulty: "hard" as const,
    category: "Home Energy",
  },
];

const PersonalReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleExportPDF = (period: string) => {
    // Implement PDF export logic here
    console.log(`Exporting PDF for ${period}`);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Navigation
        scrollY={0}
        isMenuOpen={false}
        setIsMenuOpen={() => {}}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        handleLinkClick={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Personal Reports
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Track and analyze your carbon footprint over time
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setSelectedPeriod("monthly")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  selectedPeriod === "monthly"
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPeriod("yearly")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  selectedPeriod === "yearly"
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                Yearly
              </button>
            </div>

            <button
              onClick={() => handleExportPDF("all")}
              className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mockReports.map((report) => (
            <ReportCard
              key={report.period}
              {...report}
              onExport={() => handleExportPDF(report.period)}
            />
          ))}
        </div>

        <div className="mt-12">
          <RecommendationsList recommendations={mockRecommendations} />
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PersonalReports;
