export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: "climate" | "energy" | "waste" | "biodiversity" | "sustainability";
  difficulty: "beginner" | "intermediate" | "advanced";
  questions: {
    id: string;
    text: string;
    type: "multiple-choice" | "true-false" | "open-ended";
    options?: string[];
    correctAnswer: string | string[];
    explanation: string;
    points: number;
  }[];
  timeLimit?: number;
  passingScore: number;
  reward: {
    points: number;
    badge?: string;
  };
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  format: "video" | "article" | "interactive";
  content: {
    sections: {
      title: string;
      content: string;
      media?: {
        type: "image" | "video";
        url: string;
        caption?: string;
      }[];
    }[];
    resources: {
      title: string;
      type: "link" | "pdf" | "download";
      url: string;
    }[];
  };
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  progress?: {
    completed: boolean;
    lastPosition: number;
    dateStarted: string;
    dateCompleted?: string;
  };
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    title: string;
    organization: string;
    bio: string;
    avatar: string;
  };
  schedule: {
    startTime: string;
    endTime: string;
    timezone: string;
  };
  capacity: number;
  registrations: number;
  topics: string[];
  requirements?: string[];
  recording?: {
    available: boolean;
    url?: string;
    duration?: number;
  };
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  level: "basic" | "intermediate" | "expert";
  requirements: {
    quizzes: string[];
    tutorials: string[];
    projects?: {
      description: string;
      criteria: string[];
    }[];
  };
  duration: {
    estimated: number;
    validity: number;
  };
  benefits: string[];
  modules: {
    id: string;
    title: string;
    description: string;
    status: "locked" | "available" | "completed";
    progress: number;
  }[];
  certification: {
    image: string;
    validUntil?: string;
    verificationUrl?: string;
  };
}
