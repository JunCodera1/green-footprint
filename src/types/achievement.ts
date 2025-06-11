export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "reduction" | "lifestyle" | "community" | "special";
  progress: number;
  target: number;
  completed: boolean;
  completedAt?: string;
  reward: {
    type: "points" | "badge" | "credit";
    value: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly";
  startDate: string;
  endDate: string;
  participants: number;
  carbonReduction: number;
  reward: {
    type: "points" | "badge" | "credit";
    value: number;
  };
  progress: number;
  completed: boolean;
}

export interface UserProgress {
  level: number;
  currentPoints: number;
  pointsToNextLevel: number;
  totalCarbonReduced: number;
  completedAchievements: number;
  totalAchievements: number;
  currentStreak: number;
  longestStreak: number;
}

export interface AchievementCardProps {
  achievement: Achievement;
  isDarkMode?: boolean;
}

export interface ChallengeCardProps {
  challenge: Challenge;
  onJoin: (challengeId: string) => void;
  isDarkMode?: boolean;
}
