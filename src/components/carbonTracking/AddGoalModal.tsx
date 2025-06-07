import React, { useState } from "react";
import { X } from "lucide-react";
import type { AddGoalModalProps } from "../../types/carbonTracking";

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  isDarkMode,
}) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!target || isNaN(Number(target)) || Number(target) <= 0) {
      newErrors.target = "Valid target amount is required";
    }
    if (!deadline) {
      newErrors.deadline = "Deadline is required";
    } else if (new Date(deadline) <= new Date()) {
      newErrors.deadline = "Deadline must be in the future";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd({
        title,
        target: Number(target),
        deadline: new Date(deadline),
      });
      onClose();
      // Reset form
      setTitle("");
      setTarget("");
      setDeadline(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      );
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
            Add New Goal
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="goal-title"
              >
                Goal Title
              </label>
              <input
                id="goal-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                placeholder="e.g., Reduce Transport Emissions"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Target */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="goal-target"
              >
                Target (kg CO₂)
              </label>
              <input
                id="goal-target"
                type="number"
                step="0.1"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                placeholder="0.0"
              />
              {errors.target && (
                <p className="mt-1 text-sm text-red-500">{errors.target}</p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="goal-deadline"
              >
                Deadline
              </label>
              <input
                id="goal-deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500`}
                aria-label="Goal deadline"
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
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
                Add Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
