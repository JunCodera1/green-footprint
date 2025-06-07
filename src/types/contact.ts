export interface ContactChannel {
  type: "support" | "sales" | "press";
  email: string;
  description: string;
}

export interface ContactCardProps {
  isDarkMode: boolean;
  onStartChat: () => void;
  isChatAvailable: boolean;
  contactChannels: ContactChannel[];
  officeLocation: {
    address: string;
    coordinates: [number, number]; // [latitude, longitude]
  };
}

// ResourceHub
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface MediaKitItem {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
}

export interface ResourceHubProps {
  isDarkMode: boolean;
  faqs: FAQ[];
  mediaKit: MediaKitItem[];
}

// Smart Contact form

export interface HelpArticle {
  id: string;
  title: string;
  url: string;
  keywords: string[];
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  options?: string[];
}

export interface SmartContactFormProps {
  isDarkMode: boolean;
  topics: string[];
  helpArticles: HelpArticle[];
  onSubmit: (formData: {
    name: string;
    email: string;
    topic: string;
    message: string;
    company?: string;
    phone?: string;
    orderNumber?: string;
  }) => void;
}