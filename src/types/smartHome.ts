export type DeviceType =
  | "Smart Light"
  | "Smart Thermostat"
  | "Smart Plug"
  | "Smart Lock"
  | "Security Camera"
  | "Smart Speaker"
  | "Smart TV"
  | "Smart Curtain"
  | "Smart Solar";

export type DeviceStatus = "online" | "offline" | "error";

export type DeviceLocation =
  | "Living Room"
  | "Bedroom"
  | "Kitchen"
  | "Bathroom"
  | "Office"
  | "Garage"
  | "Garden"
  | "Hallway";

export interface EnergyUsage {
  current: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export interface SmartDevice {
  id: string;
  name: string;
  type: DeviceType;
  location: DeviceLocation;
  manufacturer: string;
  model: string;
  status: DeviceStatus;
  lastUpdated: string;
  energyUsage: EnergyUsage;
  lastReading: {
    value: number;
    unit: string;
  };
  carbonFootprint?: number;
}

export interface EnergyReportData {
  period: string;
  totalUsage: number;
  savings: number;
  comparison: {
    previousPeriod: number;
    change: number;
  };
  deviceBreakdown: {
    deviceId: string;
    usage: number;
    percentage: number;
  }[];
  recommendations: string[];
}

export interface DeviceSchedule {
  id: string;
  name: string;
  deviceId: string;
  type: "daily" | "weekly" | "custom";
  active: boolean;
  actions: {
    time: string;
    action: "on" | "off" | "adjust";
    value?: number;
  }[];
}

export interface SmartMeterData {
  timestamp: string;
  reading: number;
  unit: string;
  type: "electricity" | "gas" | "water";
  source: "manual" | "automatic";
  verified: boolean;
}

export interface AddAdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (advice: {
    title: string;
    description: string;
    impact: string;
    deviceType: string;
  }) => void;
  isDarkMode: boolean;
}

export interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (device: {
    name: string;
    type: string;
    location: string;
    manufacturer: string;
    model: string;
  }) => void;
  isDarkMode: boolean;
}

export interface DeviceCardProps {
  device: SmartDevice;
  onSettings: (deviceId: string) => void;
  onToggle: (deviceId: string, status: boolean) => void;
  isDarkMode?: boolean;
}

export interface EnergyReportProps {
  report: EnergyReport;
  isDarkMode?: boolean;
}

export interface EnergyReport {
  period: string;
  totalConsumption: number; // in kWh
  carbonFootprint: number; // in kg
  savings: {
    cost: number; // in dollars
  };
  deviceBreakdown: DeviceConsumption[];
  recommendations: Recommendation[];
}

export interface DeviceConsumption {
  deviceId: string;
  consumption: number; // in kWh
  percentage: number; // 0 - 100
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  potentialSavings: {
    cost: number; // $
    carbon: number; // kg CO₂
    energy: number; // kWh
  };
}
