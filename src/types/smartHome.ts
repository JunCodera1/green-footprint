export type DeviceType =
  | "Smart Light"
  | "Smart Thermostat"
  | "Smart Plug"
  | "Smart Lock"
  | "Security Camera"
  | "Smart Speaker"
  | "Smart TV"
  | "Smart Curtain";

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
