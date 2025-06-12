import React from 'react';
import { Leaf } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">GreenFootprint</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Leading carbon footprint tracking platform, helping you live sustainably and protect
              our planet.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/carbon-tracking" className="hover:text-white transition-colors">
                  Carbon Tracking
                </a>
              </li>
              <li>
                <a href="/smart-home" className="hover:text-white transition-colors">
                  Smart Home
                </a>
              </li>
              <li>
                <a href="/carbon-offset" className="hover:text-white transition-colors">
                  Carbon Offset
                </a>
              </li>
              <li>
                <a href="/eco-scene" className="hover:text-white transition-colors">
                  EcoScene
                </a>
              </li>
              <li>
                <a href="/achievements" className="hover:text-white transition-colors">
                  Achievements
                </a>
              </li>
              <li>
                <a href="/api" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/social" className="hover:text-white transition-colors">
                  Social
                </a>
              </li>
              <li>
                <a href="/education" className="hover:text-white transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="help-center" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/documentation" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/subscription" className="hover:text-white transition-colors">
                  Subscription
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 GreenFootprint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
