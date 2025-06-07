export interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (activity: {
    type: "transport" | "energy" | "food";
    description: string;
    co2Amount: number;
    date: Date;
  }) => void;
  isDarkMode: boolean;
}
export interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (goal: { title: string; target: number; deadline: Date }) => void;
  isDarkMode: boolean;
}

export interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (
    activityId: string,
    activity: {
      type: "transport" | "energy" | "food";
      description: string;
      co2Amount: number;
      date: Date;
    }
  ) => void;
  onDelete: (activityId: string) => void;
  activity?: {
    id: string;
    type: "transport" | "energy" | "food";
    description: string;
    co2Amount: number;
    timestamp: Date;
  };
  isDarkMode: boolean;
}