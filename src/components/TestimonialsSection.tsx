import React from "react";
import type { Testimonial } from "../types";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  currentTestimonial,
  setCurrentTestimonial,
}) => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Thousands of people trust GreenFootprint on their journey to
            sustainable living
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>
              <blockquote className="text-xl lg:text-2xl text-gray-800 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div>
                <p className="font-bold text-gray-800 text-lg">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-white scale-125"
                    : "bg-white/50"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
