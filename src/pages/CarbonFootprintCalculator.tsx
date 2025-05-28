import React, { useState, useEffect } from "react";
import {
  Car,
  Home,
  UtensilsCrossed,
  ShoppingCart,
  BarChart3,
  Leaf,
  Target,
  TrendingDown,
  Calculator,
  ChevronRight,
  ChevronLeft,
  Globe,
  Award,
  AlertCircle,
  Info,
  Zap,
  TreePine,
  Heart,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface FormData {
  // Transportation
  carMiles: number;
  carType: "gas" | "hybrid" | "electric";
  publicTransport: number;
  flights: number;

  // Energy
  electricity: number;
  gas: number;
  heating: "gas" | "electric" | "oil" | "renewable";
  homeSize: "small" | "medium" | "large";

  // Food
  meatFrequency: number;
  dairyFrequency: number;
  localFood: number;
  organicFood: number;

  // Consumption
  shoppingFrequency: number;
  clothingPurchases: number;
  electronicsPurchases: number;
  recyclingHabits: number;
}

interface Results {
  transportation: number;
  energy: number;
  food: number;
  consumption: number;
  total: number;
}

const CarbonFootprintCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    carMiles: 12000,
    carType: "gas",
    publicTransport: 2000,
    flights: 2,
    electricity: 800,
    gas: 600,
    heating: "gas",
    homeSize: "medium",
    meatFrequency: 4,
    dairyFrequency: 7,
    localFood: 30,
    organicFood: 20,
    shoppingFrequency: 3,
    clothingPurchases: 20,
    electronicsPurchases: 2,
    recyclingHabits: 70,
  });
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  const steps = [
    {
      title: "Transportation",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "How do you get around?",
    },
    {
      title: "Energy",
      icon: Home,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "Your home energy usage",
    },
    {
      title: "Food",
      icon: UtensilsCrossed,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Your dietary habits",
    },
    {
      title: "Consumption",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Your shopping patterns",
    },
  ];

  // Animate cards on results page
  useEffect(() => {
    if (showResults) {
      setTimeout(() => setAnimateCards(true), 100);
    }
  }, [showResults]);

  const calculateFootprint = (): Results => {
    // Transportation calculations (kg CO2/year)
    const carEmissions = {
      gas: formData.carMiles * 0.411,
      hybrid: formData.carMiles * 0.205,
      electric: formData.carMiles * 0.1,
    };
    const transportationTotal =
      carEmissions[formData.carType] +
      formData.publicTransport * 0.089 +
      formData.flights * 1100;

    // Energy calculations
    const electricityEmissions = formData.electricity * 0.92;
    const gasEmissions = formData.gas * 5.3;
    const heatingMultiplier = {
      gas: 1.2,
      electric: 1.0,
      oil: 1.5,
      renewable: 0.3,
    };
    const homeSizeMultiplier = {
      small: 0.8,
      medium: 1.0,
      large: 1.3,
    };
    const energyTotal =
      (electricityEmissions + gasEmissions) *
      heatingMultiplier[formData.heating] *
      homeSizeMultiplier[formData.homeSize];

    // Food calculations
    const meatEmissions = formData.meatFrequency * 52 * 6.6;
    const dairyEmissions = formData.dairyFrequency * 52 * 1.9;
    const localFoodReduction = (formData.localFood / 100) * 0.8;
    const organicReduction = (formData.organicFood / 100) * 0.5;
    const foodTotal =
      (meatEmissions + dairyEmissions) *
      (1 - localFoodReduction - organicReduction);

    // Consumption calculations
    const shoppingEmissions = formData.shoppingFrequency * 12 * 45;
    const clothingEmissions = formData.clothingPurchases * 33;
    const electronicsEmissions = formData.electronicsPurchases * 300;
    const recyclingReduction = (formData.recyclingHabits / 100) * 0.6;
    const consumptionTotal =
      (shoppingEmissions + clothingEmissions + electronicsEmissions) *
      (1 - recyclingReduction);

    return {
      transportation: Math.round(transportationTotal),
      energy: Math.round(energyTotal),
      food: Math.round(foodTotal),
      consumption: Math.round(consumptionTotal),
      total: Math.round(
        transportationTotal + energyTotal + foodTotal + consumptionTotal
      ),
    };
  };

  const handleInputChange = (field: keyof FormData, value: number | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsCalculating(true);

    // Simulate calculation time for better UX
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const calculatedResults = calculateFootprint();
    setResults(calculatedResults);
    setIsCalculating(false);
    setShowResults(true);
    setAnimateCards(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendations = (results: Results) => {
    const recommendations = [];
    const globalAverage = 4800;

    if (results.transportation > globalAverage * 0.3) {
      recommendations.push({
        category: "Transportation",
        suggestion:
          "Consider using public transport, cycling, or switching to a hybrid/electric vehicle",
        impact: "Could reduce emissions by up to 2,000 kg CO2/year",
        icon: Car,
        priority: "high",
      });
    }

    if (results.energy > globalAverage * 0.25) {
      recommendations.push({
        category: "Energy",
        suggestion:
          "Improve home insulation, use LED bulbs, and consider renewable energy sources",
        impact: "Could reduce emissions by up to 1,500 kg CO2/year",
        icon: Home,
        priority: "medium",
      });
    }

    if (results.food > globalAverage * 0.2) {
      recommendations.push({
        category: "Food",
        suggestion:
          "Reduce meat consumption, buy local produce, and minimize food waste",
        impact: "Could reduce emissions by up to 1,200 kg CO2/year",
        icon: UtensilsCrossed,
        priority: "medium",
      });
    }

    if (results.consumption > globalAverage * 0.15) {
      recommendations.push({
        category: "Consumption",
        suggestion:
          "Buy less, choose sustainable products, and improve recycling habits",
        impact: "Could reduce emissions by up to 800 kg CO2/year",
        icon: ShoppingCart,
        priority: "low",
      });
    }

    return recommendations;
  };

  const chartData = results
    ? [
        {
          name: "Transportation",
          value: results.transportation,
          color: "#3B82F6",
        },
        { name: "Energy", value: results.energy, color: "#F97316" },
        { name: "Food", value: results.food, color: "#10B981" },
        { name: "Consumption", value: results.consumption, color: "#8B5CF6" },
      ]
    : [];

  const comparisonData = results
    ? [
        { name: "Your Footprint", value: results.total, color: "#EF4444" },
        { name: "Global Average", value: 4800, color: "#6B7280" },
        { name: "2°C Target", value: 2300, color: "#10B981" },
      ]
    : [];

  const monthlyData = results
    ? [
        { month: "Jan", emissions: results.total / 12 },
        { month: "Feb", emissions: results.total / 12 },
        { month: "Mar", emissions: results.total / 12 },
        { month: "Apr", emissions: results.total / 12 },
        { month: "May", emissions: results.total / 12 },
        { month: "Jun", emissions: results.total / 12 },
        { month: "Jul", emissions: results.total / 12 },
        { month: "Aug", emissions: results.total / 12 },
        { month: "Sep", emissions: results.total / 12 },
        { month: "Oct", emissions: results.total / 12 },
        { month: "Nov", emissions: results.total / 12 },
        { month: "Dec", emissions: results.total / 12 },
      ]
    : [];

  if (isCalculating) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Calculator className="w-12 h-12 text-green-600 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Calculating Your Impact
          </h2>
          <p className="text-gray-600 mb-6">
            We're analyzing your data to create your personalized carbon
            footprint report...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full animate-pulse"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    const recommendations = getRecommendations(results);
    const impactLevel =
      results.total > 6000 ? "high" : results.total > 3500 ? "medium" : "low";

    return (
      <div className="h-screen overflow-y-auto bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <Award className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-semibold text-lg">
              Carbon Footprint Report
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Your Environmental Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here's your comprehensive carbon footprint analysis with
            personalized recommendations for a more sustainable future
          </p>
        </div>

        {/* Impact Level Alert */}
        <div
          className={`mb-8 p-6 rounded-2xl border-2 ${
            impactLevel === "high"
              ? "bg-red-50 border-red-200"
              : impactLevel === "medium"
              ? "bg-yellow-50 border-yellow-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-4">
            {impactLevel === "high" ? (
              <AlertCircle className="w-8 h-8 text-red-600" />
            ) : impactLevel === "medium" ? (
              <Info className="w-8 h-8 text-yellow-600" />
            ) : (
              <Heart className="w-8 h-8 text-green-600" />
            )}
            <div>
              <h3
                className={`text-xl font-bold ${
                  impactLevel === "high"
                    ? "text-red-800"
                    : impactLevel === "medium"
                    ? "text-yellow-800"
                    : "text-green-800"
                }`}
              >
                {impactLevel === "high"
                  ? "High Impact Level"
                  : impactLevel === "medium"
                  ? "Moderate Impact Level"
                  : "Excellent Work!"}
              </h3>
              <p
                className={`${
                  impactLevel === "high"
                    ? "text-red-700"
                    : impactLevel === "medium"
                    ? "text-yellow-700"
                    : "text-green-700"
                }`}
              >
                {impactLevel === "high"
                  ? "Your carbon footprint is significantly above average. Small changes can make a big difference!"
                  : impactLevel === "medium"
                  ? "Your carbon footprint is close to the global average. Great potential for improvement!"
                  : "Your carbon footprint is below average. Keep up the fantastic work!"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Total Emissions Card */}
          <div
            className={`lg:col-span-1 bg-white rounded-3xl shadow-xl p-8 text-center transform transition-all duration-700 ${
              animateCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full mb-6 shadow-lg">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Annual Emissions
            </h3>
            <div className="text-6xl font-bold text-red-600 mb-2">
              {results.total.toLocaleString()}
            </div>
            <p className="text-gray-600 text-lg mb-6">kg CO2 per year</p>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">
                  vs Global Average
                </span>
                <span
                  className={`font-bold text-lg ${
                    results.total > 4800 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {results.total > 4800 ? "+" : ""}
                  {(((results.total - 4800) / 4800) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">vs 2°C Target</span>
                <span
                  className={`font-bold text-lg ${
                    results.total > 2300 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {results.total > 2300 ? "+" : ""}
                  {(((results.total - 2300) / 2300) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div
            className={`lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-700 delay-200 ${
              animateCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              Emissions Breakdown
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `${value} kg CO2`,
                      "Annual Emissions",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">
                        {item.value.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">kg CO2</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div
          className={`bg-white rounded-3xl shadow-xl p-8 mb-12 transform transition-all duration-700 delay-300 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <TrendingDown className="w-6 h-6 text-green-600" />
            Monthly Emission Pattern
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `${Math.round(value as number)} kg CO2`,
                  "Monthly Emissions",
                ]}
              />
              <Area
                type="monotone"
                dataKey="emissions"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorEmissions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Chart */}
        <div
          className={`bg-white rounded-3xl shadow-xl p-8 mb-12 transform transition-all duration-700 delay-400 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Global Comparison
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} kg CO2`, "Annual Emissions"]}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div
          className={`bg-white rounded-3xl shadow-xl p-8 mb-12 transform transition-all duration-700 delay-500 ${
            animateCards
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-green-100 rounded-full">
              <TreePine className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              Personalized Action Plan
            </h3>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((rec, index) => {
                const IconComponent = rec.icon;
                return (
                  <div
                    key={index}
                    className={`border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      rec.priority === "high"
                        ? "border-red-200 bg-red-50"
                        : rec.priority === "medium"
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-green-200 bg-green-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-4 rounded-xl ${
                          rec.priority === "high"
                            ? "bg-red-100"
                            : rec.priority === "medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-7 h-7 ${
                            rec.priority === "high"
                              ? "text-red-600"
                              : rec.priority === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-800 text-lg">
                            {rec.category}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rec.priority === "high"
                                ? "bg-red-200 text-red-700"
                                : rec.priority === "medium"
                                ? "bg-yellow-200 text-yellow-700"
                                : "bg-green-200 text-green-700"
                            }`}
                          >
                            {rec.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {rec.suggestion}
                        </p>
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-semibold">
                            {rec.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Outstanding Work!
              </h4>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Your carbon footprint is already well below average. You're
                making a real difference for our planet!
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setShowResults(false);
                setAnimateCards(false);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Recalculate
            </button>
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Report
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Results
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Start your journey to carbon neutrality today! Every action counts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
          <Calculator className="w-6 h-6 text-green-600" />
          <span className="text-green-700 font-semibold text-lg">
            Carbon Footprint Calculator
          </span>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Measure Your Environmental Impact
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Take the first step towards a more sustainable future. Calculate your
          carbon footprint and discover personalized ways to reduce your
          environmental impact.
        </p>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={index} className="flex items-center relative">
                <div
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 mb-3 ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white shadow-lg"
                        : isActive
                        ? `${step.bgColor} ${step.borderColor} ${step.color} shadow-lg`
                        : "bg-white border-gray-200 text-gray-400"
                    }`}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <div
                      className={`font-semibold text-sm transition-colors duration-300 ${
                        isCompleted || isActive
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-xs mt-1 transition-colors duration-300 ${
                        isActive ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-300 ${
                      index < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            {React.createElement(steps[currentStep].icon, {
              className: `w-8 h-8 ${steps[currentStep].color}`,
            })}
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 text-lg">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Transportation Form */}
        {currentStep === 0 && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-2xl border-2 ${steps[0].borderColor} ${steps[0].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Annual Car Miles
                </label>
                <input
                  type="number"
                  value={formData.carMiles}
                  onChange={(e) =>
                    handleInputChange("carMiles", parseInt(e.target.value) || 0)
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="12,000"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Average US driver: 12,000 miles/year
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[0].borderColor} ${steps[0].bgColor}`}
              >
                <label
                  htmlFor="carType"
                  className="block text-lg font-semibold text-gray-700 mb-4"
                >
                  Car Type
                </label>
                <select
                  id="carType"
                  value={formData.carType}
                  onChange={(e) => handleInputChange("carType", e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="gas">Gasoline</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[0].borderColor} ${steps[0].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Public Transport Miles/Year
                </label>
                <input
                  type="number"
                  value={formData.publicTransport}
                  onChange={(e) =>
                    handleInputChange(
                      "publicTransport",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="2,000"
                />
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[0].borderColor} ${steps[0].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Flight Hours/Year
                </label>
                <input
                  type="number"
                  value={formData.flights}
                  onChange={(e) =>
                    handleInputChange("flights", parseInt(e.target.value) || 0)
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="4"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Round trip domestic flight ≈ 4 hours
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Energy Form */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-2xl border-2 ${steps[1].borderColor} ${steps[1].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Monthly Electricity (kWh)
                </label>
                <input
                  type="number"
                  value={formData.electricity}
                  onChange={(e) =>
                    handleInputChange(
                      "electricity",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="800"
                />
                <p className="text-sm text-gray-600 mt-2">
                  US average: 877 kWh/month
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[1].borderColor} ${steps[1].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Monthly Natural Gas (therms)
                </label>
                <input
                  type="number"
                  value={formData.gas}
                  onChange={(e) =>
                    handleInputChange("gas", parseInt(e.target.value) || 0)
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="60"
                />
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[1].borderColor} ${steps[1].bgColor}`}
              >
                <label htmlFor="heating" className="block text-lg font-semibold text-gray-700 mb-4">
                  Primary Heating Source
                </label>
                <select
                  id="heating"
                  value={formData.heating}
                  onChange={(e) => handleInputChange("heating", e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="gas">Natural Gas</option>
                  <option value="electric">Electric</option>
                  <option value="oil">Oil</option>
                  <option value="renewable">Renewable Energy</option>
                </select>
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[1].borderColor} ${steps[1].bgColor}`}
              >
            <label htmlFor="homeSize" className="block text-lg font-semibold text-gray-700 mb-4">
              Home Size
            </label>
            <select
              id="homeSize"
              name="homeSize"
              value={formData.homeSize}
              onChange={(e) => handleInputChange("homeSize", e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="small">Small (&lt;1,500 sq ft)</option>
              <option value="medium">Medium (1,500-2,500 sq ft)</option>
              <option value="large">Large (&gt;2,500 sq ft)</option>
            </select>
            </div>
            </div>
          </div>
        )}

        {/* Food Form */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-2xl border-2 ${steps[2].borderColor} ${steps[2].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Meat Meals per Week
                </label>
                <input
                  type="number"
                  value={formData.meatFrequency}
                  onChange={(e) =>
                    handleInputChange(
                      "meatFrequency",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="4"
                  min="0"
                  max="21"
                />
                <p className="text-sm text-gray-600 mt-2">
                  0 = Vegetarian, 21 = Every meal
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[2].borderColor} ${steps[2].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Dairy Servings per Week
                </label>
                <input
                  type="number"
                  value={formData.dairyFrequency}
                  onChange={(e) =>
                    handleInputChange(
                      "dairyFrequency",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="7"
                  min="0"
                />
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[2].borderColor} ${steps[2].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Local Food Percentage
                </label>
                <input
                  type="number"
                  value={formData.localFood}
                  onChange={(e) =>
                    handleInputChange(
                      "localFood",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="30"
                  min="0"
                  max="100"
                />
                <p className="text-sm text-gray-600 mt-2">
                  % of food sourced locally
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[2].borderColor} ${steps[2].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Organic Food Percentage
                </label>
                <input
                  type="number"
                  value={formData.organicFood}
                  onChange={(e) =>
                    handleInputChange(
                      "organicFood",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="20"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        )}

        {/* Consumption Form */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-2xl border-2 ${steps[3].borderColor} ${steps[3].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Shopping Trips per Month
                </label>
                <input
                  type="number"
                  value={formData.shoppingFrequency}
                  onChange={(e) =>
                    handleInputChange(
                      "shoppingFrequency",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="3"
                />
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[3].borderColor} ${steps[3].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  New Clothing Items per Year
                </label>
                <input
                  type="number"
                  value={formData.clothingPurchases}
                  onChange={(e) =>
                    handleInputChange(
                      "clothingPurchases",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="20"
                />
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[3].borderColor} ${steps[3].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Electronics Purchases per Year
                </label>
                <input
                  type="number"
                  value={formData.electronicsPurchases}
                  onChange={(e) =>
                    handleInputChange(
                      "electronicsPurchases",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="2"
                />
              </div>

              <div
                className={`p-6 rounded-2xl border-2 ${steps[3].borderColor} ${steps[3].bgColor}`}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Recycling Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.recyclingHabits}
                  onChange={(e) =>
                    handleInputChange(
                      "recyclingHabits",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="70"
                  min="0"
                  max="100"
                />
                <p className="text-sm text-gray-600 mt-2">
                  % of waste you recycle
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-12 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate Impact
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Environmental Facts Footer */}
      <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Leaf className="w-6 h-6 text-green-600" />
          <span className="text-green-700 font-semibold text-lg">
            Did You Know?
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              4.8 tons
            </div>
            <p>Global average CO2 emissions per person per year</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 mb-2">
              2.3 tons
            </div>
            <p>Target emissions to limit warming to 2°C</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              16 tons
            </div>
            <p>Average US carbon footprint per person</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
