import Link from 'next/link';
import { Button } from '../../components/ui/button';
import Navigation from '../../components/mainCompo/Navigation';
import Footer from '../../components/mainCompo/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background with JSON pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/pattern-1.svg')] bg-repeat opacity-5 dark:opacity-10" />

      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />

      <main className="flex-1 flex items-center justify-center px-4 pt-24">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-9xl font-bold text-emerald-600 dark:text-emerald-400">404</h1>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-gray-600 dark:text-gray-400">
              Let's get you back on track to reducing your carbon footprint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300"
              >
                <Link href="/">Return Home</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-colors duration-300"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
