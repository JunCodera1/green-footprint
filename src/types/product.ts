export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  rating: number;
  reviewCount: number;
  carbonFootprint: {
    value: number;
    unit: string;
  };
  ecoFeatures: string[];
  affiliateLink: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  minRating?: number;
  maxCarbonFootprint?: number;
}
