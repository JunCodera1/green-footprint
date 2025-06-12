import { Sun, Moon } from 'lucide-react';
import { IconMenu2 } from '@tabler/icons-react';
import { Button } from '../ui/button';

interface SiteHeaderProps {
  isMenuOpen: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setIsMenuOpen: (value: boolean) => void;
}

export function SiteHeader({
  isMenuOpen,
  setIsMenuOpen,
  isDarkMode,
  toggleDarkMode,
}: SiteHeaderProps) {
  return (
    <header
      className={`flex h-14 items-center gap-4 border-b  ${
        isDarkMode ? 'border-emerald-700' : 'border-emerald-300'
      } bg-emerald-50/50 px-4 lg:px-6`}
    >
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
        <h1
          className={`text-lg font-semibold ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
          } `}
        >
          Green Footprint
        </h1>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-300 text-yellow-600'
              : 'bg-gray-200 hover:bg-gray-500'
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
