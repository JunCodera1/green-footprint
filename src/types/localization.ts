export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  dateFormat: string;
  timeFormat: string;
  currency: {
    code: string;
    symbol: string;
    position: "before" | "after";
  };
  carbonUnit: "kg" | "lbs";
  energyUnit: "kWh" | "MJ";
}

export interface RegionalData {
  region: {
    code: string;
    name: string;
    country: string;
    timezone: string;
  };
  climate: {
    carbonIntensity: number; // gCO2/kWh
    renewablePercentage: number;
    seasonality: {
      current: string;
      nextChange: string;
    };
  };
  transportation: {
    options: {
      type: string;
      carbonPerKm: number;
      availability: "high" | "medium" | "low";
    }[];
    publicTransitCoverage: number;
  };
  programs: {
    id: string;
    name: string;
    organization: string;
    type: "government" | "ngo" | "private";
    description: string;
    eligibility: string[];
    benefits: string[];
    applicationUrl: string;
    startDate: string;
    endDate?: string;
  }[];
  incentives: {
    id: string;
    title: string;
    provider: string;
    type: "tax" | "rebate" | "grant";
    amount: {
      value: number;
      type: "fixed" | "percentage";
    };
    category: "solar" | "ev" | "efficiency" | "other";
    description: string;
    requirements: string[];
    deadline?: string;
  }[];
}

export interface LocalNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author?: string;
  publishDate: string;
  category: "environment" | "policy" | "technology" | "community";
  region: string;
  tags: string[];
  media?: {
    type: "image" | "video";
    url: string;
    caption?: string;
  }[];
  relatedArticles?: {
    id: string;
    title: string;
    url: string;
  }[];
}

export interface TranslationString {
  key: string;
  translations: {
    [locale: string]: {
      value: string;
      status: "approved" | "pending" | "needs-review";
      lastUpdated: string;
    };
  };
  context?: string;
  tags?: string[];
}
