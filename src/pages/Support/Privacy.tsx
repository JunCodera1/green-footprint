import React, { useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import Navigation from "../../components/mainCompo/Navigation";
import Footer from "../../components/mainCompo/Footer";
import DataUsageDashboard from "../../components/privacy/DataUsageDashboard";
import PermissionManager from "../../components/privacy/PermissionManager";
import PrivacyComparison from "../../components/privacy/PrivacyComparison";

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
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />
      <div className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-green-50"}`}>
        <DataUsageDashboard
          categories={dataCategories}
          isDarkMode={isDarkMode}
        />
        <PermissionManager
          categories={dataCategories}
          onToggleCategory={handleToggleCategory}
          onDownloadData={handleDownloadData}
          onDeleteAccount={handleDeleteAccount}
          isDarkMode={isDarkMode}
        />
        <PrivacyComparison isDarkMode={isDarkMode} />
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Privacy;
