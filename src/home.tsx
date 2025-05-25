import React, { useState, useEffect } from "react";
import {
  Leaf,
  Globe,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
  TreePine,
  Recycle,
  Sun,
  Moon,
} from "lucide-react";

const GreenFootprintLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Load dark mode preference from memory
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save dark mode preference and apply to document
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Carbon Tracking",
      description:
        "Monitor your carbon emissions in real-time with advanced AI technology and precise measurements",
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Eco Recommendations",
      description:
        "Get personalized suggestions to reduce your daily environmental impact and live sustainably",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description:
        "Connect with the green community and create positive changes together for our planet",
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Sustainability Goals",
      description:
        "Set and track sustainable goals with detailed reporting and comprehensive analytics",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Activist",
      content:
        "GreenFootprint helped me reduce my carbon emissions by 40% in just 3 months!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      content:
        "Amazing tool for businesses to track and improve their environmental impact.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Sustainability Manager",
      content:
        "Beautiful interface, accurate data, and the AI features are incredibly helpful.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Tons CO2 Reduced" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "150+", label: "Countries Served" },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-emerald-900"
          : "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? isDarkMode
              ? "bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-700"
              : "bg-white/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                GreenFootprint
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className={`transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Features
              </a>
              <a
                href="#about"
                className={`transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                About
              </a>
              <a
                href="#testimonials"
                className={`transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Reviews
              </a>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>

            <button
              className={`md:hidden ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-lg ${
              isDarkMode ? "bg-gray-900/95" : "bg-white/95"
            }`}
          >
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className={`block transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Features
              </a>
              <a
                href="#about"
                className={`block transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                About
              </a>
              <a
                href="#testimonials"
                className={`block transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Reviews
              </a>

              <div className="flex items-center justify-between">
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  Dark Mode
                </span>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="animate-pulse">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isDarkMode
                      ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  🌱 The green future starts today
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  Track
                </span>
                <br />
                <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                  your carbon
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  footprint
                </span>
              </h1>

              <p
                className={`text-xl leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Discover your environmental impact and learn how to live more
                sustainably with advanced AI technology and an intuitive
                interface.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  className={`border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? "hover:bg-emerald-900/30"
                      : "hover:bg-emerald-50"
                  }`}
                >
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div
                className={`relative backdrop-blur-sm rounded-3xl p-8 shadow-2xl border ${
                  isDarkMode
                    ? "bg-gray-800/80 border-gray-700"
                    : "bg-white/80 border-white/50"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Carbon Dashboard
                  </h3>
                  <Globe className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      isDarkMode
                        ? "bg-gradient-to-r from-emerald-900/30 to-teal-900/30"
                        : "bg-gradient-to-r from-emerald-50 to-teal-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Sun className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p
                          className={`font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Today
                        </p>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          2.3 kg CO2
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-600 font-semibold">
                        -15%
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        vs yesterday
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-xl text-center ${
                        isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
                      }`}
                    >
                      <p className="text-2xl font-bold text-blue-600">4.2M</p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Green Steps
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-xl text-center ${
                        isDarkMode ? "bg-green-900/30" : "bg-green-50"
                      }`}
                    >
                      <p className="text-2xl font-bold text-green-600">87%</p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Monthly Goal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-20 backdrop-blur-sm ${
          isDarkMode ? "bg-gray-800/50" : "bg-white/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30"
                      : "bg-gradient-to-br from-emerald-100 to-teal-100"
                  }`}
                >
                  <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p
                    className={`mt-2 font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl lg:text-5xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Powerful{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Explore powerful tools that help you track, analyze, and improve
              your environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div
                  className={`backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${
                    isDarkMode
                      ? "bg-gray-800/80 border-gray-700"
                      : "bg-white/80 border-white/50"
                  }`}
                >
                  <div className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Thousands of people trust GreenFootprint on their journey to
              sustainable living
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                      />
                    )
                  )}
                </div>
                <blockquote className="text-xl lg:text-2xl text-gray-800 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to make a{" "}
            <span className="text-emerald-400">positive impact</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of people who are taking action for a sustainable
            future. Start your journey today and make a difference!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center">
              Start Free Trial Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-gray-400 text-sm">
              ✨ No credit card required • Free 30-day trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-900"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-8 h-8 text-emerald-400" />
                <span className="text-2xl font-bold">GreenFootprint</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Leading carbon footprint tracking platform, helping you live
                sustainably and protect our planet.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-emerald-400">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carbon Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-emerald-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-emerald-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GreenFootprint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GreenFootprintLanding;
