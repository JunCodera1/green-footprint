import React, { useState } from "react";
import { X, Lightbulb } from "lucide-react";
import type { AddAdviceModalProps } from "../../types/smartHome";

const impactLevels = ["High", "Medium", "Low"];

export const AddAdviceModal: React.FC<AddAdviceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  isDarkMode,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    impact: impactLevels[0],
    deviceType: "all",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd(formData);
      onClose();
      setFormData({
        title: "",
        description: "",
        impact: impactLevels[0],
        deviceType: "all",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black opacity-40"
          onClick={onClose}
        ></div>

        <div
          className={`relative w-full max-w-md p-6 rounded-xl shadow-xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 ${
              isDarkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-500"
            }`}
            title="Close modal"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center mb-6">
            <Lightbulb
              className={`w-6 h-6 mr-2 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            />
            <h2
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Add New Advice
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Title*
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                placeholder="e.g., Optimize Device Schedule"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Description*
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                placeholder="Describe your energy-saving advice..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Impact Level
              </label>
              <select
                value={formData.impact}
                onChange={(e) =>
                  setFormData({ ...formData, impact: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                title="Select impact level"
              >
                {impactLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Device Type
              </label>
              <select
                value={formData.deviceType}
                onChange={(e) =>
                  setFormData({ ...formData, deviceType: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                title="Select device type"
              >
                <option value="all">All Devices</option>
                <option value="Smart Light">Smart Lights</option>
                <option value="Smart Thermostat">Smart Thermostats</option>
                <option value="Smart Plug">Smart Plugs</option>
                <option value="Smart Lock">Smart Locks</option>
                <option value="Security Camera">Security Cameras</option>
                <option value="Smart Speaker">Smart Speakers</option>
                <option value="Smart TV">Smart TVs</option>
                <option value="Smart Curtain">Smart Curtains</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Advice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
