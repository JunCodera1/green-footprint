import React, { useState } from "react";
import { SocialProfileCard } from "../components/social/SocialProfile";
import type { SocialProfile, SocialPost, Team } from "../types/social";
import {
  Users,
  Share2,
  MessageCircle,
  UserPlus,
  Filter,
  Search,
} from "lucide-react";

interface SocialPageProps {
  isDarkMode?: boolean;
}

export const SocialPage: React.FC<SocialPageProps> = ({
  isDarkMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<"feed" | "friends" | "teams">(
    "feed"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState<SocialProfile[]>([]); // In a real app, this would be fetched from an API
  const [posts, setPosts] = useState<SocialPost[]>([]); // In a real app, this would be fetched from an API
  const [teams, setTeams] = useState<Team[]>([]); // In a real app, this would be fetched from an API

  const handleShare = (userId: string) => {
    // In a real app, this would open a share dialog
    console.log("Sharing profile:", userId);
    // Dummy updates to satisfy TypeScript
    setProfiles((prev) => prev);
    setPosts((prev) => prev);
    setTeams((prev) => prev);
  };

  const handleMessage = (userId: string) => {
    // In a real app, this would open a message dialog
    console.log("Messaging user:", userId);
  };

  const handleConnect = (userId: string) => {
    // In a real app, this would send a connection request
    console.log("Connecting with user:", userId);
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
          Green Community
        </h1>
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Connect with eco-conscious individuals and share your impact
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
                placeholder="Search people, teams, or posts..."
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
            aria-label="Filter results"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("feed")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "feed"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Activity Feed
        </button>
        <button
          onClick={() => setActiveTab("friends")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "friends"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Friends
        </button>
        <button
          onClick={() => setActiveTab("teams")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "teams"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Teams
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "feed" && (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                {/* Post content would go here */}
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {post.content.text}
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    } hover:text-green-500`}
                    aria-label="Comment on post"
                  >
                    <MessageCircle className="w-5 h-5 mr-1" />
                    {post.comments.length}
                  </button>
                  <button
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    } hover:text-green-500`}
                    aria-label="Share post"
                  >
                    <Share2 className="w-5 h-5 mr-1" />
                    {post.shares}
                  </button>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div
                className={`text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No posts yet</p>
                <p className="text-sm">
                  Start sharing your environmental impact with the community
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "friends" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <SocialProfileCard
                key={profile.userId}
                profile={profile}
                onShare={handleShare}
                onMessage={handleMessage}
                onConnect={handleConnect}
                isDarkMode={isDarkMode}
              />
            ))}
            {profiles.length === 0 && (
              <div
                className={`col-span-full text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No connections yet</p>
                <p className="text-sm">
                  Start connecting with other eco-conscious individuals
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "teams" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {team.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {team.members.length} members
                    </p>
                  </div>
                  <img
                    src={team.avatar}
                    alt={team.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <p
                  className={`text-sm mb-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {team.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Total Impact
                    </p>
                    <p
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {team.stats.totalCarbonReduced}kg CO₂
                    </p>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium ${
                      isDarkMode
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    aria-label={`Join ${team.name} team`}
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {teams.length === 0 && (
              <div
                className={`col-span-full text-center py-12 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No teams yet</p>
                <p className="text-sm">
                  Create or join a team to amplify your environmental impact
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
