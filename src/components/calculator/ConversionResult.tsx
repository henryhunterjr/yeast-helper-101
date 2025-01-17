import React from 'react';
import { yeastTypes } from '../../utils/yeastCalculations';

interface ConversionResultProps {
  amount: string;
  fromType: string;
  toType: string;
  temperature: string;
  hydration: string;
  result: string;
  temperatureAdjustment: string;
  hydrationAdjustment?: {
    flourAdjustment: number;
    waterAdjustment: number;
  };
  isLoading?: boolean;
}

const ConversionResult = ({ 
  amount, 
  fromType, 
  toType, 
  temperature, 
  hydration,
  result, 
  temperatureAdjustment,
  hydrationAdjustment,
  isLoading = false
}: ConversionResultProps) => {
  if (isLoading) {
    return (
      <div className="bg-yeast-50 p-4 sm:p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Calculating...</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const getFermentationTime = () => {
    const temp = parseFloat(temperature);
    const hyd = parseFloat(hydration);
    
    if (isNaN(temp) || isNaN(hyd)) return "Standard fermentation time (4-8 hours)";
    
    let baseTime = 6; // Base time in hours
    
    // Temperature adjustment
    const tempFactor = Math.pow(2, (temp - 72) / 10);
    baseTime /= tempFactor;
    
    // Hydration adjustment
    const hydrationFactor = 1 + (hyd - 100) / 100;
    baseTime /= hydrationFactor;
    
    const minTime = Math.round(baseTime * 0.75);
    const maxTime = Math.round(baseTime * 1.25);
    
    return `Estimated fermentation time: ${minTime}-${maxTime} hours`;
  };

  return (
    <div className="bg-yeast-50 p-4 sm:p-6 rounded-lg">
      <h3 className="font-semibold mb-4 text-base sm:text-lg">Conversion Result</h3>
      <div className="space-y-4">
        <div className="bg-white p-3 sm:p-4 rounded shadow-sm">
          <p className="text-base sm:text-lg font-mono break-words">
            {amount || '0'}g {yeastTypes[fromType]} =
          </p>
          <p className="text-xl sm:text-2xl font-bold text-yeast-600 font-mono break-words">
            {result}g {yeastTypes[toType]}
          </p>
        </div>
        
        <div className="text-sm text-gray-600">
          <p className="font-medium">Adjustments:</p>
          <ul className="list-disc pl-4 mt-2 space-y-2">
            <li className="break-words">Temperature ({temperature}°F): {temperatureAdjustment}</li>
            <li>Water temperature: {temperature ? `${Math.round(105 - parseFloat(temperature))}°F` : 'Room temperature'}</li>
            
            {hydrationAdjustment && (
              <>
                <li>
                  Hydration ({hydration}%):
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Adjust flour: {hydrationAdjustment.flourAdjustment.toFixed(1)}g</li>
                    <li>Adjust water: {hydrationAdjustment.waterAdjustment.toFixed(1)}g</li>
                  </ul>
                </li>
                <li>{getFermentationTime()}</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConversionResult;