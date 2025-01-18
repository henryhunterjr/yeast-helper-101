export const BASE_TEMPERATURE = 72; // °F
export const BASE_HYDRATION = 100; // %
export const MIN_TEMP = 32;
export const MAX_TEMP = 120;
export const MIN_HYDRATION = 50;
export const MAX_HYDRATION = 200;
export const MIN_AMOUNT = 0.1;
export const MAX_AMOUNT = 1000;

export const validateAmount = (amount: number): string | null => {
  if (isNaN(amount)) return "Please enter a valid number";
  if (amount < MIN_AMOUNT) return `Minimum amount is ${MIN_AMOUNT}g`;
  if (amount > MAX_AMOUNT) return `Maximum amount is ${MAX_AMOUNT}g`;
  return null;
};

export const validateTemperature = (temp: number): string | null => {
  if (isNaN(temp)) return "Please enter a valid temperature";
  if (temp < MIN_TEMP) return `Minimum temperature is ${MIN_TEMP}°F`;
  if (temp > MAX_TEMP) return `Maximum temperature is ${MAX_TEMP}°F`;
  return null;
};

export const validateHydration = (hydration: number): string | null => {
  if (isNaN(hydration)) return "Please enter a valid hydration percentage";
  if (hydration < MIN_HYDRATION) return `Minimum hydration is ${MIN_HYDRATION}%`;
  if (hydration > MAX_HYDRATION) return `Maximum hydration is ${MAX_HYDRATION}%`;
  return null;
};