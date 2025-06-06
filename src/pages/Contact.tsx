import React, { useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";
import ContactCard from "../components/contact/ContactCard";
import SmartContactForm from "../components/contact/SmartContactForm";
import ResourceHub from "../components/contact/ResourceHub";

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
  company?: string;
  phone?: string;
  orderNumber?: string;
}

const Contact: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [isChatAvailable] = useState(true);

  const contactChannels = [
    {
      type: "support" as const,
      email: "support@greenfootprint.com",
      description: "Technical support and general inquiries",
    },
    {
      type: "sales" as const,
      email: "sales@greenfootprint.com",
      description: "Partnership and business opportunities",
    },
    {
      type: "press" as const,
      email: "press@greenfootprint.com",
      description: "Media inquiries and press releases",
    },
  ];

  const officeLocation = {
    address: "123 Green Street, Eco City, EC 12345",
    coordinates: [37.7749, -122.4194] as [number, number], // San Francisco coordinates
  };

  const topics = [
    "Technical Support",
    "Feature Request",
    "Partnership",
    "Press Inquiry",
    "Bug Report",
    "Other",
  ];

  const helpArticles = [
    {
      id: "1",
      title: "How to track your carbon footprint",
      url: "/help/tracking-carbon-footprint",
      keywords: ["track", "carbon", "footprint", "calculate"],
    },
    {
      id: "2",
      title: "Understanding your impact score",
      url: "/help/impact-score",
      keywords: ["score", "impact", "points", "rating"],
    },
    {
      id: "3",
      title: "Tips for reducing emissions",
      url: "/help/reducing-emissions",
      keywords: ["reduce", "emissions", "tips", "help"],
    },
  ];

  const faqs = [
    {
      id: "1",
      category: "general",
      question: "What is GreenFootprint?",
      answer:
        "GreenFootprint is a platform that helps individuals and businesses track and reduce their carbon footprint through personalized recommendations and community engagement.",
    },
    {
      id: "2",
      category: "technical",
      question: "How accurate is the carbon tracking?",
      answer:
        "Our carbon tracking uses industry-standard calculations and real-time data from verified sources, providing accuracy within 5% of actual emissions.",
    },
    {
      id: "3",
      category: "account",
      question: "How do I reset my password?",
      answer:
        'You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.',
    },
  ];

  const mediaKit = [
    {
      id: "1",
      name: "Brand Guidelines",
      description: "Official logos, color palette, and usage guidelines",
      fileUrl: "/media-kit/brand-guidelines.pdf",
      fileSize: "2.4 MB",
      fileType: "PDF",
    },
    {
      id: "2",
      name: "Press Release Kit",
      description: "Latest news, statistics, and high-resolution images",
      fileUrl: "/media-kit/press-kit.zip",
      fileSize: "15.8 MB",
      fileType: "ZIP",
    },
    {
      id: "3",
      name: "Impact Report 2023",
      description: "Annual environmental impact and achievements",
      fileUrl: "/media-kit/impact-report-2023.pdf",
      fileSize: "5.1 MB",
      fileType: "PDF",
    },
  ];

  const handleStartChat = () => {
    // Implement chat functionality
    console.log("Starting chat...");
  };

  const handleContactSubmit = (formData: ContactFormData) => {
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Get in Touch
          </h1>
          <p
            className={`text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We're here to help you make a difference
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mb-16">
          <ContactCard
            isDarkMode={isDarkMode}
            onStartChat={handleStartChat}
            isChatAvailable={isChatAvailable}
            contactChannels={contactChannels}
            officeLocation={officeLocation}
          />
        </div>

        {/* Two Column Layout for Form and Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Smart Contact Form */}
          <div>
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Send Us a Message
            </h2>
            <SmartContactForm
              isDarkMode={isDarkMode}
              topics={topics}
              helpArticles={helpArticles}
              onSubmit={handleContactSubmit}
            />
          </div>

          {/* Resource Hub */}
          <div>
            <ResourceHub
              isDarkMode={isDarkMode}
              faqs={faqs}
              mediaKit={mediaKit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
