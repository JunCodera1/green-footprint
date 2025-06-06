import React, { useState, useEffect } from "react";
import { BarChart3, Users, TreePine, Recycle } from "lucide-react";
import type { Feature, Stat, Testimonial } from "../types";
import Navigation from "../components/mainCompo/Navigation";
import HeroSection from "../components/mainCompo/HeroSection";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/mainCompo/Footer";
import { useDarkMode } from "../contexts/DarkModeContext";

const GreenFootprintLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
  const features: Feature[] = [
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

  const testimonials: Testimonial[] = [
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

  const stats: Stat[] = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Tons CO2 Reduced" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "150+", label: "Countries Served" },
  ];

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

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-emerald-900"
          : "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"
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
      <HeroSection isDarkMode={isDarkMode} />
      <StatsSection stats={stats} isDarkMode={isDarkMode} />
      <FeaturesSection features={features} isDarkMode={isDarkMode} />
      <TestimonialsSection
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />
      <CTASection isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default GreenFootprintLanding;
