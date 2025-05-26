import React from "react";
import type { Stat } from "../types";

interface StatsSectionProps {
  stats: Stat[];
  isDarkMode: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats, isDarkMode }) => {
  return (
    <section
      className={`py-20 backdrop-blur-sm ${
        isDarkMode ? "bg-gray-800/50" : "bg-white/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30"
                    : "bg-gradient-to-br from-emerald-100 to-teal-100"
                }`}
              >
                <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p
                  className={`mt-2 font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
