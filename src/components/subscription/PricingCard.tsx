import React from "react";
import type { PricingCardProps } from "../../types/subscription";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";


export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  onSelectPlan,
}) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl p-8 ${
        plan.popularPlan ? "border-2 border-green-500" : ""
      }`}
    >
      {plan.popularPlan && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>

        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            ${plan.price}
          </span>
          <span className="text-gray-600">/{plan.billingPeriod}</span>
        </div>

        <div className="mb-6">
          <span className="text-sm text-gray-600">
            {plan.trialDays} days free trial
          </span>
        </div>

        <button
          onClick={() => onSelectPlan(plan)}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            plan.popularPlan
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          Get Started
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <div key={feature.id} className="flex items-start">
            {feature.included ? (
              <CheckIcon className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <XMarkIcon className="h-5 w-5 text-gray-400 mt-0.5" />
            )}
            <div className="ml-3">
              <p className="text-gray-800 font-medium">{feature.name}</p>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
