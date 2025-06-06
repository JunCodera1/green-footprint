import React, { useState, useEffect } from "react";
import { Book, Calculator, CreditCard, BarChart2 } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import Navigation from "../components/mainCompo/Navigation";
import Footer from "../components/mainCompo/Footer";
import AISearchBar from "../components/help/AISearchBar";
import KnowledgeBase from "../components/help/KnowledgeBase";
import TutorialSection from "../components/help/TutorialSection";
import SearchResults from "../components/help/SearchResults";

interface SearchResult {
  type: "article" | "forum" | "video";
  title: string;
  excerpt: string;
  url: string;
  timestamp?: number; // For video results
}

const HelpCenter: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const categories = [
    {
      id: "app-usage",
      title: "App Usage",
      icon: <Book className="w-6 h-6" />,
      description: "Learn how to use GreenFootprint effectively",
    },
    {
      id: "calculator",
      title: "Calculator Guide",
      icon: <Calculator className="w-6 h-6" />,
      description: "Understanding carbon footprint calculations",
    },
    {
      id: "subscription",
      title: "Subscription",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Billing and subscription management",
    },
    {
      id: "data-accuracy",
      title: "Data Accuracy",
      icon: <BarChart2 className="w-6 h-6" />,
      description: "How we ensure accurate measurements",
    },
  ];

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    // TODO: Implement AI search logic here
    // Mock results for now
    const mockResults: SearchResult[] = [
      {
        type: "article",
        title: "Getting Started with GreenFootprint",
        excerpt: "Learn the basics of tracking your carbon footprint...",
        url: "/help/getting-started",
      },
      {
        type: "forum",
        title: "Tips for Reducing Carbon Emissions",
        excerpt: "Community discussion on effective ways to...",
        url: "/forum/carbon-reduction-tips",
      },
      {
        type: "video",
        title: "Carbon Calculator Tutorial",
        excerpt: "Step-by-step guide to using our calculator",
        url: "/tutorials/calculator",
        timestamp: 45, // 45 seconds into video
      },
    ];

    setTimeout(() => {
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        handleLinkClick={handleLinkClick}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Hero Section with AI Search */}
      <div className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-green-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              How can we help you?
            </h1>
            <p
              className={`text-xl mb-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Get instant answers with our AI-powered help center
            </p>
            <AISearchBar
              onSearch={handleSearch}
              isDarkMode={isDarkMode}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchResults
            results={searchResults}
            isLoading={isLoading}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {/* Knowledge Base */}
      {!searchQuery && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <KnowledgeBase categories={categories} isDarkMode={isDarkMode} />
          </div>

          {/* Interactive Tutorials */}
          <div className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TutorialSection isDarkMode={isDarkMode} />
            </div>
          </div>
        </>
      )}

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default HelpCenter;
