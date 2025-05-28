import React from "react";
import { Calendar } from "lucide-react";

interface BlogPostProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  authorImage: string;
  additionalInfo?: React.ReactNode;
  isDarkMode?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  excerpt,
  imageUrl,
  category,
  date,
  author,
  authorImage,
  additionalInfo,
  isDarkMode = false,
}) => {
  return (
    <div className={`
      rounded-lg overflow-hidden shadow-lg 
      transition-colors duration-300
      ${isDarkMode 
        ? "bg-gray-800 hover:bg-gray-700" 
        : "bg-white hover:bg-gray-50"
      }
      border ${isDarkMode ? "border-gray-700" : "border-gray-200"}
    `}>
      {/* Image with category badge */}
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${isDarkMode 
              ? "bg-emerald-600 text-white" 
              : "bg-emerald-500 text-white"
            }
          `}>
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`
          text-xl font-bold mb-2 
          ${isDarkMode ? "text-white" : "text-gray-900"}
        `}>
          {title}
        </h3>
        
        <p className={`
          mb-4 line-clamp-3 
          ${isDarkMode ? "text-gray-300" : "text-gray-600"}
        `}>
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={authorImage}
              alt={author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className={`
              text-sm 
              ${isDarkMode ? "text-gray-400" : "text-gray-600"}
            `}>
              {author}
            </span>
          </div>

          <div className={`
            flex items-center text-sm
            ${isDarkMode ? "text-gray-500" : "text-gray-400"}
          `}>
            <Calendar className="w-4 h-4 mr-1" />
            {date}
            {additionalInfo && (
              <span className="ml-3">{additionalInfo}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;