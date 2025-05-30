import React from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  icon,
  loading = false,
}) => {
  const baseStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: `bg-primary-600 text-white hover:bg-primary-700 
      dark:bg-primary-500 dark:hover:bg-primary-600`,
    secondary: `bg-gray-100 text-gray-900 hover:bg-gray-200 
      dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700`,
    outline: `border-2 border-primary-600 text-primary-600 hover:bg-primary-50 
      dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/20`,
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
    },
    disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const rippleVariants = {
    initial: {
      scale: 0,
      opacity: 0.5,
    },
    animate: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.button
      onClick={!disabled && !loading ? onClick : undefined}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        ${baseStyles[size]}
        ${variantStyles[variant]}
        ${disabled ? "cursor-not-allowed opacity-60" : ""}
        ${className}
      `}
      variants={buttonVariants}
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      animate={disabled ? "disabled" : undefined}
    >
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            variants={loadingVariants}
            animate="animate"
          />
        ) : icon ? (
          <span className="relative z-10">{icon}</span>
        ) : null}
        <span className="relative z-10">{children}</span>
      </div>

      {/* Ripple effect */}
      {!disabled && !loading && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial="initial"
          animate="animate"
        >
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-lg bg-current"
              variants={rippleVariants}
              style={{
                opacity: 0.1 - i * 0.02,
                transition: `opacity ${0.5 + i * 0.1}s ease-out`,
              }}
              custom={i}
            />
          ))}
        </motion.div>
      )}

      {/* Hover gradient */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-300
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          opacity-0 group-hover:opacity-100
          pointer-events-none
        `}
      />
    </motion.button>
  );
};

export default AnimatedButton;
