import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, UserPlus, ArrowLeft, Home } from "lucide-react";

const AuthNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isForgotPasswordPage = location.pathname === "/forgot-password";

  return (
    <div className="fixed top-6 left-6 flex gap-4">
      {/* Home button - always show */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
        aria-label="Back to home"
      >
        <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500" />
      </button>

      {/* Back button - only show on forgot password page */}
      {isForgotPasswordPage && (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          aria-label="Back to login"
        >
          <ArrowLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500" />
        </button>
      )}

      {/* Login/Signup toggle button */}
      {!isForgotPasswordPage && (
        <button
          onClick={() => navigate(isLoginPage ? "/signup" : "/login")}
          className="flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          aria-label={isLoginPage ? "Switch to sign up" : "Switch to login"}
        >
          <div className="flex items-center gap-2">
            {isLoginPage ? (
              <>
                <UserPlus className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500">
                  Create Account
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500">
                  Sign In
                </span>
              </>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default AuthNavigation;
