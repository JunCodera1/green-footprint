import React from "react";
import {
  Users,
  Award,
  Leaf,
  Trees,
  Trophy,
  Share2,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import type { SocialProfileProps } from "../../types/social";

export const SocialProfileCard: React.FC<SocialProfileProps> = ({
  profile,
  onShare,
  onMessage,
  onConnect,
  isDarkMode = false,
}) => {
  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg overflow-hidden`}
    >
      {/* Cover & Avatar */}
      <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500">
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={`${profile.displayName}'s avatar`}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div
              className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 ${
                profile.privacy.profileVisibility === "public"
                  ? "bg-green-500 border-white"
                  : "bg-gray-500 border-white"
              }`}
            />
          </div>
        </div>
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={() => onShare(profile.userId)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Share profile"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => onMessage(profile.userId)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Send message"
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => onConnect(profile.userId)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Connect"
          >
            <UserPlus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-14 px-6 pb-6">
        <div className="mb-4">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {profile.displayName}
          </h2>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {profile.location} · Joined{" "}
            {new Date(profile.joinDate).toLocaleDateString()}
          </p>
          <p
            className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            {profile.bio}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div
            className={`p-3 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center mb-1">
              <Award className="w-4 h-4 text-yellow-500 mr-1" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Level
              </span>
            </div>
            <p
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {profile.achievements.level}
            </p>
          </div>

          <div
            className={`p-3 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center mb-1">
              <Leaf className="w-4 h-4 text-green-500 mr-1" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                CO₂ Reduced
              </span>
            </div>
            <p
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {profile.impact.carbonReduced}kg
            </p>
          </div>

          <div
            className={`p-3 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center mb-1">
              <Trees className="w-4 h-4 text-green-600 mr-1" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Trees Planted
              </span>
            </div>
            <p
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {profile.impact.treesPlanted}
            </p>
          </div>

          <div
            className={`p-3 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center mb-1">
              <Trophy className="w-4 h-4 text-yellow-600 mr-1" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Challenges
              </span>
            </div>
            <p
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {profile.impact.challengesCompleted}
            </p>
          </div>
        </div>

        {/* Connections */}
        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Connections
            </h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Friends
              </p>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {profile.connections.friends.length}
              </p>
            </div>
            <div>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Teams
              </p>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {profile.connections.teams.length}
              </p>
            </div>
            <div>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Following
              </p>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {profile.connections.following.length}
              </p>
            </div>
            <div>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Followers
              </p>
              <p
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {profile.connections.followers.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
