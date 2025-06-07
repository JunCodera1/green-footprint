export interface DataCategory {
  id: string;
  name: string;
  whatWeCollect: string[];
  whyWeNeedIt: string[];
  howProcessed: {
    step: string;
    description: string;
  }[];
  isEnabled: boolean;
}

export interface Props {
  categories: DataCategory[];
  onToggleCategory: (categoryId: string) => void;
  onDownloadData: () => void;
  onDeleteAccount: () => void;
  isDarkMode: boolean;
}