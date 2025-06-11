import React, { useState } from "react";
import { FileDown, ChevronDown, ChevronUp, Download } from "lucide-react";
import type { ResourceHubProps } from "../../types/contact";


const ResourceHub: React.FC<ResourceHubProps> = ({
  isDarkMode,
  faqs,
  mediaKit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);

  const categories = ["all", ...new Set(faqs.map((faq) => faq.category))];

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12">
      {/* FAQs Section */}
      <div>
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Frequently Asked Questions
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? isDarkMode
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={`rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg overflow-hidden`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className={`w-full p-4 text-left flex items-center justify-between ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
                aria-expanded="false"
                data-expanded={expandedFaqs.includes(faq.id)}
              >
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </span>
                {expandedFaqs.includes(faq.id) ? (
                  <ChevronUp
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                ) : (
                  <ChevronDown
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                )}
              </button>
              {expandedFaqs.includes(faq.id) && (
                <div
                  className={`p-4 border-t ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-100 text-gray-600"
                  }`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Media Kit Section */}
      <div>
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Media Kit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mediaKit.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex items-start">
                <FileDown
                  className={`w-8 h-8 mr-3 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                />
                <div className="flex-grow">
                  <h3
                    className={`text-lg font-medium mb-1 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.fileType} • {item.fileSize}
                    </span>
                    <a
                      href={item.fileUrl}
                      download
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        isDarkMode
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-green-100 hover:bg-green-200 text-green-800"
                      }`}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
