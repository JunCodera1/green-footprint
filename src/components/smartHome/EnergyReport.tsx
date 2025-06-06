import React from "react";
import type { EnergyReportData } from "../../types/smartHome";
import {
  BarChart3,
  TrendingDown,
  Leaf,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

interface EnergyReportProps {
  report: EnergyReportData;
  isDarkMode?: boolean;
}

export const EnergyReport: React.FC<EnergyReportProps> = ({
  report,
  isDarkMode = false,
}) => {
  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Energy Report
          <span
            className={`text-sm ml-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            ({report.period})
          </span>
        </h2>
        <BarChart3
          className={`w-6 h-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              Total Consumption
            </span>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <p
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {report.totalConsumption} kWh
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
              Carbon Footprint
            </span>
            <Leaf className="w-5 h-5 text-green-500" />
          </div>
          <p
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {report.carbonFootprint} kg
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
              Cost Savings
            </span>
            <DollarSign className="w-5 h-5 text-yellow-500" />
          </div>
          <p
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            ${report.savings.cost}
          </p>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="mb-6">
        <h3
          className={`text-lg font-medium mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Device Breakdown
        </h3>
        <div className="space-y-3">
          {report.deviceBreakdown.map((device) => (
            <div key={device.deviceId} className="flex items-center">
              <div className="flex-grow">
                <div className="flex justify-between mb-1">
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Device {device.deviceId}
                  </span>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {device.consumption} kWh ({device.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3
          className={`text-lg font-medium mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recommendations
        </h3>
        <div className="space-y-4">
          {report.recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`p-2 rounded-lg ${
                    rec.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : rec.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-grow">
                  <h4
                    className={`text-base font-medium mb-1 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {rec.title}
                  </h4>
                  <p
                    className={`text-sm mb-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {rec.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Leaf className="w-4 h-4 text-green-500 mr-1" />
                      {rec.potentialSavings.carbon} kg CO₂
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 text-yellow-500 mr-1" />$
                      {rec.potentialSavings.cost}
                    </span>
                    <span className="flex items-center">
                      <TrendingDown className="w-4 h-4 text-blue-500 mr-1" />
                      {rec.potentialSavings.energy} kWh
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
