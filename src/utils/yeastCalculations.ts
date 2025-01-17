export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
};

export const calculateConversion = (amount: string, from: string, to: string): string => {
  if (!amount) return '0';
  const ratios: Record<string, Record<string, number>> = {
    'active-dry': { 'instant': 0.89, 'fresh': 3, 'sourdough': 48 },
    'instant': { 'active-dry': 1.125, 'fresh': 3.375, 'sourdough': 54 },
    'fresh': { 'active-dry': 0.333, 'instant': 0.296, 'sourdough': 16 },
    'sourdough': { 'active-dry': 0.021, 'instant': 0.019, 'fresh': 0.0625 }
  };
  
  if (from === to) return amount;
  const ratio = ratios[from]?.[to] || 1;
  return (parseFloat(amount) * ratio).toFixed(2);
};

export const getTemperatureAdjustment = (temp: number): string => {
  if (temp < 65) return 'Increase proofing time by 15-20%';
  if (temp > 80) return 'Decrease proofing time by 15-20%';
  return 'Standard proofing time';
};