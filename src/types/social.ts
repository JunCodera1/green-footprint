export interface SocialProfile {
  userId: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  achievements: {
    badges: string[];
    totalPoints: number;
    level: number;
  };
  impact: {
    carbonReduced: number;
    treesPlanted: number;
    challengesCompleted: number;
  };
  connections: {
    friends: string[];
    teams: string[];
    following: string[];
    followers: string[];
  };
  privacy: {
    profileVisibility: "public" | "friends" | "private";
    activitySharing: boolean;
    showLocation: boolean;
  };
}

export interface Team {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdAt: string;
  createdBy: string;
  members: {
    userId: string;
    role: "admin" | "member";
    joinedAt: string;
  }[];
  stats: {
    totalCarbonReduced: number;
    averagePerMember: number;
    ranking: number;
    challengesCompleted: number;
  };
  currentChallenge?: {
    id: string;
    progress: number;
    endDate: string;
  };
}

export interface SocialPost {
  id: string;
  userId: string;
  type: "achievement" | "challenge" | "milestone" | "tip" | "general";
  content: {
    text: string;
    media?: {
      type: "image" | "video";
      url: string;
    }[];
    achievement?: {
      id: string;
      name: string;
      icon: string;
    };
    impact?: {
      carbonReduced: number;
      activity: string;
    };
  };
  createdAt: string;
  likes: string[];
  comments: {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
  }[];
  shares: number;
  visibility: "public" | "friends" | "team";
}

export interface SocialInvite {
  id: string;
  type: "friend" | "team" | "challenge";
  from: {
    userId: string;
    name: string;
    avatar: string;
  };
  to: {
    email: string;
    name?: string;
  };
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  expiresAt: string;
  message?: string;
  referralCode?: string;
}

export interface SocialProfileProps {
  profile: SocialProfile;
  onShare: (userId: string) => void;
  onMessage: (userId: string) => void;
  onConnect: (userId: string) => void;
  isDarkMode?: boolean;
}
