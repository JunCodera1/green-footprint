import React from "react";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface KnowledgeBaseProps {
  categories: Category[];
  isDarkMode: boolean;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  categories,
  isDarkMode,
}) => {
  return (
    <div>
      <h2
        className={`text-3xl font-bold mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Knowledge Base
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-6 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() =>
              (window.location.href = `/help/category/${category.id}`)
            }
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-green-100"
                }`}
              >
                {category.icon}
              </div>

              <div className="flex-1">
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.title}
                </h3>
                <p
                  className={`mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {category.description}
                </p>

                {/* Popular Articles Preview */}
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Getting Started Guide
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Common Questions
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Troubleshooting
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div
        className={`mt-12 p-6 rounded-xl ${
          isDarkMode ? "bg-gray-800" : "bg-green-50"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/help/getting-started"
            className={`p-4 rounded-lg text-center transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-white hover:bg-gray-50 text-gray-900"
            }`}
          >
            Getting Started
          </a>
          <a
            href="/help/faq"
            className={`p-4 rounded-lg text-center transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-white hover:bg-gray-50 text-gray-900"
            }`}
          >
            FAQ
          </a>
          <a
            href="/help/contact"
            className={`p-4 rounded-lg text-center transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-white hover:bg-gray-50 text-gray-900"
            }`}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
