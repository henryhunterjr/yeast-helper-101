import { YeastType } from '@/types/recipe';

export const calculateWaterTemperature = (
  roomTemp: number,
  yeastType: YeastType
): number => {
  const desiredTemp = yeastType === 'sourdough' ? 78 : 75;
  const waterTemp = (desiredTemp * 3) - roomTemp;
  
  if (yeastType === 'sourdough') {
    return Math.min(Math.max(waterTemp, 78), 82);
  }
  return Math.min(Math.max(waterTemp, 75), 80);
};

export const calculateProofingTime = (
  hydrationPercentage: number,
  yeastType: YeastType
): { min: number; max: number } => {
  // Base calculation for active dry yeast
  const baseTime = 2.5;
  const hydrationFactor = (100 - hydrationPercentage) / 50;
  
  let minTime = baseTime - hydrationFactor;
  let maxTime = baseTime + hydrationFactor;

  // Adjust times based on yeast type
  switch (yeastType) {
    case 'instant':
      minTime *= 0.75;
      maxTime *= 0.75;
      break;
    case 'fresh':
      minTime *= 1.1;
      maxTime *= 1.1;
      break;
    case 'sourdough':
      minTime = (hydrationPercentage / 100) * 4;
      maxTime = (hydrationPercentage / 100) * 6;
      break;
  }

  return {
    min: Math.max(minTime, 1), // Ensure minimum time is at least 1 hour
    max: maxTime
  };
};

// Re-export the fermentation time calculation
export const calculateFermentationTime = calculateProofingTime;

// Utility function to format time range
export const formatTimeRange = (min: number, max: number): string => {
  const formatHours = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (minutes === 0) return `${wholeHours}h`;
    return `${wholeHours}h ${minutes}m`;
  };

  return `${formatHours(min)} - ${formatHours(max)}`;
};