export interface SmartDevice {
  id: string;
  name: string;
  type: "thermostat" | "meter" | "light" | "plug" | "solar" | "other";
  status: "online" | "offline" | "error";
  lastReading: {
    timestamp: string;
    value: number;
    unit: string;
  };
  consumption: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  carbonFootprint: number;
  location: string;
  manufacturer: string;
  model: string;
  settings: {
    autoOptimize: boolean;
    schedules: DeviceSchedule[];
    alerts: boolean;
    thresholds?: {
      min: number;
      max: number;
    };
  };
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

export interface EnergyReportData {
  period: "daily" | "weekly" | "monthly";
  totalConsumption: number;
  carbonFootprint: number;
  savings: {
    energy: number;
    cost: number;
    carbon: number;
  };
  deviceBreakdown: {
    deviceId: string;
    consumption: number;
    percentage: number;
  }[];
  recommendations: {
    id: string;
    title: string;
    description: string;
    potentialSavings: {
      energy: number;
      cost: number;
      carbon: number;
    };
    priority: "high" | "medium" | "low";
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
