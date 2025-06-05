import React, { useState } from "react";
import { Users, ExternalLink } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  funFact: string;
  linkedIn: string;
}

interface TeamSectionProps {
  members: TeamMember[];
  isDarkMode: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ members, isDarkMode }) => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Users
            className={`w-12 h-12 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
        </div>
        <h2
          className={`text-3xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Meet Our Team
        </h2>
        <p
          className={`max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Passionate individuals working together to create a sustainable future
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {members.map((member, index) => (
          <div
            key={member.name}
            className="relative group"
            onMouseEnter={() => setHoveredMember(index)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div
              className={`relative rounded-xl overflow-hidden transform transition-all duration-300 ${
                hoveredMember === index ? "scale-105" : ""
              }`}
            >
              {/* 3D Avatar Container */}
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:rotate-y-180"
                />
              </div>

              {/* Overlay with Fun Fact */}
              <div
                className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300 ${
                  hoveredMember === index ? "opacity-100" : "opacity-0"
                } ${isDarkMode ? "bg-gray-900/90" : "bg-white/90"}`}
              >
                <div className="text-center">
                  <p
                    className={`text-lg font-medium mb-2 ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    Fun Fact
                  </p>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {member.funFact}
                  </p>
                </div>
              </div>
            </div>

            {/* Member Info */}
            <div className="mt-4 text-center">
              <h3
                className={`text-xl font-semibold mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`text-sm mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {member.role}
              </p>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-sm ${
                  isDarkMode
                    ? "text-green-400 hover:text-green-300"
                    : "text-green-600 hover:text-green-700"
                }`}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Join Us CTA */}
      <div className="text-center mt-16">
        <a
          href="/careers"
          className={`inline-flex items-center px-6 py-3 rounded-lg text-white transition-colors ${
            isDarkMode
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Join Our Team
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default TeamSection;
