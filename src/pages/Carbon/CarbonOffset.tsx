import React, { useState, useEffect } from "react";
import type { CarbonOffsetProject, OffsetPortfolio } from "../../types/offset";
import { OffsetProjectCard } from "../../components/offset/OffsetProjectCard";
import Navigation from "../../components/mainCompo/Navigation";
import Footer from "../../components/mainCompo/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { TreePine, Zap, Globe2, Filter } from "lucide-react";

// Mock data
const mockProjects: CarbonOffsetProject[] = [
  {
    id: "1",
    name: "Amazon Rainforest Conservation",
    description:
      "Protect and restore the Amazon rainforest through sustainable management and community engagement.",
    type: "tree-planting",
    provider: "Green Earth Initiative",
    location: "Brazil",
    pricePerTon: 15,
    availableTons: 5000,
    imageUrl: "/images/amazon-forest.jpg",
    verificationStandard: "Gold Standard",
    impactMetrics: {
      treesPlanted: 50000,
      jobsCreated: 120,
      areaProtected: 5000,
    },
    projectDuration: {
      start: "2024-01-01",
      end: "2029-12-31",
    },
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: "2",
    name: "Solar Farm Development",
    description:
      "Large-scale solar energy project providing clean electricity to rural communities.",
    type: "renewable-energy",
    provider: "Clean Energy Solutions",
    location: "India",
    pricePerTon: 12,
    availableTons: 8000,
    imageUrl: "/images/solar-farm.jpg",
    verificationStandard: "VCS",
    impactMetrics: {
      renewableEnergyGenerated: 50000,
      jobsCreated: 80,
    },
    projectDuration: {
      start: "2024-03-01",
      end: "2034-02-28",
    },
    rating: 4.6,
    reviewCount: 92,
  },
];

const mockPortfolio: OffsetPortfolio = {
  totalOffsets: 25,
  totalInvestment: 375,
  projects: [
    {
      offsetId: "1",
      amount: 15,
      purchaseDate: "2024-02-15",
    },
    {
      offsetId: "2",
      amount: 10,
      purchaseDate: "2024-03-01",
    },
  ],
  impactSummary: {
    totalCO2Offset: 25,
    treesPlanted: 250,
    renewableEnergy: 5000,
    communitiesSupported: 3,
  },
};

export const CarbonOffset: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePurchase = (project: CarbonOffsetProject) => {
    console.log("Purchasing credits from:", project);
  };

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

  const filteredProjects = mockProjects.filter((project) => {
    if (selectedType !== "all" && project.type !== selectedType) return false;
    if (
      project.pricePerTon < priceRange[0] ||
      project.pricePerTon > priceRange[1]
    )
      return false;
    return true;
  });

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

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Portfolio Summary */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8`}>
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <Globe2 className="w-8 h-8 text-blue-500" />
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mockPortfolio.totalOffsets} tons
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total CO₂ Offset
              </p>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <TreePine className="w-8 h-8 text-green-500" />
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mockPortfolio.impactSummary.treesPlanted}
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Trees Planted
              </p>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-yellow-500" />
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {mockPortfolio.impactSummary.renewableEnergy} kWh
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Clean Energy Generated
              </p>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${mockPortfolio.totalInvestment}
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Investment
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Carbon Offset Projects
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {showFilters && (
              <div
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-lg p-6 mb-6`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Project Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "border-gray-200"
                      }`}
                      aria-label="Filter projects by type"
                    >
                      <option value="all">All Types</option>
                      <option value="tree-planting">Tree Planting</option>
                      <option value="renewable-energy">Renewable Energy</option>
                      <option value="conservation">Conservation</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Price Range (per ton)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([+e.target.value, priceRange[1]])
                        }
                        className={`w-full border rounded-lg px-3 py-2 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "border-gray-200"
                        }`}
                        placeholder="Min"
                      />
                      <span
                        className={
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }
                      >
                        to
                      </span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], +e.target.value])
                        }
                        className={`w-full border rounded-lg px-3 py-2 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "border-gray-200"
                        }`}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <OffsetProjectCard
                key={project.id}
                project={project}
                onPurchase={handlePurchase}
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
