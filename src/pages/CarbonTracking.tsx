import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDarkMode } from "../contexts/DarkModeContext";
import {
  Car,
  Home,
  Utensils,
  Plus,
  ShoppingBag,
  Filter,
  Target,
} from "lucide-react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { AddActivityModal } from "../components/carbonTracking/AddActivityModal";
import { EditActivityModal } from "../components/carbonTracking/EditActivityModal";
import { AddGoalModal } from "../components/carbonTracking/AddGoalModal";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Activity {
  id: string;
  type: "transport" | "energy" | "food";
  description: string;
  co2Amount: number;
  timestamp: Date;
  icon: JSX.Element;
}

interface PersonalGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: Date;
}

const CarbonTracking: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isEditActivityOpen, setIsEditActivityOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [currentCO2, setCurrentCO2] = useState(750); // Monthly CO2 in kg
  const targetCO2 = 500; // Monthly target in kg
  const progressPercentage = (currentCO2 / targetCO2) * 100;
  const [filterType, setFilterType] = useState<
    "transport" | "energy" | "food" | "all"
  >("all");
  const [filterDate, setFilterDate] = useState<
    "today" | "week" | "month" | "all"
  >("all");

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "transport",
      description: "Car commute to work",
      co2Amount: 5.2,
      timestamp: new Date(),
      icon: <Car className="w-5 h-5" />,
    },
    {
      id: "2",
      type: "energy",
      description: "Home electricity usage",
      co2Amount: 3.8,
      timestamp: new Date(Date.now() - 86400000),
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "3",
      type: "food",
      description: "Vegetarian lunch",
      co2Amount: 1.2,
      timestamp: new Date(Date.now() - 172800000),
      icon: <Utensils className="w-5 h-5" />,
    },
  ]);

  const [personalGoals, setPersonalGoals] = useState<PersonalGoal[]>([
    {
      id: "1",
      title: "Reduce Transport Emissions",
      target: 100,
      current: 65,
      deadline: new Date(2024, 5, 1),
    },
    {
      id: "2",
      title: "Lower Energy Consumption",
      target: 200,
      current: 180,
      deadline: new Date(2024, 3, 15),
    },
    {
      id: "3",
      title: "Eat More Plant-based Meals",
      target: 50,
      current: 20,
      deadline: new Date(2024, 4, 1),
    },
  ]);

  // Chart data
  const donutData = {
    labels: ["Transport", "Energy", "Food"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily CO2 Emissions",
        data: [12, 19, 15, 17, 14, 13, 16],
        borderColor: isDarkMode
          ? "rgba(34, 197, 94, 1)"
          : "rgba(21, 128, 61, 1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddActivity = (newActivity: {
    type: "transport" | "energy" | "food";
    description: string;
    co2Amount: number;
    date: Date;
  }) => {
    const activity: Activity = {
      id: Math.random().toString(),
      ...newActivity,
      timestamp: newActivity.date,
      icon:
        newActivity.type === "transport" ? (
          <Car className="w-5 h-5" />
        ) : newActivity.type === "energy" ? (
          <Home className="w-5 h-5" />
        ) : (
          <Utensils className="w-5 h-5" />
        ),
    };
    setActivities((prev) => [activity, ...prev]);
    setCurrentCO2((prev) => prev + newActivity.co2Amount);
  };

  const handleEditActivity = (
    activityId: string,
    updatedActivity: {
      type: "transport" | "energy" | "food";
      description: string;
      co2Amount: number;
      date: Date;
    }
  ) => {
    setActivities((prev) => {
      const oldActivity = prev.find((a) => a.id === activityId);
      const newActivities = prev.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              ...updatedActivity,
              timestamp: updatedActivity.date,
              icon:
                updatedActivity.type === "transport" ? (
                  <Car className="w-5 h-5" />
                ) : updatedActivity.type === "energy" ? (
                  <Home className="w-5 h-5" />
                ) : (
                  <Utensils className="w-5 h-5" />
                ),
            }
          : activity
      );
      if (oldActivity) {
        setCurrentCO2(
          (prev) => prev - oldActivity.co2Amount + updatedActivity.co2Amount
        );
      }
      return newActivities;
    });
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities((prev) => {
      const activity = prev.find((a) => a.id === activityId);
      if (activity) {
        setCurrentCO2((prev) => prev - activity.co2Amount);
      }
      return prev.filter((a) => a.id !== activityId);
    });
  };

  const handleAddGoal = (newGoal: {
    title: string;
    target: number;
    deadline: Date;
  }) => {
    const goal: PersonalGoal = {
      id: Math.random().toString(),
      ...newGoal,
      current: 0,
    };
    setPersonalGoals((prev) => [...prev, goal]);
  };

  // Goal comparison chart data
  const goalComparisonData = {
    labels: personalGoals.map((goal) => goal.title),
    datasets: [
      {
        label: "Current",
        data: personalGoals.map((goal) => goal.current),
        backgroundColor: isDarkMode
          ? "rgba(34, 197, 94, 0.5)"
          : "rgba(21, 128, 61, 0.5)",
        borderColor: isDarkMode
          ? "rgba(34, 197, 94, 1)"
          : "rgba(21, 128, 61, 1)",
        borderWidth: 1,
      },
      {
        label: "Target",
        data: personalGoals.map((goal) => goal.target),
        backgroundColor: isDarkMode
          ? "rgba(59, 130, 246, 0.5)"
          : "rgba(37, 99, 235, 0.5)",
        borderColor: isDarkMode
          ? "rgba(59, 130, 246, 1)"
          : "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const goalChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true,
        title: {
          display: true,
          text: "CO₂ (kg)",
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
        },
      },
    },
  };

  const filteredActivities = activities.filter((activity) => {
    const typeMatch = filterType === "all" || activity.type === filterType;

    const now = new Date();
    const activityDate = new Date(activity.timestamp);
    let dateMatch = true;

    if (filterDate === "today") {
      dateMatch = activityDate.toDateString() === now.toDateString();
    } else if (filterDate === "week") {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      dateMatch = activityDate >= weekAgo;
    } else if (filterDate === "month") {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      dateMatch = activityDate >= monthAgo;
    }

    return typeMatch && dateMatch;
  });

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
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

      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
        {/* Header Section with Progress */}
        <div
          className={`max-w-7xl mx-auto mb-8 p-6 rounded-xl shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Carbon Footprint Tracker
          </h1>
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Monthly Progress
              </span>
              <span
                className={`text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {currentCO2} / {targetCO2} kg CO₂
              </span>
            </div>
            <div className="flex h-2 overflow-hidden bg-gray-200 rounded">
              <div
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                className={`${
                  progressPercentage > 100
                    ? "bg-red-500"
                    : progressPercentage > 80
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Logging Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <div
              className={`p-6 rounded-xl shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 flex items-center ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Activity Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) =>
                      setFilterType(e.target.value as typeof filterType)
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300"
                    }`}
                    title="Filter by activity type"
                  >
                    <option value="all">All Types</option>
                    <option value="transport">Transport</option>
                    <option value="energy">Energy</option>
                    <option value="food">Food</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Time Period
                  </label>
                  <select
                    value={filterDate}
                    onChange={(e) =>
                      setFilterDate(e.target.value as typeof filterDate)
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300"
                    }`}
                    title="Filter by time period"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Goals */}
            <div
              className={`p-6 rounded-xl shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-xl font-semibold flex items-center ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Target className="w-5 h-5 mr-2" />
                  Personal Goals
                </h2>
                <button
                  onClick={() => setIsAddGoalOpen(true)}
                  className="p-2 text-green-600 hover:text-green-700 rounded-lg"
                  aria-label="Add new goal"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {personalGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className={`font-medium ${
                          isDarkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {goal.title}
                      </h3>
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }
                        >
                          Progress: {goal.current}/{goal.target} kg CO₂
                        </span>
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }
                        >
                          {Math.round((goal.current / goal.target) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{
                            width: `${(goal.current / goal.target) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities with filtered results */}
            <div
              className={`p-6 rounded-xl shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Recent Activities
              </h2>
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedActivity(activity);
                      setIsEditActivityOpen(true);
                    }}
                  >
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        activity.type === "transport"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "energy"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-grow">
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {activity.description}
                      </p>
                      <div className="flex justify-between">
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {activity.co2Amount} kg CO₂
                        </p>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredActivities.length === 0 && (
                  <p
                    className={`text-center py-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No activities found for the selected filters
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Goal Comparison Chart */}
            <div
              className={`p-6 rounded-xl shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Goal Progress
              </h2>
              <div className="h-[300px]">
                <Bar data={goalComparisonData} options={goalChartOptions} />
              </div>
            </div>

            <div
              className={`p-6 rounded-xl shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Emissions by Category
              </h2>
              <div className="h-[300px] flex items-center justify-center">
                <Doughnut data={donutData} options={chartOptions} />
              </div>
            </div>

            <div
              className={`p-6 rounded-xl shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Weekly Trend
              </h2>
              <div className="h-[300px]">
                <Line data={lineData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsAddActivityOpen(true)}
          className="fixed right-6 bottom-6 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
          aria-label="Add new activity"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Carbon Offset CTA */}
        <div className="max-w-7xl mx-auto mt-8 mb-8">
          <div
            className={`p-6 rounded-xl shadow-lg text-center ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Want to offset your carbon footprint?
            </h2>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Support verified carbon offset projects and make a real impact
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Visit Carbon Marketplace
            </button>
          </div>
        </div>

        <AddActivityModal
          isOpen={isAddActivityOpen}
          onClose={() => setIsAddActivityOpen(false)}
          onAdd={handleAddActivity}
          isDarkMode={isDarkMode}
        />

        <EditActivityModal
          isOpen={isEditActivityOpen}
          onClose={() => {
            setIsEditActivityOpen(false);
            setSelectedActivity(null);
          }}
          activity={selectedActivity || undefined}
          onEdit={handleEditActivity}
          onDelete={handleDeleteActivity}
          isDarkMode={isDarkMode}
        />

        <AddGoalModal
          isOpen={isAddGoalOpen}
          onClose={() => setIsAddGoalOpen(false)}
          onAdd={handleAddGoal}
          isDarkMode={isDarkMode}
        />
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default CarbonTracking;
