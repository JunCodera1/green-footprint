import React from "react";
import {
TrendingUp,
Users,
Globe,
Wind,
Thermometer,
TreePine,
AlertTriangle,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {
ComposableMap,
Geographies,
Geography,
ZoomableGroup,
} from "react-simple-maps";

// Add type for Geography feature
interface GeographyType {
rsmKey: string;
id: string;
type: string;
properties: {
name: string;
};
geometry: {
type: string;
coordinates: number[][];
};
}

// Mock data for global statistics
const globalStats = {
currentCO2: 418.32, // ppm
yearlyChange: 2.5,
totalUsers: 125000,
treesPlanted: 50000,
carbonReduced: 25000, // tons
};

// Mock data for trending environmental topics
const trendingTopics = [
{
id: 1,
topic: "Amazon Rainforest Conservation",
mentions: 25420,
trend: "+15%",
sentiment: "positive",
},
{
id: 2,
topic: "Ocean Plastic Crisis",
mentions: 18650,
trend: "+28%",
sentiment: "negative",
},
{
id: 3,
topic: "Renewable Energy Growth",
mentions: 15800,
trend: "+42%",
sentiment: "positive",
},
];

// Mock data for community impact
const communityImpact = [
{
id: 1,
title: "Carbon Reduction",
value: "25,000",
unit: "tons CO₂",
change: "+12%",
icon: <Wind className="w-6 h-6" />,
},
{
id: 2,
title: "Trees Planted",
value: "50,000",
unit: "trees",
change: "+8%",
icon: <TreePine className="w-6 h-6" />,
},
{
id: 3,
title: "Active Users",
value: "125,000",
unit: "users",
change: "+25%",
icon: <Users className="w-6 h-6" />,
},
];

// Mock data for most polluted regions (simplified)
const pollutionData = {
type: "FeatureCollection",
features: [
{ id: "CHN", value: 85 },
{ id: "USA", value: 65 },
{ id: "IND", value: 80 },
{ id: "RUS", value: 70 },
{ id: "BRA", value: 45 },
],
};

const GlobalStatistics: React.FC = () => {
return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navigation
    scrollY={0}
    isMenuOpen={false}
    setIsMenuOpen={() => {}}
    isDarkMode={false}
    toggleDarkMode={() => {}}
    handleLinkClick={() => {}}
    />

    {/* Hero Section with Real-time CO2 Data */}
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
        <Globe className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">
            Global Environmental Impact
        </h1>
        <div className="flex justify-center items-center space-x-4">
            <div className="text-center">
            <p className="text-5xl font-bold">{globalStats.currentCO2}</p>
            <p className="text-sm opacity-75">Current CO₂ (ppm)</p>
            </div>
            <div className="text-center">
            <p className="text-2xl font-bold text-red-300">
                +{globalStats.yearlyChange}
            </p>
            <p className="text-sm opacity-75">Yearly Change</p>
            </div>
        </div>
        </div>
    </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Global Pollution Heatmap */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
        <Thermometer className="w-6 h-6 mr-2 text-red-500" />
        Global Pollution Heatmap
        </h2>
        <div className="h-[500px] relative">
        <ComposableMap projectionConfig={{ scale: 147 }}>
            <ZoomableGroup>
            <Geographies geography="/world-110m.json">
                {({ geographies }: { geographies: GeographyType[] }) =>
                geographies.map((geo: GeographyType) => {
                    const pollutionLevel =
                    pollutionData.features.find((f) => f.id === geo.id)
                        ?.value || 0;
                    return (
                    <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={`rgba(255, 87, 87, ${pollutionLevel / 100})`}
                        stroke="#FFF"
                        strokeWidth={0.5}
                    />
                    );
                })
                }
            </Geographies>
            </ZoomableGroup>
        </ComposableMap>
        </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
        {/* Trending Environmental Topics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
            Trending Topics
        </h2>
        <div className="space-y-4">
            {trendingTopics.map((topic) => (
            <div
                key={topic.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
                <div>
                <h3 className="font-semibold dark:text-white">
                    {topic.topic}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {topic.mentions.toLocaleString()} mentions
                </p>
                </div>
                <div
                className={`text-sm font-bold ${
                    topic.sentiment === "positive"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
                >
                {topic.trend}
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* Community Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
            <Users className="w-6 h-6 mr-2 text-green-500" />
            Community Impact
        </h2>
        <div className="grid gap-4">
            {communityImpact.map((stat) => (
            <div
                key={stat.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
                <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                    {stat.icon}
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                    </p>
                    <p className="text-xl font-bold dark:text-white">
                    {stat.value}{" "}
                    <span className="text-sm font-normal text-gray-500">
                        {stat.unit}
                    </span>
                    </p>
                </div>
                </div>
                <div className="text-green-500 font-bold">{stat.change}</div>
            </div>
            ))}
        </div>
        </div>
    </div>

    {/* Alert Section */}
    <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center">
        <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
        <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Critical Areas Requiring Attention
            </h3>
            <p className="text-red-600 dark:text-red-300 mt-1">
            Several regions show dangerous levels of pollution requiring
            immediate action. Join our initiatives to help make a
            difference.
            </p>
        </div>
        </div>
    </div>
    </div>

    <Footer isDarkMode={false} />
</div>
);
};

export default GlobalStatistics;
