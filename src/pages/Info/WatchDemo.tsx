import { ArrowLeft, ArrowRight, Award, CheckCircle, Leaf, Star, Target, Users } from "lucide-react";
import { useState } from "react";
import WatchDemoButton from "../../components/WatchDemoButton";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const WatchDemoPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const features = [
    {
      icon: <Leaf className="text-green-600" size={24} />,
      title: "Carbon Footprint Tracker",
      description: "Track your daily carbon emissions and get personalized improvement suggestions"
    },
    {
      icon: <Target className="text-blue-600" size={24} />,
      title: "Smart Goals",
      description: "Set sustainable goals and track your progress with intelligent insights"
    },
    {
      icon: <Users className="text-purple-600" size={24} />,
      title: "Community Impact",
      description: "Connect with like-minded people and participate in green challenges"
    },
    {
      icon: <Award className="text-orange-600" size={24} />,
      title: "Green Rewards",
      description: "Earn rewards and recognition for achieving your sustainability milestones"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Kg CO2 Reduced" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "200+", label: "Cities Worldwide" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Consultant",
      content: "GreenFootprint has transformed how I approach sustainable living. The interface is intuitive and the insights are actionable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "University Student",
      content: "Amazing app for tracking environmental impact. I've reduced my carbon footprint by 30% in just 3 months!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Marketing Manager",
      content: "The community features keep me motivated. It's great to see how my actions contribute to a larger movement.",
      rating: 5
    }
  ];

  const benefits = [
    "Real-time carbon footprint tracking",
    "Personalized sustainability recommendations",
    "Community challenges and competitions",
    "Progress analytics and insights",
    "Integration with smart home devices",
    "Offline mode for data collection"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
              <Button 
    onClick={() => navigate("/")} 
    className="fixed top-6 left-6 z-50 bg-white text-black hover:bg-gray-200 shadow-md"
  >
    <ArrowLeft className="mr-2" /> Back
  </Button>

      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Leaf size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet <span className="text-green-200">GreenFootprint</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              The most comprehensive platform for tracking, managing, and reducing your environmental impact. 
              Join the sustainability revolution today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WatchDemoButton />
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-3 rounded-full font-semibold backdrop-blur-sm transition-all duration-300">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Sustainable Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to monitor, understand, and reduce your environmental impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                <div className="p-3 bg-gray-50 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Content Tabs */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore GreenFootprint in Detail
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['overview', 'features', 'benefits'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Transform Your Environmental Impact
                  </h3>
                  <p className="text-gray-600 mb-6">
                    GreenFootprint combines cutting-edge technology with behavioral science to help you 
                    make meaningful changes in your daily life. Our platform tracks over 50 different 
                    environmental metrics and provides actionable insights.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-gray-700">Comprehensive carbon tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-gray-700">AI-powered recommendations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-gray-700">Social impact measurement</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-8 text-center">
                  <Leaf size={64} className="text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Get Started?
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Join thousands of users making a difference
                  </p>
                  <WatchDemoButton />
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Advanced Features
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl">
                      <div className="mb-4">{feature.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Why Choose GreenFootprint?
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Key Benefits
                    </h4>
                    <div className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Impact Measurement
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Carbon Reduction</span>
                        <span className="font-semibold text-green-600">Average 35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Energy Savings</span>
                        <span className="font-semibold text-blue-600">Up to 40%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Water Conservation</span>
                        <span className="font-semibold text-cyan-600">Average 25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users making a real difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Green Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join the movement towards sustainable living. Start tracking your impact today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WatchDemoButton />
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Start Free Trial
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchDemoPage;