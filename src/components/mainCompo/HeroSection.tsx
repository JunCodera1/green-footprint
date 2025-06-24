import React from 'react';
import { Globe, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  isDarkMode: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="animate-pulse">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode
                    ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                🌱 The green future starts today
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Track
              </span>
              <br />
              <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>your carbon</span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                footprint
              </span>
            </h1>

            <p
              className={`text-xl leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Discover your environmental impact and learn how to live more sustainably with
              advanced AI technology and an intuitive interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="group bg-gradient-to-r h-15 from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                onClick={() => navigate('/subscription')}
              >
                Start Free Trial
              </Button>
              <Button
                className={`border-2 h-15 border-emerald-600 bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                  isDarkMode ? 'hover:bg-emerald-900/30' : 'hover:bg-emerald-400'
                }`}
                onClick={() => navigate('/watch-demo')}
              >
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
            <div
              className={`relative backdrop-blur-sm rounded-3xl p-8 shadow-2xl border ${
                isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/50'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Carbon Dashboard
                </h3>
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-emerald-900/30 to-teal-900/30'
                      : 'bg-gradient-to-r from-emerald-50 to-teal-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Sun className="w-8 h-8 text-yellow-500" />
                    <div>
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Today
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        2.3 kg CO2
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-emerald-600 font-semibold">-15%</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      vs yesterday
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-xl text-center ${
                      isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                    }`}
                  >
                    <p className="text-2xl font-bold text-blue-600">4.2M</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Green Steps
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-xl text-center ${
                      isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
                    }`}
                  >
                    <p className="text-2xl font-bold text-green-600">87%</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Monthly Goal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
