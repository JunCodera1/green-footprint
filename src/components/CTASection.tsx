import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to make a{" "}
          <span className="text-emerald-400">positive impact</span>?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Join thousands of people who are taking action for a sustainable
          future. Start your journey today and make a difference!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center"
            icon={
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            }
          >
            Start Free Trial Now
          </Button>
          <p className="text-gray-400 text-sm">
            ✨ No credit card required • Free 30-day trial
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
