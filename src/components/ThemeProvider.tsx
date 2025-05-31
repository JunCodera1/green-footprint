import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "green" | "blue" | "purple" | "eco";
type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check local storage first
    const saved = localStorage.getItem("themeMode");
    if (saved) return saved as ThemeMode;

    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // Check time of day (dark mode between 6 PM and 6 AM)
    const hour = new Date().getHours();
    if (hour < 6 || hour >= 18) {
      return "dark";
    }

    return "light";
  });

  const [color, setColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem("themeColor");
    return (saved as ThemeColor) || "green";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("themeColor", color);
    document.documentElement.setAttribute("data-theme-color", color);
  }, [color]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Auto theme switching based on time
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      if (hour === 6) {
        // Sunrise
        setMode("light");
      } else if (hour === 18) {
        // Sunset
        setMode("dark");
      }
    };

    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ mode, color, setMode, setColor, toggleMode }}
    >
      <div className={`${mode} theme-${color}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
