import React from "react";
import { Leaf, Menu, X, Sun, Moon } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { IconMenu2 } from "@tabler/icons-react";
import { Button } from "../ui/button";

interface SiteHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export function SiteHeader({ isMenuOpen, setIsMenuOpen }: SiteHeaderProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="flex h-14 items-center gap-4 border-b border-emerald-100 bg-emerald-50/50 px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <IconMenu2 className="h-5 w-5 text-emerald-700" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-emerald-800">
          Green Footprint
        </h1>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
}
