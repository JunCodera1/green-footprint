import React from "react";
import { Download, UserX, Shield } from "lucide-react";
import type { Props } from "../../types/privacy/permission-manager";

const PermissionManager: React.FC<Props> = ({
  categories,
  onToggleCategory,
  onDownloadData,
  onDeleteAccount,
  isDarkMode,
}) => {
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
          Permission Manager
        </h2>
        <Shield
          className={`w-6 h-6 ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}
        />
      </div>

      {/* Data Tracking Toggles */}
      <div className="space-y-6 mb-8">
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Control what data you share with us. Toggle categories on/off at any
          time.
        </p>

        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <div>
                <h3
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {category.isEnabled
                    ? "Currently tracking this data"
                    : "Data tracking disabled"}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={category.isEnabled}
                  onChange={() => onToggleCategory(category.id)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    isDarkMode
                      ? "bg-gray-600 peer-checked:bg-green-500"
                      : "bg-gray-300 peer-checked:bg-green-500"
                  }`}
                />
                <span className="sr-only">
                  {category.isEnabled ? "Disable" : "Enable"} {category.name}{" "}
                  data tracking
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account Management */}
      <div
        className={`border-t ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } pt-6`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Account Management
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Download Data */}
          <button
            type="button"
            onClick={onDownloadData}
            className={`flex items-center justify-center p-4 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            <Download className="w-5 h-5 mr-2" />
            Download My Data
          </button>

          {/* Delete Account */}
          <button
            type="button"
            onClick={onDeleteAccount}
            className="flex items-center justify-center p-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            <UserX className="w-5 h-5 mr-2" />
            Delete Account
          </button>
        </div>

        <p
          className={`mt-4 text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your data will be provided in a machine-readable format within 48
          hours. Account deletion is immediate and permanent.
        </p>
      </div>
    </div>
  );
};

export default PermissionManager;
