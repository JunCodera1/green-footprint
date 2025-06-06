import React, { useState } from "react";
import { X, Car, Home, Utensils } from "lucide-react";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (activity: {
    type: "transport" | "energy" | "food";
    description: string;
    co2Amount: number;
    date: Date;
  }) => void;
  isDarkMode: boolean;
}

const activityTypes = [
  { id: "transport", label: "Transport", icon: <Car className="w-5 h-5" /> },
  { id: "energy", label: "Energy", icon: <Home className="w-5 h-5" /> },
  { id: "food", label: "Food", icon: <Utensils className="w-5 h-5" /> },
];

const presetActivities = {
  transport: [
    { label: "Car commute", co2: 2.3 },
    { label: "Bus ride", co2: 0.8 },
    { label: "Train journey", co2: 0.4 },
  ],
  energy: [
    { label: "Home electricity", co2: 3.8 },
    { label: "Heating", co2: 5.2 },
    { label: "Air conditioning", co2: 4.1 },
  ],
  food: [
    { label: "Meat-based meal", co2: 3.5 },
    { label: "Vegetarian meal", co2: 1.2 },
    { label: "Vegan meal", co2: 0.8 },
  ],
};

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  isDarkMode,
}) => {
  const [selectedType, setSelectedType] = useState<
    "transport" | "energy" | "food"
  >("transport");
  const [description, setDescription] = useState("");
  const [co2Amount, setCo2Amount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePresetSelect = (preset: { label: string; co2: number }) => {
    setDescription(preset.label);
    setCo2Amount(preset.co2.toString());
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!co2Amount || isNaN(Number(co2Amount))) {
      newErrors.co2Amount = "Valid CO2 amount is required";
    }
    if (!date) {
      newErrors.date = "Date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd({
        type: selectedType,
        description,
        co2Amount: Number(co2Amount),
        date: new Date(date),
      });
      onClose();
      // Reset form
      setSelectedType("transport");
      setDescription("");
      setCo2Amount("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-40"
          onClick={onClose}
        />

        <div
          className={`relative inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className={`rounded-md p-1 inline-flex items-center justify-center ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-100 text-gray-500"
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3
            className={`text-lg font-medium leading-6 mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Add New Activity
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Activity Type Selection */}
            <div className="grid grid-cols-3 gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setSelectedType(type.id as typeof selectedType)
                  }
                  className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${
                    selectedType === type.id
                      ? isDarkMode
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-800"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type.icon}
                  <span className="mt-1 text-sm">{type.label}</span>
                </button>
              ))}
            </div>

            {/* Preset Activities */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Quick Select
              </label>
              <div className="grid grid-cols-1 gap-2">
                {presetActivities[selectedType].map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-2 text-left text-sm rounded-lg transition-colors ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {preset.label} ({preset.co2} kg CO₂)
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                placeholder="e.g., Car commute to work"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* CO2 Amount */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                CO2 Amount (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={co2Amount}
                onChange={(e) => setCo2Amount(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                placeholder="0.0"
              />
              {errors.co2Amount && (
                <p className="mt-1 text-sm text-red-500">{errors.co2Amount}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="activity-date"
              >
                Date
              </label>
              <input
                id="activity-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                title="Activity date"
                aria-label="Activity date"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>

            {/* Submit Button */}
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
                Add Activity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
