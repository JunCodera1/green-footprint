import React from "react";
import { Check, X, Info, Shield, Lock, Eye } from "lucide-react";

interface Props {
  isDarkMode: boolean;
}

const PrivacyComparison: React.FC<Props> = ({ isDarkMode }) => {
  const comparisonData = [
    {
      feature: "Data Control",
      ours: {
        has: true,
        description: "Full control over data collection and usage",
      },
      industry: {
        has: false,
        description: "Limited or no control over data collection",
      },
      icon: <Shield className="w-6 h-6" />,
    },
    {
      feature: "Data Access",
      ours: {
        has: true,
        description: "Download your data anytime in readable format",
      },
      industry: {
        has: false,
        description: "Complex process to access personal data",
      },
      icon: <Lock className="w-6 h-6" />,
    },
    {
      feature: "Transparency",
      ours: {
        has: true,
        description: "Clear explanation of data usage and processing",
      },
      industry: {
        has: false,
        description: "Unclear or complex privacy terms",
      },
      icon: <Eye className="w-6 h-6" />,
    },
  ];

  return (
    <div
      className={`rounded-lg shadow-lg p-6 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Privacy Policy Comparison
        </h2>
        <Info
          className={`w-6 h-6 ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}
        />
      </div>

      <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        See how our privacy practices compare to typical industry standards
      </p>

      {/* Comparison Grid */}
      <div className="space-y-6">
        {comparisonData.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {/* Feature */}
            <div className="flex items-center space-x-3">
              {React.cloneElement(item.icon, {
                className: `${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`,
              })}
              <span
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.feature}
              </span>
            </div>

            {/* Our Policy */}
            <div
              className={`flex items-start space-x-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">GreenFootprint</p>
                <p className="text-sm mt-1">{item.ours.description}</p>
              </div>
            </div>

            {/* Industry Standard */}
            <div
              className={`flex items-start space-x-3 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="font-medium">Industry Standard</p>
                <p className="text-sm mt-1">{item.industry.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div
        className={`mt-8 p-4 rounded-lg border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600"
            : "bg-green-50 border-green-100"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Our Commitment
        </h3>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          We believe in setting new standards for privacy in environmental
          impact tracking. Our commitment to transparency and user control goes
          beyond industry norms, ensuring you always know exactly what data is
          collected and how it's used.
        </p>
      </div>

      {/* Legal Notice */}
      <p
        className={`mt-6 text-xs ${
          isDarkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        * Industry standard comparisons based on analysis of major carbon
        footprint tracking applications as of 2024. Individual practices may
        vary.
      </p>
    </div>
  );
};

export default PrivacyComparison;
