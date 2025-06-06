import React, { useState, useEffect, useRef } from "react";
import { Search, Bot, Loader } from "lucide-react";

interface AISearchBarProps {
  onSearch: (query: string) => void;
  isDarkMode: boolean;
  isLoading: boolean;
}

interface Suggestion {
  id: string;
  text: string;
  type: "article" | "question";
}

const AISearchBar: React.FC<AISearchBarProps> = ({
  onSearch,
  isDarkMode,
  isLoading,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions - replace with actual AI API call
  const getSuggestions = async (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const mockSuggestions: Suggestion[] = [
      {
        id: "1",
        text: `How to calculate my ${input} footprint?`,
        type: "question",
      },
      {
        id: "2",
        text: `Guide to reducing ${input} emissions`,
        type: "article",
      },
      {
        id: "3",
        text: `Understanding ${input} impact metrics`,
        type: "article",
      },
    ];

    setSuggestions(mockSuggestions);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getSuggestions(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className={`block w-full pl-10 pr-12 py-3 rounded-lg text-sm
              ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:border-green-500"
                  : "bg-white text-gray-900 border-gray-300 focus:border-green-500"
              } border focus:ring-2 focus:ring-green-500`}
            placeholder="Ask GreenBot anything..."
          />
          <button
            type="submit"
            className={`absolute inset-y-0 right-0 px-3 flex items-center ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
            title="Search"
            aria-label="Search help articles"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border`}
        >
          <ul className="py-2">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className={`px-4 py-2 cursor-pointer flex items-center ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => {
                  setQuery(suggestion.text);
                  onSearch(suggestion.text);
                  setShowSuggestions(false);
                }}
              >
                <span
                  className={`mr-2 text-xs px-2 py-1 rounded ${
                    suggestion.type === "question"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {suggestion.type === "question" ? "Q" : "A"}
                </span>
                {suggestion.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AISearchBar;
