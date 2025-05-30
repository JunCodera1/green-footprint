import { useState, useEffect } from "react";

type ThemeColor = "green" | "blue" | "purple" | "eco";
type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  color: ThemeColor;
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : { mode: "light", color: "green" };
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("theme", JSON.stringify(theme));

    // Apply theme classes
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme.mode);
    root.setAttribute("data-theme-color", theme.color);
  }, [theme]);

  // Auto theme switching based on time
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour < 6 || hour >= 18; // Dark mode between 6 PM and 6 AM

      setTheme((prev) => ({
        ...prev,
        mode: shouldBeDark ? "dark" : "light",
      }));
    };

    const interval = setInterval(checkTime, 60000); // Check every minute
    checkTime(); // Initial check

    return () => clearInterval(interval);
  }, []);

  const setMode = (mode: ThemeMode) => {
    setTheme((prev) => ({ ...prev, mode }));
  };

  const setColor = (color: ThemeColor) => {
    setTheme((prev) => ({ ...prev, color }));
  };

  return { theme, setMode, setColor };
};
