import React, { useState } from "react";
import {
  Shield,
  Download,
  UserX,
  Eye,
  EyeOff,
  BarChart,
  Lock,
  FileText,
} from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import Navigation from "../components/mainCompo/Navigation";
import Footer from "../components/mainCompo/Footer";
import DataUsageDashboard from "../components/privacy/DataUsageDashboard";
import PermissionManager from "../components/privacy/PermissionManager";
import PrivacyComparison from "../components/privacy/PrivacyComparison";

interface DataCategory {
  id: string;
  name: string;
  whatWeCollect: string[];
  whyWeNeedIt: string[];
  howProcessed: {
    step: string;
    description: string;
  }[];
  isEnabled: boolean;
}

const Privacy: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [dataCategories, setDataCategories] = useState<DataCategory[]>([
    {
      id: "location",
      name: "Location Data",
      whatWeCollect: [
        "GPS coordinates",
        "Travel patterns",
        "Frequently visited places",
      ],
      whyWeNeedIt: [
        "Calculate transport emissions",
        "Suggest eco-friendly routes",
        "Local sustainability recommendations",
      ],
      howProcessed: [
        {
          step: "Collection",
          description: "Gathered only when app is in use",
        },
        {
          step: "Analysis",
          description: "Processed locally on device when possible",
        },
        {
          step: "Storage",
          description: "Encrypted and stored in secure servers",
        },
      ],
      isEnabled: true,
    },
    {
      id: "consumption",
      name: "Energy Consumption",
      whatWeCollect: [
        "Utility bills data",
        "Smart meter readings",
        "Device usage patterns",
      ],
      whyWeNeedIt: [
        "Track carbon footprint",
        "Provide energy-saving tips",
        "Compare with local averages",
      ],
      howProcessed: [
        {
          step: "Integration",
          description: "Connected securely with providers",
        },
        {
          step: "Calculation",
          description: "Converted to emissions data",
        },
        {
          step: "Reporting",
          description: "Aggregated for insights",
        },
      ],
      isEnabled: true,
    },
    {
      id: "lifestyle",
      name: "Lifestyle Choices",
      whatWeCollect: ["Shopping habits", "Diet preferences", "Travel methods"],
      whyWeNeedIt: [
        "Personalize recommendations",
        "Track lifestyle impact",
        "Community comparisons",
      ],
      howProcessed: [
        {
          step: "Categorization",
          description: "Classified by impact type",
        },
        {
          step: "Analysis",
          description: "Pattern recognition for suggestions",
        },
        {
          step: "Application",
          description: "Used for personalized tips",
        },
      ],
      isEnabled: true,
    },
  ]);

  const handleToggleCategory = (categoryId: string) => {
    setDataCategories((categories) =>
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, isEnabled: !category.isEnabled }
          : category
      )
    );
  };

  const handleDownloadData = async () => {
    // Implement GDPR-compliant data download
    console.log("Preparing data download...");
    // Mock download process
    setTimeout(() => {
      alert("Your data has been prepared and downloaded");
    }, 2000);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      // Implement account deletion
      console.log("Deleting account...");
      // Mock deletion process
      setTimeout(() => {
        alert("Your account has been successfully deleted");
      }, 2000);
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
      />

      {/* Hero Section */}
      <div className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-green-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield
                className={`w-16 h-16 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              />
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Your Privacy Matters
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We believe in complete transparency about how we collect, use, and
              protect your data. You're in control of your information at all
              times.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Data Usage Dashboard */}
        <section className="mb-16">
          <DataUsageDashboard
            categories={dataCategories}
            isDarkMode={isDarkMode}
          />
        </section>

        {/* Permission Manager */}
        <section className="mb-16">
          <PermissionManager
            categories={dataCategories}
            onToggleCategory={handleToggleCategory}
            onDownloadData={handleDownloadData}
            onDeleteAccount={handleDeleteAccount}
            isDarkMode={isDarkMode}
          />
        </section>

        {/* Privacy Comparison */}
        <section className="mb-16">
          <PrivacyComparison isDarkMode={isDarkMode} />
        </section>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Privacy;
