import React, { useState } from 'react';
import type { SubscriptionPlan, Testimonial } from '../../types/subscription';
import { PricingCard } from '../../components/subscription/PricingCard';
import { TestimonialCard } from '../../components/subscription/TestimonialCard';
import Footer from '../../components/mainCompo/Footer';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const mockPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    billingPeriod: 'monthly',
    description: 'Perfect for getting started with carbon tracking',
    trialDays: 0,
    features: [
      {
        id: 'basic-1',
        name: 'Basic Carbon Tracking',
        description: 'Track your personal carbon footprint',
        included: true,
      },
      {
        id: 'basic-2',
        name: 'Monthly Reports',
        description: 'Get monthly insights about your progress',
        included: true,
      },
      {
        id: 'basic-3',
        name: 'Community Access',
        description: 'Join our eco-friendly community',
        included: true,
      },
      {
        id: 'basic-4',
        name: 'Advanced Analytics',
        description: 'Detailed analysis of your carbon impact',
        included: false,
      },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    billingPeriod: 'monthly',
    description: 'For environmentally conscious individuals',
    popularPlan: true,
    trialDays: 14,
    features: [
      {
        id: 'pro-1',
        name: 'Everything in Basic',
        description: 'All features from the Basic plan',
        included: true,
      },
      {
        id: 'pro-2',
        name: 'Advanced Analytics',
        description: 'Detailed analysis of your carbon impact',
        included: true,
      },
      {
        id: 'pro-3',
        name: 'Personalized Recommendations',
        description: 'Get AI-powered suggestions to reduce your footprint',
        included: true,
      },
      {
        id: 'pro-4',
        name: 'Priority Support',
        description: '24/7 support via email and chat',
        included: true,
      },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 29.99,
    billingPeriod: 'monthly',
    description: 'For teams and organizations',
    trialDays: 30,
    features: [
      {
        id: 'business-1',
        name: 'Everything in Pro',
        description: 'All features from the Pro plan',
        included: true,
      },
      {
        id: 'business-2',
        name: 'Team Management',
        description: 'Manage multiple team members',
        included: true,
      },
      {
        id: 'business-3',
        name: 'API Access',
        description: 'Integrate with your existing tools',
        included: true,
      },
      {
        id: 'business-4',
        name: 'Custom Reporting',
        description: 'Create custom reports for your organization',
        included: true,
      },
    ],
  },
];

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    userRole: 'Environmental Activist',
    avatarUrl: '/images/testimonials/sarah.jpg',
    content:
      'This platform has completely changed how I think about my environmental impact. The Premium features are worth every penny!',
    rating: 5,
  },
  {
    id: '2',
    userName: 'Michael Chen',
    userRole: 'Business Owner',
    avatarUrl: '/images/testimonials/michael.jpg',
    content:
      'The business plan helped our company reduce our carbon footprint by 30% in just 6 months. Amazing analytics and insights!',
    rating: 5,
  },
  {
    id: '3',
    userName: 'Emma Wilson',
    userRole: 'Student',
    avatarUrl: '/images/testimonials/emma.jpg',
    content:
      'Even the basic plan offers great features for students like me. The community support is incredible!',
    rating: 4,
  },
];

export const Subscription: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    // Handle plan selection (e.g., redirect to checkout)
    console.log('Selected plan:', plan);
  };

  return (
    <div className="mx-auto">
      <Button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 bg-white text-black hover:bg-gray-200 shadow-md"
      >
        <ArrowLeft className="mr-2" /> Back
      </Button>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 pt-15">Choose Your Green Impact Plan</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of environmentally conscious individuals and organizations making a
          difference
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            className={`px-6 py-2 rounded-md ${
              selectedPeriod === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
            }`}
            onClick={() => setSelectedPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              selectedPeriod === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
            }`}
            onClick={() => setSelectedPeriod('yearly')}
          >
            Yearly
            <span className="ml-2 text-green-500 text-sm">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {mockPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={{
              ...plan,
              price:
                selectedPeriod === 'yearly'
                  ? Math.round(plan.price * 12 * 0.8 * 100) / 100
                  : plan.price,
              billingPeriod: selectedPeriod,
            }}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Members Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="bg-green-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Money-Back Guarantee</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Try any paid plan risk-free. If you're not completely satisfied within the first 30 days,
          we'll refund your payment in full. No questions asked.
        </p>
      </div>
      <Footer isDarkMode={false}></Footer>
    </div>
  );
};
export default Subscription;
