import React from "react";
import { FileText, MessageCircle, Play, Clock } from "lucide-react";

interface SearchResult {
  type: "article" | "forum" | "video";
  title: string;
  excerpt: string;
  url: string;
  timestamp?: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  isDarkMode: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  isDarkMode,
}) => {
  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="w-5 h-5" />;
      case "forum":
        return <MessageCircle className="w-5 h-5" />;
      case "video":
        return <Play className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div
        className={`text-center py-12 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        No results found. Try adjusting your search terms.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <a
          key={index}
          href={result.url}
          className={`block p-6 rounded-lg transition-colors ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-white hover:bg-gray-50"
          } shadow-lg`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-green-100"
              } ${
                result.type === "article"
                  ? "text-blue-500"
                  : result.type === "forum"
                  ? "text-purple-500"
                  : "text-red-500"
              }`}
            >
              {getResultIcon(result.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  } ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                </span>
                {result.timestamp && (
                  <span
                    className={`flex items-center text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(result.timestamp)}
                  </span>
                )}
              </div>

              <h3
                className={`text-lg font-medium mt-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {result.title}
              </h3>

              <p
                className={`mt-2 text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {result.excerpt}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SearchResults;
