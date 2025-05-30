import { useEffect, useRef, useState } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
}

export const useParallax = ({
  speed = 0.5,
  direction = "vertical",
  reverse = false,
}: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const elementTop = elementRef.current.offsetTop;
      const elementHeight = elementRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Calculate how far into the element we've scrolled
      const scrolled =
        (scrollPosition + windowHeight - elementTop) /
        (elementHeight + windowHeight);

      // Clamp value between 0 and 1
      const clamped = Math.min(Math.max(scrolled, 0), 1);

      // Calculate offset based on speed and direction
      const calculatedOffset = reverse
        ? (1 - clamped) * speed * 100
        : clamped * speed * 100;

      setOffset(calculatedOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction, reverse]);

  const style = {
    transform:
      direction === "vertical"
        ? `translateY(${offset}px)`
        : `translateX(${offset}px)`,
    transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  return { ref: elementRef, style };
};
