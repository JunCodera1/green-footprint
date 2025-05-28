import React, { useState, useEffect } from "react";
import {
Code,
Key,
Server,
Database,
Terminal,
Copy,
CheckCircle,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Code examples for different languages
const codeExamples = {
python: `import greenfootprint

# Initialize the client
client = greenfootprint.Client(api_key="your_api_key")

# Get user's carbon footprint
footprint = client.calculate_footprint({
"transportation": {
"car_miles": 100,
"flight_hours": 2
},
"energy": {
"electricity_kwh": 500
}
})

print(f"Total CO2 emissions: {footprint.total_emissions} kg")`,

javascript: `const GreenFootprint = require('greenfootprint');

// Initialize the client
const client = new GreenFootprint('your_api_key');

// Get user's carbon footprint
async function calculateFootprint() {
const footprint = await client.calculateFootprint({
transportation: {
    car_miles: 100,
    flight_hours: 2
},
energy: {
    electricity_kwh: 500
}
});

console.log(\`Total CO2 emissions: \${footprint.totalEmissions} kg\`);
}`,

curl: `curl -X POST "https://api.greenfootprint.com/v1/calculate" \\
-H "Authorization: Bearer your_api_key" \\
-H "Content-Type: application/json" \\
-d '{
"transportation": {
"car_miles": 100,
"flight_hours": 2
},
"energy": {
"electricity_kwh": 500
}
}'`,
};

// API endpoints documentation
const endpoints = [
{
method: "POST",
path: "/v1/calculate",
description: "Calculate carbon footprint based on user activities",
authentication: "Required",
rateLimit: "100 requests/minute",
},
{
method: "GET",
path: "/v1/user/history",
description: "Retrieve user's historical footprint data",
authentication: "Required",
rateLimit: "300 requests/minute",
},
{
method: "GET",
path: "/v1/offset/options",
description: "Get available carbon offset options",
authentication: "Required",
rateLimit: "50 requests/minute",
},
];

const APIDocumentation: React.FC = () => {
const [activeTab, setActiveTab] = useState("python");
const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
const [isDarkMode, setIsDarkMode] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
const handleScroll = () => setScrollY(window.scrollY);
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);

const toggleDarkMode = () => {
setIsDarkMode(!isDarkMode);
};

useEffect(() => {
if (isDarkMode) {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}
}, [isDarkMode]);

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
e.preventDefault();
const element = document.querySelector(href);
if (element) {
    element.scrollIntoView({ behavior: "smooth" });
}
};

const handleCopyCode = (language: string, code: string) => {
navigator.clipboard.writeText(code);
setCopiedStates({ ...copiedStates, [language]: true });
setTimeout(() => {
    setCopiedStates({ ...copiedStates, [language]: false });
}, 2000);
};

return (
<div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
    <Navigation
    scrollY={scrollY}
    isMenuOpen={isMenuOpen}
    setIsMenuOpen={setIsMenuOpen}
    isDarkMode={isDarkMode}
    toggleDarkMode={toggleDarkMode}
    handleLinkClick={handleLinkClick}
    />

    {/* Hero Section */}
    <div className={`bg-gradient-to-r from-green-300 to-teal-600 text-white py-16 ${isDarkMode ? "dark:from-green-800 dark:to-teal-800" : ""}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
        <Code className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Integrate carbon footprint tracking into your applications with
            our powerful API
        </p>
        </div>
    </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Authentication Section */}
    <div className={`rounded-lg shadow-xl p-6 mb-8 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <Key className="w-6 h-6 mr-2 text-yellow-500" />
        Authentication
        </h2>
        <div className="prose dark:prose-invert max-w-none">
        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            All API requests require authentication using an API key. You can
            get your API key from the dashboard after signing up for a
            developer account.
        </p>
        <div className={`rounded-lg p-4 mt-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <code className={`text-sm ${isDarkMode ? "text-green-300" : "text-gray-800"}`}>
            Authorization: Bearer your_api_key
            </code>
        </div>
        </div>
    </div>

    {/* Code Examples Section */}
    <div className={`rounded-lg shadow-xl p-6 mb-8 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <Terminal className="w-6 h-6 mr-2 text-purple-500" />
        Code Examples
        </h2>
        <div className="mb-4">
        <div className={`flex space-x-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            {Object.keys(codeExamples).map((lang) => (
            <button
                key={lang}
                className={`pb-2 px-4 ${
                activeTab === lang
                    ? "border-b-2 border-green-500 font-medium"
                    : "font-medium"
                } ${
                activeTab === lang
                    ? isDarkMode
                    ? "text-green-400"
                    : "text-green-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(lang)}
            >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
            ))}
        </div>
        </div>
        <div className="relative">
        <pre className={`rounded-lg p-4 overflow-x-auto ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <code className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
            {codeExamples[activeTab as keyof typeof codeExamples]}
            </code>
        </pre>
        <button
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() =>
            handleCopyCode(
                activeTab,
                codeExamples[activeTab as keyof typeof codeExamples]
            )
            }
        >
            {copiedStates[activeTab] ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
            <Copy className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            )}
        </button>
        </div>
    </div>

    {/* API Endpoints Section */}
    <div className={`rounded-lg shadow-xl p-6 mb-8 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <Server className="w-6 h-6 mr-2 text-blue-500" />
        API Endpoints
        </h2>
        <div className="overflow-x-auto">
        <table className="min-w-full">
            <thead>
            <tr className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                Method
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                Endpoint
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                Description
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                Rate Limit
                </th>
            </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-700 bg-gray-800" : "divide-gray-200 bg-white"}`}>
            {endpoints.map((endpoint, index) => (
                <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        endpoint.method === "GET"
                        ? isDarkMode
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                        : isDarkMode
                            ? "bg-blue-900 text-blue-200"
                            : "bg-blue-100 text-blue-800"
                    }`}
                    >
                    {endpoint.method}
                    </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}>
                    {endpoint.path}
                </td>
                <td className={`px-6 py-4 text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                    {endpoint.description}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                    {endpoint.rateLimit}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>

    {/* Sandbox Environment */}
    <div className={`rounded-lg shadow-xl p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <Database className="w-6 h-6 mr-2 text-indigo-500" />
        Sandbox Environment
        </h2>
        <div className="prose dark:prose-invert max-w-none">
        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            Test your integration in our sandbox environment before going
            live. Use the sandbox API key prefix 'sk_test_' for all test
            requests.
        </p>
        <div className={`rounded-lg p-4 mt-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <p className={`text-sm mb-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Sandbox Base URL:</p>
            <code className={`text-sm ${isDarkMode ? "text-green-300" : "text-gray-800"}`}>
            https://sandbox.api.greenfootprint.com/v1/
            </code>
        </div>
        <div className="mt-4">
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Test Data
            </h3>
            <ul className={`list-disc pl-6 space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            <li>Use test API key: sk_test_example123</li>
            <li>All API endpoints are available in sandbox</li>
            <li>Rate limits are increased for testing</li>
            <li>Test data is reset daily</li>
            </ul>
        </div>
        </div>
    </div>
    </div>

    <Footer isDarkMode={isDarkMode} />
</div>
);
};

export default APIDocumentation;