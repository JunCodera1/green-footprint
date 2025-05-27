import React from "react";
import { Calendar, Tag } from "lucide-react";

interface BlogPostProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  authorImage: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  excerpt,
  imageUrl,
  category,
  date,
  author,
  authorImage,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02]">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={authorImage}
              alt={author}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {author}
            </span>
          </div>

          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
