import React, { useState } from "react";
import BlogPost from "../components/BlogPost";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { Search, Leaf, Recycle, CloudRain, Sun } from "lucide-react";

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

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-900">
      {/* Thanh điều hướng */}
      <Navigation
        scrollY={0}
        isMenuOpen={false}
        setIsMenuOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
        isDarkMode={false}
        toggleDarkMode={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleLinkClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      {/* Hero Section with nature-inspired gradient */}
      <div className="bg-gradient-to-r from-green-300 to-teal-600 text-white py-16 shadow-lg">
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
          {/* Eco-Friendly Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-green-800 rounded-lg shadow-lg p-6 border border-green-100 dark:border-green-700">
              {/* Search with leaf icon */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search green articles..."
                    className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg 
                    focus:ring-2 focus:ring-green-500 focus:border-green-500
                    dark:bg-green-700 dark:border-green-600 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
                </div>
              </div>

              {/* Categories with icons */}
              <div>
                <h3 className="font-bold text-lg mb-4 dark:text-green-100 flex items-center">
                  <Leaf className="w-5 h-5 mr-2" /> Eco Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.name
                            ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200"
                            : "hover:bg-green-50 dark:hover:bg-green-700/50"
                        }`}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category.name
                              ? ""
                              : category.name
                          )
                        }
                      >
                        {category.icon}
                        <span>{category.name}</span>
                        <span className="ml-auto text-sm text-green-600 dark:text-green-300">
                          ({category.count})
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Carbon footprint calculator CTA */}
              <div className="mt-8 p-4 bg-green-50 dark:bg-green-700 rounded-lg border border-green-100 dark:border-green-600">
                <h4 className="font-medium text-green-800 dark:text-green-100 mb-2">
                  Calculate Your Footprint
                </h4>
                <p className="text-sm text-green-600 dark:text-green-200 mb-3">
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
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogPost
                      key={post.id}
                      {...post}
                      additionalInfo={
                        post.footprintReduction && (
                          <span className="inline-flex items-center text-sm text-green-600 dark:text-green-300">
                            <Leaf className="w-3 h-3 mr-1" /> Saves{" "}
                            {post.footprintReduction}
                          </span>
                        )
                      }
                    />
                  ))}
                </div>

                {/* Earth-friendly pagination */}
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800/50 transition-colors">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      1
                    </button>
                    <button className="px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800/50 transition-colors">
                      2
                    </button>
                    <button className="px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800/50 transition-colors">
                      3
                    </button>
                    <button className="px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800/50 transition-colors">
                      Next
                    </button>
                  </nav>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Leaf className="mx-auto w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-lg font-medium text-green-800 dark:text-green-100">
                  No articles found
                </h3>
                <p className="text-green-600 dark:text-green-300 mt-2">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  className="mt-4 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
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

      {/* Eco Pledge Footer */}
      <Footer isDarkMode={false} />
    </div>
  );
};

export default Blog;
