import React, { useState, useEffect } from "react";
import { Calendar, Tag, Share2, Facebook, Twitter, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Mock data - Nên fetch từ API thực tế
const blogPosts = [
  {
    id: "1",
    title: "10 Simple Ways to Reduce Your Carbon Footprint Daily",
    content: `
      <p>In today's era, climate change is one of the greatest challenges humanity faces...</p>
      <h2>1. Use Public Transportation</h2>
      <p>Using public transportation instead of personal vehicles...</p>
    `,
    imageUrl: "/images/reduce-carbon.jpg",
    category: "Tips & Tricks",
    date: "March 15, 2024",
    author: "Eco Warrior",
    authorImage: "/images/authors/author1.jpg",
    readTime: "5 min read",
    tags: ["Environment", "Carbon Footprint", "Sustainability"]
  },
  // Thêm các bài viết khác...
];

const relatedPosts = [
  {
    id: "2",
    title: "Urban Gardening: Grow Food in Small Spaces",
    excerpt: "How apartment dwellers can reduce food miles...",
    imageUrl: "/images/urban-garden.jpg",
    date: "March 8, 2024"
  },
  // Thêm bài liên quan...
];

const BlogPostDetail: React.FC = () => {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const post = blogPosts.find(p => p.id === id) || blogPosts[0];

  useEffect(() => {
    // Kiểm tra theme preference từ localStorage hoặc system preference
    const darkMode = localStorage.getItem('darkMode') === 'true' || 
                    (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(darkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100),
        url: window.location.href,
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        scrollY={0}
        isMenuOpen={false}
        setIsMenuOpen={() => {}}
        handleLinkClick={() => {}}
      />
      
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link 
          to="/blog" 
          className={`inline-flex items-center ${isDarkMode ? 'text-green-300 hover:text-green-200' : 'text-green-600 hover:text-green-800'}`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full h-96 relative mt-4">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold mt-4 max-w-4xl mx-auto">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Author Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-8 mb-8 border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {post.author}
              </div>
              <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-4 h-4 mr-1" />
                {post.date} · {post.readTime}
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <article className={`prose prose-lg max-w-none 
          ${isDarkMode ? 'prose-invert prose-headings:text-green-300' : 'prose-green'}`}
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link 
                    to={`/blog?tag=${tag.toLowerCase()}`}
                    key={tag}
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium transition-colors
                      ${isDarkMode 
                        ? 'bg-gray-800 text-green-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-green-700 hover:bg-gray-200'}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Link 
                to={`/blog/${post.id}`}
                key={post.id}
                className={`rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.02]
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {post.excerpt}
                  </p>
                  <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default BlogPostDetail;