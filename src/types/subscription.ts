export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: SubscriptionFeature[];
  popularPlan?: boolean;
  trialDays: number;
  description: string;
}

export interface Testimonial {
  id: string;
  userName: string;
  userRole: string;
  avatarUrl: string;
  content: string;
  rating: number;
}

export interface PricingCardProps {
  plan: SubscriptionPlan;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}