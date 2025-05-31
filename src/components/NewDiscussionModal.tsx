import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (discussion: {
    title: string;
    content: string;
    category: string;
  }) => void;
  isDarkMode: boolean;
}

const NewDiscussionModal: React.FC<NewDiscussionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isDarkMode,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [discussion, setDiscussion] = useState({
    title: "",
    content: "",
    category: "Urban Gardening",
  });

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(discussion);
    setDiscussion({
      title: "",
      content: "",
      category: "Urban Gardening",
    });
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200); // Match with CSS transition duration
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <div
        className={`fixed inset-0 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "bg-black/40 opacity-100" : "opacity-0"
        } z-40`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4 max-h-[90vh] flex items-center">
        <div
          className={`bg-white dark:bg-gray-800/95 rounded-lg shadow-xl w-full ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          } max-h-[calc(90vh-2rem)] flex flex-col transition-all duration-200 ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold dark:text-white">
              Create New Discussion
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/70"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="discussion-title"
                  className="block text-sm font-medium mb-2 dark:text-gray-200"
                >
                  Title
                </label>
                <input
                  id="discussion-title"
                  type="text"
                  value={discussion.title}
                  onChange={(e) =>
                    setDiscussion({ ...discussion, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700/90 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
                  placeholder="Enter discussion title"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="discussion-category"
                  className="block text-sm font-medium mb-2 dark:text-gray-200"
                >
                  Category
                </label>
                <select
                  id="discussion-category"
                  value={discussion.category}
                  onChange={(e) =>
                    setDiscussion({ ...discussion, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700/90 dark:text-gray-100 transition-colors"
                  aria-label="Select discussion category"
                >
                  <option>Urban Gardening</option>
                  <option>Waste Management</option>
                  <option>Renewable Energy</option>
                  <option>Sustainable Living</option>
                  <option>Climate Action</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="discussion-content"
                  className="block text-sm font-medium mb-2 dark:text-gray-200"
                >
                  Content
                </label>
                <textarea
                  id="discussion-content"
                  value={discussion.content}
                  onChange={(e) =>
                    setDiscussion({ ...discussion, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700/90 dark:text-gray-100 dark:placeholder-gray-400 min-h-[150px] transition-colors resize-none"
                  placeholder="Enter your discussion content"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/70 dark:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Discussion
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewDiscussionModal;
