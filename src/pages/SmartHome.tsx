import React, { useState } from "react";
import { DeviceCard } from "../components/smartHome/DeviceCard";
import { EnergyReport } from "../components/smartHome/EnergyReport";
import type { SmartDevice, EnergyReportData } from "../types/smartHome";
import { Plus, Settings, Download } from "lucide-react";

interface SmartHomeProps {
  isDarkMode?: boolean;
}

export const SmartHome: React.FC<SmartHomeProps> = ({ isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState<"devices" | "reports">("devices");
  const [devices, setDevices] = useState<SmartDevice[]>([]); // In a real app, this would be fetched from an API
  const [reports, setReports] = useState<EnergyReportData[]>([]); // In a real app, this would be fetched from an API

  const handleDeviceToggle = (deviceId: string, status: boolean) => {
    // In a real app, this would make an API call
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? { ...device, status: status ? "online" : "offline" }
          : device
      )
    );
  };

  const handleDeviceSettings = (deviceId: string) => {
    // In a real app, this would open a settings modal/page
    console.log("Opening settings for device:", deviceId);
  };

  const handleAddDevice = () => {
    // In a real app, this would open a device setup wizard
    console.log("Opening device setup wizard");
  };

  const handleExportReport = (reportId: string) => {
    // In a real app, this would trigger a report download
    console.log("Exporting report:", reportId);
    setReports((prev) => prev); // Dummy update to satisfy TypeScript
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Smart Home Dashboard
        </h1>
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Monitor and optimize your home's energy consumption
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("devices")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "devices"
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Devices
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "reports"
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Energy Reports
        </button>
      </div>

      {/* Content */}
      {activeTab === "devices" ? (
        <div>
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Connected Devices
            </h2>
            <button
              onClick={handleAddDevice}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Device
            </button>
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onSettings={handleDeviceSettings}
                onToggle={handleDeviceToggle}
                isDarkMode={isDarkMode}
              />
            ))}
            {devices.length === 0 && (
              <div
                className={`col-span-full text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No devices connected</p>
                <p className="text-sm">
                  Click the "Add Device" button to set up your first smart
                  device
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Reports List */}
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.period}>
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-xl font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {report.period.charAt(0).toUpperCase() +
                      report.period.slice(1)}{" "}
                    Report
                  </h3>
                  <button
                    onClick={() => handleExportReport(report.period)}
                    className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                </div>
                <EnergyReport report={report} isDarkMode={isDarkMode} />
              </div>
            ))}
            {reports.length === 0 && (
              <div
                className={`text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No reports available</p>
                <p className="text-sm">
                  Connect devices and start tracking your energy consumption to
                  generate reports
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
