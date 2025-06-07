import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Leaf, Menu, X, Sun, Moon, LogIn, UserPlus } from "lucide-react";

interface NavigationProps {
  scrollY: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleLinkClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  scrollY,
  isMenuOpen,
  setIsMenuOpen,
  isDarkMode,
  toggleDarkMode,
  handleLinkClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? isDarkMode
            ? "bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-700"
            : "bg-white/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              GreenFootprint
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {!isAuthPage && (
              <>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, "#features")}
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-emerald-400"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  Features
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, "#about")}
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-emerald-400"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => handleLinkClick(e, "#testimonials")}
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-emerald-400"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  Reviews
                </a>
              </>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {!isAuthPage && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/carbon-footprint-calculator")}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          <button
            className={`md:hidden ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`md:hidden backdrop-blur-lg ${
            isDarkMode ? "bg-gray-900/95" : "bg-white/95"
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            {!isAuthPage && (
              <>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, "#features")}
                  className={`block transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-emerald-400"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  Features
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, "#about")}
                  className={`block transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-emerald-400"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => handleLinkClick(e, "#testimonials")}
                  className={`block transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-emerald-400"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  Reviews
                </a>
              </>
            )}

            <div className="flex items-center justify-between">
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Dark Mode
              </span>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>

            {!isAuthPage && (
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center justify-center px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/app-preview")}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Preview App
                </button>
                <button
                  onClick={() => navigate("/eco-scene")}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  EcoScene
                </button>
                <button
                  onClick={() => navigate("/carbon-footprint-calculator")}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
