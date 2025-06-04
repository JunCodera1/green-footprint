import React, { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { ProductCard } from "../components/marketplace/ProductCard";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDarkMode } from "../contexts/DarkModeContext";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Bamboo Water Bottle",
    description: "Sustainable bamboo water bottle with zero plastic components",
    price: 24.99,
    imageUrl: "/images/bamboo-bottle.jpg",
    brand: "EcoLife",
    rating: 4.5,
    reviewCount: 128,
    carbonFootprint: {
      value: 0.5,
      unit: "kg",
    },
    ecoFeatures: ["Biodegradable", "Plastic-free", "Sustainable materials"],
    affiliateLink: "https://example.com/bamboo-bottle",
  },
  // Add more mock products here
];

export const Marketplace: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProductDetails = (product: Product) => {
    window.open(product.affiliateLink, "_blank");
  };

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

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />

      <div className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1
              className={`text-3xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Eco-Friendly Products
            </h1>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Discover sustainable products that make a difference
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 ${
                isDarkMode
                  ? "bg-gray-800 text-green-400 hover:bg-gray-700"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              } px-4 py-2 rounded-lg transition-colors`}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-4">
              <select
                className={`border rounded-lg px-4 py-2 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
                aria-label="Sort products"
              >
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Rating</option>
                <option>Lowest Carbon Footprint</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } p-6 rounded-lg shadow-lg mb-6 border`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Price Range
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className={`w-full border rounded-lg px-3 py-2 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-200 placeholder-gray-400"
                      }`}
                    />
                    <span
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      -
                    </span>
                    <input
                      type="number"
                      placeholder="Max"
                      className={`w-full border rounded-lg px-3 py-2 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-200 placeholder-gray-400"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Minimum Rating
                  </label>
                  <select
                    className={`w-full border rounded-lg px-3 py-2 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-200"
                    }`}
                    aria-label="Filter by minimum rating"
                  >
                    <option>Any Rating</option>
                    <option>4+ Stars</option>
                    <option>3+ Stars</option>
                    <option>2+ Stars</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Max Carbon Footprint
                  </label>
                  <input
                    type="number"
                    placeholder="kg CO2"
                    className={`w-full border rounded-lg px-3 py-2 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-200 placeholder-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleProductDetails}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};
