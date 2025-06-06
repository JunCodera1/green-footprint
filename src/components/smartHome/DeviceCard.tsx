import React from "react";
import type { SmartDevice } from "../../types/smartHome";
import {
  Thermometer,
  Lightbulb,
  Power,
  Sun,
  Activity,
  Settings,
} from "lucide-react";

interface DeviceCardProps {
  device: SmartDevice;
  onSettings: (deviceId: string) => void;
  onToggle: (deviceId: string, status: boolean) => void;
  isDarkMode?: boolean;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onSettings,
  onToggle,
  isDarkMode = false,
}) => {
  const renderIcon = () => {
    const iconProps = { className: "w-6 h-6" };
    switch (device.type) {
      case "thermostat":
        return <Thermometer {...iconProps} />;
      case "light":
        return <Lightbulb {...iconProps} />;
      case "plug":
        return <Power {...iconProps} />;
      case "solar":
        return <Sun {...iconProps} />;
      default:
        return <Activity {...iconProps} />;
    }
  };

  const getStatusColor = () => {
    switch (device.status) {
      case "online":
        return "text-green-500";
      case "offline":
        return "text-gray-400";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6 transition-all hover:shadow-xl`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div
            className={`p-3 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            } ${getStatusColor()}`}
          >
            {renderIcon()}
          </div>
          <div className="ml-4">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {device.name}
            </h3>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {device.location}
            </p>
          </div>
        </div>
        <button
          onClick={() => onSettings(device.id)}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? "hover:bg-gray-700 text-gray-400"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          aria-label={`Settings for ${device.name}`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Current Consumption
            </p>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {device.lastReading.value}
              <span className="text-sm ml-1">{device.lastReading.unit}</span>
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Carbon Footprint
            </p>
            <p
              className={`text-lg font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {device.carbonFootprint}
              <span className="text-sm ml-1">kg CO₂</span>
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${getStatusColor()}`}
              />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={device.status === "online"}
                onChange={(e) => onToggle(device.id, e.target.checked)}
                aria-label={`Toggle ${device.name}`}
              />
              <div
                className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  isDarkMode
                    ? "bg-gray-700 peer-checked:bg-green-600"
                    : "bg-gray-200 peer-checked:bg-green-500"
                }`}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
