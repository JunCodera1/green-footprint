import React, { useState, useEffect } from "react";
import { Send, HelpCircle } from "lucide-react";
import type { FormField, HelpArticle, SmartContactFormProps } from "../../types/contact";

const SmartContactForm: React.FC<SmartContactFormProps> = ({
  isDarkMode,
  topics,
  helpArticles,
  onSubmit,
}) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [message, setMessage] = useState("");
  const [suggestedArticles, setSuggestedArticles] = useState<HelpArticle[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    company: "",
    phone: "",
    orderNumber: "",
  });

  // Define conditional fields based on topic
  const getTopicFields = (topic: string): FormField[] => {
    const baseFields: FormField[] = [
      { name: "name", label: "Your Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
    ];

    switch (topic) {
      case "Technical Support":
        return [
          ...baseFields,
          { name: "orderNumber", label: "Order Number", type: "text" },
        ];
      case "Partnership":
        return [
          ...baseFields,
          {
            name: "company",
            label: "Company Name",
            type: "text",
            required: true,
          },
          { name: "phone", label: "Phone Number", type: "text" },
        ];
      case "Press Inquiry":
        return [
          ...baseFields,
          {
            name: "company",
            label: "Media Outlet",
            type: "text",
            required: true,
          },
          { name: "phone", label: "Phone Number", type: "text" },
        ];
      default:
        return baseFields;
    }
  };

  // Find relevant help articles based on message content
  useEffect(() => {
    if (message.length > 10) {
      const words = message.toLowerCase().split(" ");
      const relevant = helpArticles.filter((article) =>
        article.keywords.some((keyword) =>
          words.some((word) => word.includes(keyword))
        )
      );
      setSuggestedArticles(relevant.slice(0, 3));
    } else {
      setSuggestedArticles([]);
    }
  }, [message, helpArticles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "message") {
      setMessage(value);
    }
    if (name === "topic") {
      setSelectedTopic(value);
    }
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Selection */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            How can we help?
          </label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-green-500`}
            required
            aria-label="Topic Selection"
            title="Select a topic for your inquiry"
          >
            <option value="">Select a topic</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Fields */}
        {selectedTopic &&
          getTopicFields(selectedTopic).map((field) => (
            <div key={field.name}>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-green-500`}
                  required={field.required}
                  rows={4}
                  title={field.label}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-green-500`}
                  required={field.required}
                  title={field.label}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}

        {/* Message Field */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:ring-2 focus:ring-green-500`}
            rows={4}
            required
            title="Message"
            placeholder="Enter your message"
          />
        </div>

        {/* Help Article Suggestions */}
        {suggestedArticles.length > 0 && (
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-green-50"
            }`}
          >
            <div className="flex items-center mb-2">
              <HelpCircle
                className={`w-5 h-5 mr-2 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              />
              <h4
                className={`text-sm font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Related Help Articles
              </h4>
            </div>
            <ul className="space-y-2">
              {suggestedArticles.map((article) => (
                <li key={article.id}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${
                      isDarkMode
                        ? "text-green-400 hover:text-green-300"
                        : "text-green-600 hover:text-green-700"
                    }`}
                  >
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
            isDarkMode
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-500 hover:bg-green-600"
          } text-white transition-colors`}
        >
          <Send className="w-5 h-5 mr-2" />
          Send Message
        </button>
      </form>
    </div>
  );
};

export default SmartContactForm;
