export interface FormData {
  // Transportation
  carMiles: number;
  carType: 'gas' | 'hybrid' | 'electric';
  publicTransport: number;
  flights: number;

  // Energy
  electricity: number;
  gas: number;
  heating: 'gas' | 'electric' | 'oil' | 'renewable';
  homeSize: 'small' | 'medium' | 'large';

  // Food
  meatFrequency: number;
  dairyFrequency: number;
  localFood: number;
  organicFood: number;

  // Consumption
  shoppingFrequency: number;
  clothingPurchases: number;
  electronicsPurchases: number;
  recyclingHabits: number;
}

export interface Results {
  transportation: number;
  energy: number;
  food: number;
  consumption: number;
  total: number;
}
