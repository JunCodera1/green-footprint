import React, { useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import {
Users,
Trophy,
Calendar,
MessageCircle,
Share2,
ThumbsUp,
MessageSquare,
TrendingUp,
} from "lucide-react";

// Mock data for active challenges
const activeChallenges = [
{
id: 1,
title: "No Plastic July",
description: "Eliminate single-use plastics from your daily routine",
participants: 1234,
daysLeft: 12,
image: "/images/challenges/no-plastic.jpg",
},
{
id: 2,
title: "Green Transport Week",
description: "Use eco-friendly transportation methods",
participants: 856,
daysLeft: 5,
image: "/images/challenges/green-transport.jpg",
},
];

// Mock data for leaderboard
const topContributors = [
{
id: 1,
name: "Sarah Green",
points: 2500,
achievements: 15,
avatar: "/images/avatars/user1.jpg",
badge: "🌳 Earth Guardian",
},
{
id: 2,
name: "John Rivers",
points: 2100,
achievements: 12,
avatar: "/images/avatars/user2.jpg",
badge: "🌱 Eco Warrior",
},
{
id: 3,
name: "Emma Waters",
points: 1900,
achievements: 10,
avatar: "/images/avatars/user3.jpg",
badge: "🌿 Nature Defender",
},
];

// Mock data for forum discussions
const forumDiscussions = [
{
id: 1,
title: "Tips for Starting a Community Garden",
author: "GreenThumb",
replies: 23,
likes: 45,
category: "Urban Gardening",
timeAgo: "2 hours ago",
},
{
id: 2,
title: "Best Practices for Home Composting",
author: "EcoWarrior",
replies: 18,
likes: 32,
category: "Waste Management",
timeAgo: "5 hours ago",
},
];

const Community: React.FC = () => {
const [activeTab, setActiveTab] = useState("forum");

return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navigation />
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-green-300 to-teal-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Green Community</h1>
        <p className="text-xl text-green-100 max-w-3xl mx-auto">
        Join forces with fellow environmentalists to create positive change
        through challenges, discussions, and shared achievements.
        </p>
    </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Navigation Tabs */}
    <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
        className={`pb-4 px-4 ${
            activeTab === "forum"
            ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("forum")}
        >
        <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Forum</span>
        </div>
        </button>
        <button
        className={`pb-4 px-4 ${
            activeTab === "challenges"
            ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("challenges")}
        >
        <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Challenges</span>
        </div>
        </button>
        <button
        className={`pb-4 px-4 ${
            activeTab === "leaderboard"
            ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("leaderboard")}
        >
        <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Leaderboard</span>
        </div>
        </button>
    </div>

    {/* Forum Section */}
    {activeTab === "forum" && (
        <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">
            Recent Discussions
            </h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            New Discussion
            </button>
        </div>

        <div className="grid gap-6">
            {forumDiscussions.map((discussion) => (
            <div
                key={discussion.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
                <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    {discussion.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>By {discussion.author}</span>
                    <span>{discussion.timeAgo}</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        {discussion.category}
                    </span>
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span>{discussion.replies}</span>
                    </div>
                    <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{discussion.likes}</span>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    )}

    {/* Challenges Section */}
    {activeTab === "challenges" && (
        <div>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Active Challenges
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            {activeChallenges.map((challenge) => (
            <div
                key={challenge.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
                <img
                src={challenge.image}
                alt={challenge.title}
                className="w-full h-48 object-cover"
                />
                <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {challenge.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {challenge.description}
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Users className="w-5 h-5" />
                    <span>{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-500">
                    <Calendar className="w-5 h-5" />
                    <span>{challenge.daysLeft} days left</span>
                    </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Join Challenge
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    )}

    {/* Leaderboard Section */}
    {activeTab === "leaderboard" && (
        <div>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Top Contributors
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {topContributors.map((user, index) => (
            <div
                key={user.id}
                className={`flex items-center justify-between p-6 ${
                index !== topContributors.length - 1
                    ? "border-b border-gray-200 dark:border-gray-700"
                    : ""
                }`}
            >
                <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {index === 0 && (
                    <div className="absolute ml-8 -mt-4">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    )}
                    <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                    />
                </div>
                <div>
                    <h3 className="font-semibold dark:text-white">
                    {user.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {user.badge}
                    </span>
                    </div>
                </div>
                </div>
                <div className="flex items-center space-x-6">
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {user.points}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                    Points
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {user.achievements}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                    Achievements
                    </div>
                </div>
                <button
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    title="Share Profile"
                >
                    <Share2 className="w-5 h-5" />
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    )}
    </div>
    <Footer />
</div>
);
};

export default Community;
