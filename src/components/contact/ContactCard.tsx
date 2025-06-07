import React from "react";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { ContactCardProps } from "../../types/contact";



const ContactCard: React.FC<ContactCardProps> = ({
  isDarkMode,
  onStartChat,
  isChatAvailable,
  contactChannels,
  officeLocation,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Live Chat Card */}
      <div
        className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-4">
          <MessageCircle
            className={`w-6 h-6 mr-2 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Live Chat
          </h3>
        </div>
        <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {isChatAvailable
            ? "Our team is online and ready to help you"
            : "Leave a message and we'll get back to you"}
        </p>
        <button
          onClick={onStartChat}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isChatAvailable
              ? "bg-green-600 hover:bg-green-700 text-white"
              : isDarkMode
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isChatAvailable ? "Start Chat" : "Leave a Message"}
        </button>
      </div>

      {/* Email Channels Card */}
      <div
        className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-4">
          <Mail
            className={`w-6 h-6 mr-2 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Email Us
          </h3>
        </div>
        <div className="space-y-4">
          {contactChannels.map((channel) => (
            <div key={channel.type}>
              <h4
                className={`text-sm font-medium mb-1 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                {channel.type.charAt(0).toUpperCase() + channel.type.slice(1)}
              </h4>
              <a
                href={`mailto:${channel.email}`}
                className={`block text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } hover:underline`}
              >
                {channel.email}
              </a>
              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {channel.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Office Location Card */}
      <div
        className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-4">
          <MapPin
            className={`w-6 h-6 mr-2 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Visit Us
          </h3>
        </div>
        <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {officeLocation.address}
        </p>
        <div className="h-48 rounded-lg overflow-hidden">
          <MapContainer
            center={officeLocation.coordinates}
            zoom={15}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={officeLocation.coordinates}>
              <Popup>Our Office</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
