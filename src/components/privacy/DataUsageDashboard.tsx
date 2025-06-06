import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface DataCategory {
  id: string;
  name: string;
  whatWeCollect: string[];
  whyWeNeedIt: string[];
  howProcessed: {
    step: string;
    description: string;
  }[];
  isEnabled: boolean;
}

interface Props {
  categories: DataCategory[];
  isDarkMode: boolean;
}

const DataUsageDashboard: React.FC<Props> = ({ categories, isDarkMode }) => {
  const [viewMode, setViewMode] = useState<"collect" | "need">("collect");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]?.id
  );

  return (
    <div
      className={`rounded-lg shadow-lg p-6 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Data Usage Dashboard
      </h2>

      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div
          className={`inline-flex rounded-lg p-1 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <button
            onClick={() => setViewMode("collect")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "collect"
                ? isDarkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
                : isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              What We Collect
            </div>
          </button>
          <button
            onClick={() => setViewMode("need")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "need"
                ? isDarkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
                : isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            <div className="flex items-center">
              <EyeOff className="w-4 h-4 mr-2" />
              Why We Need It
            </div>
          </button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? isDarkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Data Display */}
      <div
        className={`rounded-lg p-6 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        {categories.map((category) => {
          if (category.id !== selectedCategory) return null;

          return (
            <div key={category.id}>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {category.name}
              </h3>

              <div className="space-y-6">
                {/* What We Collect / Why We Need It */}
                {viewMode === "collect" ? (
                  <ul className="space-y-2">
                    {category.whatWeCollect.map((item, index) => (
                      <li
                        key={index}
                        className={`flex items-center ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <Eye className="w-4 h-4 mr-2 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    {category.whyWeNeedIt.map((item, index) => (
                      <li
                        key={index}
                        className={`flex items-center ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <EyeOff className="w-4 h-4 mr-2 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Flow Diagram */}
                <div className="mt-8">
                  <h4
                    className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    How It's Processed
                  </h4>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    {category.howProcessed.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`rounded-lg p-4 ${
                            isDarkMode ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <h5
                            className={`font-semibold mb-2 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {step.step}
                          </h5>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                        {index < category.howProcessed.length - 1 && (
                          <ArrowRight
                            className={`w-6 h-6 mx-4 hidden md:block ${
                              isDarkMode ? "text-gray-600" : "text-gray-400"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataUsageDashboard;
