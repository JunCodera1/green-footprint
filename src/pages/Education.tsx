import React, { useState } from "react";
import { QuizCard } from "../components/education/QuizCard";
import type {
  Quiz,
  Tutorial,
  Webinar,
  Certification,
} from "../types/education";
import {
  BookOpen,
  Video,
  Calendar,
  Award,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";

interface EducationPageProps {
  isDarkMode?: boolean;
}

export const EducationPage: React.FC<EducationPageProps> = ({
  isDarkMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<
    "quizzes" | "tutorials" | "webinars" | "certifications"
  >("quizzes");
  const [searchQuery, setSearchQuery] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // In a real app, this would be fetched from an API
  const [tutorials, setTutorials] = useState<Tutorial[]>([]); // In a real app, this would be fetched from an API
  const [webinars, setWebinars] = useState<Webinar[]>([]); // In a real app, this would be fetched from an API
  const [certifications, setCertifications] = useState<Certification[]>([]); // In a real app, this would be fetched from an API

  const handleStartQuiz = (quizId: string) => {
    // In a real app, this would start the quiz
    console.log("Starting quiz:", quizId);
    // Dummy updates to satisfy TypeScript
    setQuizzes((prev) => prev);
    setTutorials((prev) => prev);
    setWebinars((prev) => prev);
    setCertifications((prev) => prev);
  };

  const handleStartTutorial = (tutorialId: string) => {
    // In a real app, this would start the tutorial
    console.log("Starting tutorial:", tutorialId);
  };

  const handleRegisterWebinar = (webinarId: string) => {
    // In a real app, this would register for the webinar
    console.log("Registering for webinar:", webinarId);
  };

  const handleStartCertification = (certificationId: string) => {
    // In a real app, this would start the certification program
    console.log("Starting certification:", certificationId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Environmental Education
        </h1>
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Learn, grow, and earn certifications in environmental sustainability
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <div className="flex-grow">
            <div
              className={`flex items-center px-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <Search
                className={`w-5 h-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search educational content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`ml-2 flex-grow bg-transparent border-none focus:outline-none ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              />
            </div>
          </div>
          <button
            className={`p-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-800 text-gray-400 hover:text-white"
                : "bg-white text-gray-600 hover:text-gray-900"
            } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            aria-label="Filter content"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("quizzes")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === "quizzes"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <BookOpen className="w-5 h-5 inline-block mr-2" />
          Quizzes
        </button>
        <button
          onClick={() => setActiveTab("tutorials")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === "tutorials"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Video className="w-5 h-5 inline-block mr-2" />
          Tutorials
        </button>
        <button
          onClick={() => setActiveTab("webinars")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === "webinars"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Calendar className="w-5 h-5 inline-block mr-2" />
          Webinars
        </button>
        <button
          onClick={() => setActiveTab("certifications")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === "certifications"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Award className="w-5 h-5 inline-block mr-2" />
          Certifications
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "quizzes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onStart={handleStartQuiz}
                isDarkMode={isDarkMode}
              />
            ))}
            {quizzes.length === 0 && (
              <div
                className={`col-span-full text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No quizzes available</p>
                <p className="text-sm">Check back later for new quizzes</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "tutorials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                {tutorial.content.sections[0]?.media?.[0]?.type === "video" && (
                  <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={tutorial.content.sections[0].media[0].url}
                      alt={tutorial.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                  </div>
                )}
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tutorial.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={tutorial.author.avatar}
                      alt={tutorial.author.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {tutorial.author.name}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {tutorial.author.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartTutorial(tutorial.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      isDarkMode
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    Start
                    <ChevronRight className="w-4 h-4 inline-block ml-1" />
                  </button>
                </div>
              </div>
            ))}
            {tutorials.length === 0 && (
              <div
                className={`col-span-full text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No tutorials available</p>
                <p className="text-sm">Check back later for new tutorials</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "webinars" && (
          <div className="space-y-6">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {webinar.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {webinar.description}
                    </p>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-green-500" />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {new Date(
                            webinar.schedule.startTime
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Video className="w-5 h-5 mr-2 text-blue-500" />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {webinar.recording?.available
                            ? "Recording available"
                            : "Live only"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-2">
                      <span
                        className={`text-sm mr-2 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {webinar.registrations}/{webinar.capacity} registered
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          webinar.registrations >= webinar.capacity
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      />
                    </div>
                    <button
                      onClick={() => handleRegisterWebinar(webinar.id)}
                      disabled={webinar.registrations >= webinar.capacity}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        webinar.registrations >= webinar.capacity
                          ? "bg-gray-500 cursor-not-allowed"
                          : isDarkMode
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      {webinar.registrations >= webinar.capacity
                        ? "Fully Booked"
                        : "Register Now"}
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <img
                      src={webinar.speaker.avatar}
                      alt={webinar.speaker.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {webinar.speaker.name}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {webinar.speaker.title} at{" "}
                        {webinar.speaker.organization}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {webinars.length === 0 && (
              <div
                className={`text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No upcoming webinars</p>
                <p className="text-sm">Check back later for new webinars</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {certification.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      certification.level === "expert"
                        ? "bg-purple-100 text-purple-800"
                        : certification.level === "intermediate"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {certification.level}
                  </span>
                </div>
                <p
                  className={`text-sm mb-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {certification.description}
                </p>
                <div className="space-y-4 mb-6">
                  <div>
                    <p
                      className={`text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Requirements
                    </p>
                    <ul
                      className={`list-disc list-inside text-sm space-y-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <li>
                        {certification.requirements.quizzes.length} Quizzes
                      </li>
                      <li>
                        {certification.requirements.tutorials.length} Tutorials
                      </li>
                      {certification.requirements.projects && (
                        <li>
                          {certification.requirements.projects.length} Projects
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Duration
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Estimated {certification.duration.estimated} hours
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleStartCertification(certification.id)}
                  className={`w-full px-4 py-2 rounded-lg font-medium ${
                    isDarkMode
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  Start Certification
                </button>
              </div>
            ))}
            {certifications.length === 0 && (
              <div
                className={`col-span-full text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No certifications available</p>
                <p className="text-sm">
                  Check back later for new certification programs
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
