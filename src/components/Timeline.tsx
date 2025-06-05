import React from "react";
import { CheckCircle2 } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  isDarkMode: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ events, isDarkMode }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full ${
          isDarkMode ? "bg-green-600" : "bg-green-200"
        }`}
      ></div>

      <div className="relative z-10">
        {events.map((event, index) => (
          <div
            key={event.year}
            className={`flex items-center mb-12 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* Content */}
            <div className="w-5/12">
              <div
                className={`p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-green-50"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {event.year}
                </span>
                <h3
                  className={`text-xl font-bold mt-1 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {event.title}
                </h3>
                <p
                  className={`mt-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {event.description}
                </p>
              </div>
            </div>

            {/* Center Icon */}
            <div className="w-2/12 flex justify-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <CheckCircle2
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                />
              </div>
            </div>

            {/* Empty space for alignment */}
            <div className="w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
