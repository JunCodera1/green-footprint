import React from "react";
import type { RegionalData } from "../../types/localization";
import {
  MapPin,
  Cloud,
  Zap,
  Leaf,
  Bus,
  Building,
  Award,
  AlertTriangle,
} from "lucide-react";

interface RegionalDashboardProps {
  data: RegionalData;
  onProgramSelect: (programId: string) => void;
  onIncentiveSelect: (incentiveId: string) => void;
  isDarkMode?: boolean;
}

export const RegionalDashboard: React.FC<RegionalDashboardProps> = ({
  data,
  onProgramSelect,
  onIncentiveSelect,
  isDarkMode = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Region Header */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg p-6`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-blue-500 mr-2" />
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {data.region.name}, {data.region.country}
              </h2>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Timezone: {data.region.timezone}
            </p>
          </div>
        </div>
      </div>

      {/* Climate Data */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg p-6`}
      >
        <h3
          className={`text-lg font-medium mb-4 flex items-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Cloud className="w-5 h-5 mr-2 text-blue-500" />
          Climate Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Carbon Intensity
              </span>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {data.climate.carbonIntensity}
              <span className="text-sm ml-1">gCO₂/kWh</span>
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Renewable Energy
              </span>
              <Leaf className="w-5 h-5 text-green-500" />
            </div>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {data.climate.renewablePercentage}%
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Season
              </span>
              <Cloud className="w-5 h-5 text-blue-500" />
            </div>
            <p
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {data.climate.seasonality.current}
            </p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Next change:{" "}
              {new Date(
                data.climate.seasonality.nextChange
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Transportation */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg p-6`}
      >
        <h3
          className={`text-lg font-medium mb-4 flex items-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Bus className="w-5 h-5 mr-2 text-green-500" />
          Transportation Options
        </h3>
        <div className="space-y-4">
          {data.transportation.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {option.type}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    option.availability === "high"
                      ? "bg-green-100 text-green-800"
                      : option.availability === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {option.availability} availability
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Carbon footprint: {option.carbonPerKm} gCO₂/km
              </p>
            </div>
          ))}
          <div className="mt-4">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Public Transit Coverage:{" "}
              <span className="font-medium">
                {data.transportation.publicTransitCoverage}%
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Programs & Incentives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sustainability Programs */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg p-6`}
        >
          <h3
            className={`text-lg font-medium mb-4 flex items-center ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <Building className="w-5 h-5 mr-2 text-purple-500" />
            Sustainability Programs
          </h3>
          <div className="space-y-4">
            {data.programs.map((program) => (
              <button
                key={program.id}
                onClick={() => onProgramSelect(program.id)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {program.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {program.organization}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      program.type === "government"
                        ? "bg-blue-100 text-blue-800"
                        : program.type === "ngo"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {program.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Incentives */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg p-6`}
        >
          <h3
            className={`text-lg font-medium mb-4 flex items-center ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Available Incentives
          </h3>
          <div className="space-y-4">
            {data.incentives.map((incentive) => (
              <button
                key={incentive.id}
                onClick={() => onIncentiveSelect(incentive.id)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {incentive.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {incentive.provider}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      incentive.type === "tax"
                        ? "bg-green-100 text-green-800"
                        : incentive.type === "rebate"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {incentive.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {incentive.amount.type === "fixed"
                      ? `$${incentive.amount.value}`
                      : `${incentive.amount.value}%`}
                  </span>
                  {incentive.deadline && (
                    <span className="flex items-center text-yellow-500">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Expires:{" "}
                      {new Date(incentive.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
