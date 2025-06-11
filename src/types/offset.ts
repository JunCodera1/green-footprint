export interface CarbonOffsetProject {
  id: string;
  name: string;
  description: string;
  type: "tree-planting" | "renewable-energy" | "conservation" | "other";
  provider: string;
  location: string;
  pricePerTon: number;
  availableTons: number;
  imageUrl: string;
  verificationStandard: string;
  impactMetrics: {
    treesPlanted?: number;
    renewableEnergyGenerated?: number;
    jobsCreated?: number;
    areaProtected?: number;
  };
  projectDuration: {
    start: string;
    end: string;
  };
  rating: number;
  reviewCount: number;
}

export interface OffsetPurchase {
  id: string;
  offsetId: string;
  userId: string;
  purchaseDate: string;
  amount: number;
  totalPrice: number;
  status: "pending" | "completed" | "failed";
  certificate?: string;
}

export interface OffsetPortfolio {
  totalOffsets: number;
  totalInvestment: number;
  projects: {
    offsetId: string;
    amount: number;
    purchaseDate: string;
  }[];
  impactSummary: {
    totalCO2Offset: number;
    treesPlanted: number;
    renewableEnergy: number;
    communitiesSupported: number;
  };
}

export interface OffsetProjectCardProps {
  project: CarbonOffsetProject;
  onPurchase: (project: CarbonOffsetProject) => void;
  isDarkMode?: boolean;
}