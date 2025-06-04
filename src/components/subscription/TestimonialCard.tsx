import React from "react";
import type { Testimonial } from "../../types/subscription";
import { StarIcon } from "@heroicons/react/24/solid";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatarUrl}
          alt={`${testimonial.userName}'s avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-medium text-gray-900">{testimonial.userName}</h4>
          <p className="text-sm text-gray-600">{testimonial.userRole}</p>
        </div>
      </div>

      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-700 italic">"{testimonial.content}"</p>
    </div>
  );
};
