import React, { useState, useEffect } from "react";
import type { Product } from "../../types/product";
import { ProductCard } from "../../components/marketplace/ProductCard";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Navigation from "../../components/mainCompo/Navigation";
import Footer from "../../components/mainCompo/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  XMarkIcon,
  StarIcon,
  ShoppingCartIcon,
  ShieldCheckIcon,
  TruckIcon,
  HeartIcon,
  ShareIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

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
  {
    id: "2",
    name: "Solar Power Bank",
    description: "Portable solar charger with 20,000mAh capacity",
    price: 49.99,
    imageUrl: "/images/solar-powerbank.jpg",
    brand: "SunPower",
    rating: 4.8,
    reviewCount: 256,
    carbonFootprint: {
      value: 1.2,
      unit: "kg",
    },
    ecoFeatures: ["Solar-powered", "Long-lasting", "Fast charging"],
    affiliateLink: "https://example.com/solar-powerbank",
  },
  {
    id: "3",
    name: "Organic Cotton Tote Bag",
    description: "Handmade organic cotton tote bag with natural dyes",
    price: 19.99,
    imageUrl: "/images/cotton-tote.jpg",
    brand: "EcoStyle",
    rating: 4.6,
    reviewCount: 89,
    carbonFootprint: {
      value: 0.3,
      unit: "kg",
    },
    ecoFeatures: ["Organic materials", "Biodegradable", "Fair trade"],
    affiliateLink: "https://example.com/cotton-tote",
  },
  {
    id: "4",
    name: "Bamboo Toothbrush",
    description: "Eco-friendly bamboo toothbrush with charcoal bristles",
    price: 4.99,
    imageUrl: "/images/bamboo-toothbrush.jpg",
    brand: "GreenSmile",
    rating: 4.7,
    reviewCount: 342,
    carbonFootprint: {
      value: 0.1,
      unit: "kg",
    },
    ecoFeatures: ["Biodegradable", "Natural bristles", "Plastic-free"],
    affiliateLink: "https://example.com/bamboo-toothbrush",
  },
  {
    id: "5",
    name: "Reusable Food Wraps",
    description: "Beeswax food wraps for sustainable food storage",
    price: 15.99,
    imageUrl: "/images/food-wraps.jpg",
    brand: "BeeGreen",
    rating: 4.4,
    reviewCount: 167,
    carbonFootprint: {
      value: 0.2,
      unit: "kg",
    },
    ecoFeatures: ["Beeswax-based", "Reusable", "Natural materials"],
    affiliateLink: "https://example.com/food-wraps",
  },
];

