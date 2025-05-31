import React, { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { Search, Leaf, Recycle, CloudRain, Sun } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";

// Category data with matching icons
const categories = [
  {
    id: 1,
    name: "Environment",
    count: 12,
    icon: <Leaf className="w-4 h-4 mr-2" />,
  },
  {
    id: 2,
    name: "Tips & Tricks",
    count: 8,
    icon: <Recycle className="w-4 h-4 mr-2" />,
  },
  {
    id: 3,
    name: "Climate Change",
    count: 15,
    icon: <CloudRain className="w-4 h-4 mr-2" />,
  },
  {
    id: 4,
    name: "Success Stories",
    count: 6,
    icon: <Sun className="w-4 h-4 mr-2" />,
  },
];

// Blog post data with sustainability focus
const blogPosts = [
  {
    id: 1,
    title: "10 Simple Ways to Reduce Your Carbon Footprint Daily",
    excerpt:
      "Small daily habits that collectively make a significant environmental impact...",
    imageUrl: "/images/reduce-carbon.jpg",
    category: "Tips & Tricks",
    date: "March 15, 2024",
    author: "Eco Warrior",
    authorImage: "/images/authors/author1.jpg",
    readTime: "4 min read",
    footprintReduction: "2.5kg CO₂/day",
  },
  {
    id: 2,
    title: "Alert: Sea Levels Are Rising Rapidly",
    excerpt:
      "New data shows coastal cities may be underwater sooner than predicted...",
    imageUrl: "/images/sea-level.jpg",
    category: "Climate Change",
    date: "March 12, 2024",
    author: "Marine Biologist",
    authorImage: "/images/authors/author2.jpg",
    readTime: "6 min read",
    footprintReduction: null,
  },
  {
    id: 3,
    title: "Urban Gardening: Grow Food in Small Spaces",
    excerpt:
      "How apartment dwellers can reduce food miles with balcony gardens...",
    imageUrl: "/images/urban-garden.jpg",
    category: "Success Stories",
    date: "March 8, 2024",
    author: "Green Thumb",
    authorImage: "/images/authors/author3.jpg",
    readTime: "5 min read",
    footprintReduction: "1.8kg CO₂/week",
  },
];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const [scrollY, setScrollY] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-green-900" : "bg-green-50"}`}>
      {/* Navigation */}
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />

      {/* Hero Section */}
      <div className={`bg-gradient-to-r from-green-300 to-teal-600 text-white py-16 shadow-lg ${isDarkMode ? "dark:from-green-700 dark:to-teal-800" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">GreenFootprint BLOG</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Your guide to sustainable living. Discover how small changes create
            big impacts for our planet.
          </p>
          <div className="mt-6 text-green-200">
            <p>
              🌱{" "}
              {blogPosts.reduce(
                (sum, post) => sum + (post.footprintReduction ? 1 : 0),
                0
              )}{" "}
              actionable tips
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg shadow-lg p-6 border transition-colors duration-300 ${
              isDarkMode 
                ? "bg-green-800 border-green-700" 
                : "bg-white border-green-100"
            }`}>
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search green articles..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 ${
                      isDarkMode
                        ? "bg-green-700 border-green-600 text-white"
                        : "border-green-200"
                    }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className={`font-bold text-lg mb-4 flex items-center ${
                  isDarkMode ? "text-green-100" : "text-green-800"
                }`}>
                  <Leaf className="w-5 h-5 mr-2" /> Eco Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.name
                            ? isDarkMode
                              ? "bg-green-700 text-green-200"
                              : "bg-green-100 text-green-700"
                            : isDarkMode
                              ? "hover:bg-green-700/50"
                              : "hover:bg-green-50"
                        }`}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category.name ? "" : category.name
                          )
                        }
                      >
                        {category.icon}
                        <span>{category.name}</span>
                        <span className={`ml-auto text-sm ${
                          isDarkMode ? "text-green-300" : "text-green-600"
                        }`}>
                          ({category.count})
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className={`mt-8 p-4 rounded-lg border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-green-700 border-green-600"
                  : "bg-green-50 border-green-100"
              }`}>
                <h4 className={`font-medium mb-2 ${
                  isDarkMode ? "text-green-100" : "text-green-800"
                }`}>
                  Calculate Your Footprint
                </h4>
                <p className={`text-sm mb-3 ${
                  isDarkMode ? "text-green-200" : "text-green-600"
                }`}>
                  Discover how your lifestyle impacts the planet.
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                  <Link to="/carbon-footprint-calculator">
                    Try Our Calculator
                  </Link>
                </button>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            {currentPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentPosts.map((post) => (
                    <BlogPost
                      key={post.id}
                      {...post}
                      isDarkMode={isDarkMode}
                      additionalInfo={
                        post.footprintReduction && (
                          <span className={`inline-flex items-center text-sm ${
                            isDarkMode ? "text-green-300" : "text-green-600"
                          }`}>
                            <Leaf className="w-3 h-3 mr-1" /> Saves{" "}
                            {post.footprintReduction}
                          </span>
                        )
                      }
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      className="px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800/50 transition-colors"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </button>
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-4 py-2 rounded-lg ${
                          number === currentPage
                            ? "bg-green-600 text-white"
                            : "border hover:bg-green-100"
                        }`}
                      >
                        {number}
                      </button>
                    ))}

                    <button
                      className="px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800/50 transition-colors"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={currentPage === pageNumbers.length}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Leaf className="mx-auto w-12 h-12 text-green-400 mb-4" />
                <h3 className={`text-lg font-medium ${
                  isDarkMode ? "text-green-100" : "text-green-800"
                }`}>
                  No articles found
                </h3>
                <p className={`mt-2 ${
                  isDarkMode ? "text-green-300" : "text-green-600"
                }`}>
                  Try adjusting your search or filter criteria
                </p>
                <button
                  className={`mt-4 ${
                    isDarkMode
                      ? "text-green-300 hover:text-green-100"
                      : "text-green-600 hover:text-green-800"
                  }`}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Blog;