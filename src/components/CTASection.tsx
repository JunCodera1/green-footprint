import React from "react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

interface CTASectionProps {
  isDarkMode: boolean;
}


const CTASection: React.FC<CTASectionProps> = ({ isDarkMode }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl mx-auto max-w-7xl mb-12">
      <h2
        className={`text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent`}
      >
        Take Action Today
      </h2>
      <p
        className={`text-lg mb-8 max-w-2xl mx-auto ${
          isDarkMode ? "text-black" : "text-gray-600"
        }`}
      >
        Join thousands of others in reducing your carbon footprint. Start your
        journey with our tools and insights.
      </p>
      <div className="space-x-4">
        <Link
          to="/carbon-footprint-calculator"
          className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Your Footprint
        </Link>
        <button className="bg-gray-200 text-gray-800 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default CTASection;
