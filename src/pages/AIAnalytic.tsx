import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCard from "../components/AnimatedCard";
import PageTransition from "../components/PageTransition";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

interface AnalyticData {
carbonFootprint: number;
energyUsage: number;
wasteProduction: number;
sustainabilityScore: number;
recommendations: string[];
trends: {
label: string;
value: number;
change: number;
}[];
}

const LoadingState = () => (
<PageTransition>
<div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
</div>
</PageTransition>
);

const AIAnalytic: React.FC = () => {
const [data, setData] = useState<AnalyticData | null>(null);
const [loading, setLoading] = useState(true);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrollY, setScrollY] = useState(0);
const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
const handleScroll = () => {
    setScrollY(window.scrollY);
};

window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
if (isDarkMode) {
    document.documentElement.classList.add("dark");
    document.documentElement.style.setProperty('--tw-bg-opacity', '1');
} else {
    document.documentElement.classList.remove("dark");
}
}, [isDarkMode]);

const toggleDarkMode = () => {
setIsDarkMode(!isDarkMode);
};

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
e.preventDefault();
const element = document.querySelector(href);
if (element) {
    element.scrollIntoView({ behavior: "smooth" });
}
};

useEffect(() => {
// Simulate API call
setTimeout(() => {
    setData({
    carbonFootprint: 12.5,
    energyUsage: 450,
    wasteProduction: 25,
    sustainabilityScore: 85,
    recommendations: [
        "Switch to renewable energy sources",
        "Implement smart energy management",
        "Reduce single-use plastics",
        "Optimize transportation routes",
    ],
    trends: [
        { label: "Carbon Emissions", value: 12.5, change: -2.3 },
        { label: "Energy Consumption", value: 450, change: -5.1 },
        { label: "Waste Management", value: 25, change: -1.8 },
        { label: "Water Usage", value: 320, change: -3.2 },
    ],
    });
    setLoading(false);
}, 1500);
}, []);

if (loading) {
return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-green-50"}`}>
    <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
    />
    <LoadingState />
    <Footer isDarkMode={isDarkMode} />
    </div>
);
}

return (
<div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-green-50"}`}>
    {/* Navigation */}
    <Navigation
    scrollY={scrollY}
    isMenuOpen={isMenuOpen}
    setIsMenuOpen={setIsMenuOpen}
    isDarkMode={isDarkMode}
    toggleDarkMode={toggleDarkMode}
    handleLinkClick={handleLinkClick}
    />

    {/* Hero Section - Darker in dark mode */}
    <div className={`bg-gradient-to-r from-green-300 to-teal-600 text-white py-16 shadow-lg ${isDarkMode ? "dark:from-gray-800 dark:to-gray-900" : ""}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
        <Leaf className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Environmental Analytics</h1>
        <p className="text-xl text-green-100 max-w-3xl mx-auto">
        Advanced insights and recommendations powered by artificial intelligence
        </p>
        <div className="mt-6 text-green-200">
        <p>
            🌱 {data?.recommendations.length} personalized recommendations for your sustainability journey
        </p>
        </div>
    </div>
    </div>

    <PageTransition>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data?.trends.map((trend) => (
            <AnimatedCard
            key={trend.label}
            title={trend.label}
            description={`Current: ${trend.value} units`}
            badge={`${trend.change > 0 ? "+" : ""}${trend.change}%`}
            className={`${
                trend.change < 0 ? "border-green-500" : "border-red-500"
            } border-2 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            />
        ))}
        </div>

        {/* Sustainability Score */}
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mb-8 p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
        >
        <h2 className="text-2xl font-semibold mb-4">
            Sustainability Score
        </h2>
        <div className="relative h-4 rounded-full overflow-hidden">
            <div className={`absolute h-full w-full ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`} />
            <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data?.sustainabilityScore}%` }}
            className="absolute h-full bg-green-500"
            transition={{ duration: 1, ease: "easeOut" }}
            />
        </div>
        <p className="mt-2">
            Your current sustainability score: {data?.sustainabilityScore}%
        </p>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
        >
        <h2 className="text-2xl font-semibold mb-4">
            AI Recommendations
        </h2>
        <div className="grid gap-4">
            {data?.recommendations.map((recommendation, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg transition-colors duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-green-50"
                }`}
            >
                <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                {recommendation}
                </p>
            </motion.div>
            ))}
        </div>
        </motion.div>

        {/* Additional CTA */}
        <div className={`mt-8 p-6 rounded-xl shadow-lg transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
        }`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
            Want More Insights?
        </h2>
        <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Visit our blog for more sustainability tips and success stories.
        </p>
        <Link
            to="/blog"
            className={`inline-block py-2 px-6 rounded-lg transition-colors ${
            isDarkMode 
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
            Go to Blog
        </Link>
        </div>
    </main>
    </PageTransition>

    {/* Footer */}
    <Footer isDarkMode={isDarkMode} />
</div>
);
};

export default AIAnalytic;