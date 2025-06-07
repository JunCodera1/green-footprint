import React from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import Navigation from "../../components/mainCompo/Navigation";
import Footer from "../../components/mainCompo/Footer";

const Community: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
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
      <div className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-green-50"}`}>
        <h1 className="text-4xl font-bold text-center mb-8">Community</h1>
        {/* Add community content here */}
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Community;
