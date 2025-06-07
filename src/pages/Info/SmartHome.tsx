import React, { useState, useEffect } from "react";
import { DeviceCard } from "../../components/smartHome/DeviceCard";
import { EnergyReport } from "../../components/smartHome/EnergyReport";
import type {
  SmartDevice,
  EnergyReportData,
  DeviceType,
  DeviceLocation,
} from "../../types/smartHome";
import { Plus, Settings, Download, Home } from "lucide-react";
import Navigation from "../../components/mainCompo/Navigation";
import Footer from "../../components/mainCompo/Footer";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { AddDeviceModal } from "../../components/smartHome/AddDeviceModal";
import { v4 as uuidv4 } from "uuid";

export const SmartHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"devices" | "reports">("devices");
  const [devices, setDevices] = useState<SmartDevice[]>([]);
  const [reports, setReports] = useState<EnergyReportData[]>([]);
  const [scrollY, setScrollY] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeviceToggle = (deviceId: string, status: boolean) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? { ...device, status: status ? "online" : "offline" }
          : device
      )
    );
  };

  const handleDeviceSettings = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (device) {
      console.log("Opening settings for device:", device.name);
      // Thêm logic mở modal settings ở đây nếu cần
    }
  };

  const generateReport = (newDevice?: SmartDevice) => {
    const allDevices = newDevice ? [...devices, newDevice] : devices;
    const totalUsage = allDevices.reduce(
      (total, device) => total + device.energyUsage.monthly,
      0
    );

    const newReport: EnergyReportData = {
      period: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      totalUsage,
      savings: Math.round(totalUsage * 0.15 * 100) / 100, // Giả định tiết kiệm 15%
      comparison: {
        previousPeriod: totalUsage * 1.15, // Giả định kỳ trước cao hơn 15%
        change: -15,
      },
      deviceBreakdown: allDevices.map((device) => ({
        deviceId: device.id,
        usage: device.energyUsage.monthly,
        percentage: (device.energyUsage.monthly / totalUsage) * 100,
      })),
      recommendations: [
        "Set up automatic schedules for optimal energy usage",
        "Enable eco-mode during peak hours",
        "Consider upgrading to more energy-efficient models",
        newDevice
          ? `Configure energy-saving settings for your new ${newDevice.type}`
          : "",
      ].filter(Boolean),
    };

    setReports((prev) => [...prev, newReport]);
  };

  const handleAddDevice = (deviceData: {
    name: string;
    type: string;
    location: string;
    manufacturer: string;
    model: string;
  }) => {
    const newDevice: SmartDevice = {
      id: uuidv4(),
      name: deviceData.name,
      type: deviceData.type as DeviceType,
      location: deviceData.location as DeviceLocation,
      manufacturer: deviceData.manufacturer,
      model: deviceData.model,
      status: "offline",
      lastUpdated: new Date().toISOString(),
      energyUsage: {
        current: Math.random() * 100, // Giả lập dữ liệu
        daily: Math.random() * 1000,
        weekly: Math.random() * 5000,
        monthly: Math.random() * 20000,
      },
    };

    setDevices((prev) => [...prev, newDevice]);
    generateReport(newDevice);

    // Hiển thị thông báo thành công (có thể thêm toast notification ở đây)
    console.log(`Added new ${newDevice.type}: ${newDevice.name}`);
  };

  const handleExportReport = (reportId: string) => {
    const report = reports.find((r) => r.period === reportId);
    if (report) {
      const reportData = JSON.stringify(report, null, 2);
      const blob = new Blob([reportData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `energy-report-${reportId
        .toLowerCase()
        .replace(/\s+/g, "-")}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-green-50"
      }`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />

      {/* Hero Section */}
      <div
        className={`bg-gradient-to-r from-green-300 to-teal-600 text-white py-16 shadow-lg ${
          isDarkMode ? "dark:from-green-700 dark:to-teal-800" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Home className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Smart Home Dashboard</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Monitor and optimize your home's energy consumption for a
            sustainable future
          </p>
          <div className="mt-6 text-green-200">
            <p>
              🏠 {devices.length} Connected Devices | 📊 {reports.length} Energy
              Reports
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("devices")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "devices"
                ? isDarkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
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
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
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
                onClick={() => setIsAddDeviceModalOpen(true)}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-500 text-white hover:bg-green-600"
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
                <div
                  key={report.period}
                  className={`p-6 rounded-xl shadow-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
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
                    Connect devices and start tracking your energy consumption
                    to generate reports
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Device Modal */}
      <AddDeviceModal
        isOpen={isAddDeviceModalOpen}
        onClose={() => setIsAddDeviceModalOpen(false)}
        onAdd={handleAddDevice}
        isDarkMode={isDarkMode}
      />

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default SmartHome;
