import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../hooks/useTheme";

interface AnimatedCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  icon,
  image,
  onClick,
  className = "",
  badge,
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse movement animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl
        ${theme.mode === "dark" ? "bg-gray-800/50" : "bg-white"}
        backdrop-blur-sm
        ${className}
      `}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onClick={onClick}
    >
      {/* Card Content */}
      <div className="relative p-6 h-full">
        {/* Badge */}
        {badge && (
          <motion.div
            className={`
              absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium
              ${
                theme.mode === "dark"
                  ? "bg-primary-500/20 text-primary-300"
                  : "bg-primary-100 text-primary-600"
              }
            `}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {badge}
          </motion.div>
        )}

        {/* Icon/Image */}
        <div className="mb-4">
          {image ? (
            <motion.div
              className="relative w-full h-48 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          ) : icon ? (
            <motion.div
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${
                  theme.mode === "dark" ? "bg-primary-500/20" : "bg-primary-100"
                }
              `}
              whileHover={{ rotate: 5 }}
            >
              {icon}
            </motion.div>
          ) : null}
        </div>

        {/* Text Content */}
        <motion.h3
          className={`text-xl font-semibold mb-2 ${
            theme.mode === "dark" ? "text-white" : "text-gray-900"
          }`}
          initial={false}
          animate={{ y: isHovered ? -2 : 0 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className={`${
            theme.mode === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
          initial={false}
          animate={{ y: isHovered ? -1 : 0 }}
        >
          {description}
        </motion.p>

        {/* Hover Effects */}
        <AnimatePresence>
          {isHovered && (
            <>
              {/* Gradient Border */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `linear-gradient(45deg, 
                    var(--primary-500) 0%, 
                    var(--primary-400) 50%, 
                    var(--primary-500) 100%
                  )`,
                  padding: "1px",
                  zIndex: -1,
                }}
              />

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 0.1, x: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, white, transparent)",
                }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
