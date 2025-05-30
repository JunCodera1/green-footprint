import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParallax } from "../hooks/useParallax";

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage?: string;
  overlayColor?: string;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  bgImage,
  overlayColor = "rgba(0, 0, 0, 0.4)",
  speed = 0.5,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Use our custom parallax hook for additional elements
  const { ref: textRef, style: textStyle } = useParallax({
    speed: speed * 0.5,
    direction: "vertical",
    reverse: true,
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden min-h-[50vh] ${className}`}
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{
          y,
          scale,
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
        />
      </motion.div>

      {/* Content with Fade and Scale */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div ref={textRef} style={textStyle}>
          {children}
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </div>
  );
};

export default ParallaxSection;
