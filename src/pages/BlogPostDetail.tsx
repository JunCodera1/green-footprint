import React from "react";
import { Calendar, User, Tag, Share2, Facebook, Twitter } from "lucide-react";

// Mock data for a single blog post
const blogPost = {
  title: "10 Simple Ways to Reduce Your Carbon Footprint Daily",
  content: `
    <p>In today's era, climate change is one of the greatest challenges humanity faces. Every individual can contribute to environmental protection through small daily actions.</p>

    <h2>1. Use Public Transportation</h2>
    <p>Using public transportation instead of personal vehicles not only reduces carbon emissions but also helps alleviate traffic congestion and save costs.</p>

    <h2>2. Save Energy at Home</h2>
    <p>Turning off electrical devices when not in use, using energy-efficient LED bulbs, and adjusting the air conditioner temperature appropriately are simple ways to reduce energy consumption.</p>
  `,
  imageUrl: "/images/reduce-carbon.jpg",
  category: "Tips & Tricks",
  date: "March 15, 2024",
  author: "John Doe", 
  authorImage: "/images/authors/author1.jpg",
  readTime: "5 min read",
};

// Mock data for related posts
const relatedPosts = [
  {
    id: 1,
    title: "Guide to Recycling Waste at Home",
    excerpt: "Discover simple ways to recycle waste at home...",
    imageUrl: "/images/recycling.jpg",
    date: "March 10, 2024",
  },
  // Add more related posts...
];

const BlogPostDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Image */}
      <div className="w-full h-96 relative">
        <img
          src={blogPost.imageUrl}
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
              {blogPost.category}
            </span>
            <h1 className="text-4xl font-bold mt-4 max-w-4xl mx-auto">
              {blogPost.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Author and Meta Information */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={blogPost.authorImage}
              alt={blogPost.author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-medium dark:text-white">
                {blogPost.author}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                {blogPost.date} · {blogPost.readTime}
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Share on Facebook"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Share"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </article>

        {/* Tags */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="space-x-2">
              {["Environment", "Carbon Footprint", "Sustainability"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;