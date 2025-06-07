export interface Tutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}
export interface TutorialSectionProps {
  isDarkMode: boolean;
}

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspots: {
    x: number;
    y: number;
    label: string;
  }[];
}

export interface SearchResult {
  type: "article" | "forum" | "video";
  title: string;
  excerpt: string;
  url: string;
  timestamp?: number;
}

export interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  isDarkMode: boolean;
}

export interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface KnowledgeBaseProps {
  categories: Category[];
  isDarkMode: boolean;
}

export interface AISearchBarProps {
  onSearch: (query: string) => void;
  isDarkMode: boolean;
  isLoading: boolean;
}

export interface Suggestion {
  id: string;
  text: string;
  type: "article" | "question";
}