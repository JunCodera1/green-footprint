import React from "react";
import {
  FileDown,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface ReportCardProps {
  period: string;
  totalEmissions: number;
  previousEmissions: number | null;
  categories: {
    name: string;
    value: number;
    percentage: number;
  }[];
  onExport: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  period,
  totalEmissions,
  previousEmissions,
  categories,
  onExport,
}) => {
  const percentageChange = previousEmissions
    ? ((totalEmissions - previousEmissions) / previousEmissions) * 100
    : null;

  const isImprovement = percentageChange ? percentageChange < 0 : false;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {period}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total CO₂ Emissions
          </p>
        </div>
        <button
          onClick={onExport}
          className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
          aria-label="Export report"
        >
          <FileDown className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalEmissions.toFixed(2)}
          </span>
          <span className="ml-1 text-gray-600 dark:text-gray-400">kg CO₂</span>
        </div>

        {percentageChange !== null && (
          <div
            className={`flex items-center mt-2 ${
              isImprovement ? "text-green-600" : "text-red-600"
            }`}
          >
            {isImprovement ? (
              <TrendingDown className="w-4 h-4 mr-1" />
            ) : (
              <TrendingUp className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(percentageChange).toFixed(1)}% vs previous period
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                {category.name}
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {category.value.toFixed(2)} kg
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {isImprovement && (
        <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            Great job! Your carbon footprint has decreased compared to the
            previous period.
          </p>
        </div>
      )}

      {!isImprovement && percentageChange !== null && (
        <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Your emissions have increased. Consider our recommendations to
            reduce your carbon footprint.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