export const Marketplace: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [showError, setShowError] = useState(false);
  const errorMessage = "An error occurred. Please try again.";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleBuyNow = (product: Product) => {
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

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleShare = () => {
    setShowShareModal(true);
    if (navigator.share) {
      navigator
        .share({
          title: selectedProduct?.name,
          text: `Check out this eco-friendly product: ${selectedProduct?.name}`,
          url: window.location.href,
        })
        .catch(() => {
          setShowShareModal(false);
        });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
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

      {/* Product Detail Modal */}
      <Transition appear show={isDetailModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsDetailModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 shadow-xl transition-all ${
                    isDarkMode ? "bg-gray-800/95" : "bg-white/95"
                  } backdrop-blur-sm`}
                >
                  {selectedProduct && (
                    <div className="relative">
                      {/* Action Buttons */}
                      <div className="absolute right-0 top-0 flex space-x-2 z-10">
                        <button
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={`p-2 rounded-full transform transition-all duration-300 hover:scale-110 ${
                            isFavorite
                              ? "text-red-500"
                              : isDarkMode
                              ? "text-gray-400 hover:text-red-400"
                              : "text-gray-500 hover:text-red-500"
                          }`}
                          aria-label={
                            isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <HeartIcon
                            className={`h-6 w-6 ${
                              isFavorite ? "fill-current" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={handleShare}
                          className={`p-2 rounded-full transform transition-all duration-300 hover:scale-110 ${
                            isDarkMode
                              ? "text-gray-400 hover:text-blue-400"
                              : "text-gray-500 hover:text-blue-500"
                          }`}
                          aria-label="Share product"
                        >
                          <ShareIcon className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => setIsDetailModalOpen(false)}
                          className={`p-2 rounded-full transform transition-all duration-300 hover:scale-110 ${
                            isDarkMode
                              ? "text-gray-400 hover:text-white"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          aria-label="Close product details"
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Image with Enhanced UI */}
                        <div className="relative group">
                          <div className="relative aspect-square rounded-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105">
                            <img
                              src={selectedProduct.imageUrl}
                              alt={selectedProduct.name}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                          </div>
                          {/* Image Zoom Preview */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white rounded-lg shadow-lg transform translate-x-1/2 -translate-y-1/2 overflow-hidden">
                              <img
                                src={selectedProduct.imageUrl}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Product Info with Enhanced Typography */}
                          <div>
                            <h3
                              className={`text-3xl font-bold mb-2 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {selectedProduct.name}
                            </h3>
                            <p
                              className={`text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              by {selectedProduct.brand}
                            </p>
                          </div>

                          {/* Enhanced Rating Display */}
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-6 w-6 ${
                                    i < Math.floor(selectedProduct.rating)
                                      ? "text-yellow-400 fill-current"
                                      : isDarkMode
                                      ? "text-gray-600"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {selectedProduct.rating.toFixed(1)} (
                              {selectedProduct.reviewCount} reviews)
                            </span>
                          </div>

                          {/* Price with Animation */}
                          <div className="relative">
                            <p
                              className={`text-2xl font-bold ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              ${selectedProduct.price}
                            </p>
                            {selectedProduct.price < 50 && (
                              <span
                                className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-medium rounded-full ${
                                  isDarkMode
                                    ? "bg-green-900 text-green-300"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                Best Value
                              </span>
                            )}
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleQuantityChange(quantity - 1)}
                              className={`p-2 rounded-lg ${
                                isDarkMode
                                  ? "bg-gray-700 hover:bg-gray-600"
                                  : "bg-gray-100 hover:bg-gray-200"
                              }`}
                              disabled={quantity <= 1}
                            >
                              -
                            </button>
                            <span
                              className={`text-lg font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(quantity + 1)}
                              className={`p-2 rounded-lg ${
                                isDarkMode
                                  ? "bg-gray-700 hover:bg-gray-600"
                                  : "bg-gray-100 hover:bg-gray-200"
                              }`}
                              disabled={quantity >= 10}
                            >
                              +
                            </button>
                          </div>

                          {/* Enhanced Product Description */}
                          <div>
                            <p
                              className={`text-base leading-relaxed ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {selectedProduct.description}
                            </p>
                          </div>

                          {/* Enhanced Eco Features */}
                          <div>
                            <h4
                              className={`text-lg font-medium mb-3 ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Eco Features
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.ecoFeatures.map((feature) => (
                                <span
                                  key={feature}
                                  className={`px-4 py-2 rounded-full text-sm font-medium transform transition-all duration-200 hover:scale-105 ${
                                    isDarkMode
                                      ? "bg-green-900 text-green-300"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Enhanced Payment Section */}
                          <div className="space-y-4">
                            {/* Enhanced Buy Now Button */}
                            <button
                              onClick={() => {
                                handleBuyNow(selectedProduct);
                                handleAddToCart();
                              }}
                              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transform transition-all duration-200 hover:scale-105 ${
                                isDarkMode
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                            >
                              <ShoppingCartIcon className="h-5 w-5" />
                              <span>Add to Cart</span>
                            </button>

                            {/* Added to Cart Animation */}
                            <Transition
                              show={showAddedToCart}
                              enter="transition-opacity duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-300"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300">
                                Added to cart successfully!
                              </div>
                            </Transition>

                            {/* Enhanced Trust Indicators */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                              <div
                                className={`p-4 rounded-lg ${
                                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                                  <span
                                    className={`text-sm ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    Secure Payment
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`p-4 rounded-lg ${
                                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <TruckIcon className="h-5 w-5 text-green-500" />
                                  <span
                                    className={`text-sm ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    Fast Delivery
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Share Modal */}
      <Transition
        show={showShareModal}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-medium mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Share this product
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShareModal(false);
                }}
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Copy Link
              </button>
              <button
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out this eco-friendly product: ${selectedProduct?.name}`
                    )}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  );
                  setShowShareModal(false);
                }}
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                Share on Twitter
              </button>
            </div>
          </div>
        </div>
      </Transition>

      {/* Error Modal */}
      <Transition
        show={showError}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              <h3
                className={`text-lg font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Error
              </h3>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {errorMessage}
            </p>
            <button
              onClick={() => setShowError(false)}
              className={`mt-4 px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </Transition>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};
