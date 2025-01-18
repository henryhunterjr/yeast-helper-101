import React from 'react';
import ConversionSummary from './conversion/ConversionSummary';
import AdjustmentDetails from './conversion/AdjustmentDetails';

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
    showAdjustments: boolean;
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
  const getFermentationTime = () => {
    const temp = parseFloat(temperature);
    const hyd = parseFloat(hydration);
    
    if (isNaN(temp) || isNaN(hyd)) return "Standard fermentation time (4-8 hours)";
    
    let baseTime = 6; // Base time in hours
    const tempFactor = Math.pow(2, (temp - 72) / 10);
    baseTime /= tempFactor;
    const hydrationFactor = 1 + (hyd - 100) / 100;
    baseTime /= hydrationFactor;
    
    const minTime = Math.round(baseTime * 0.75);
    const maxTime = Math.round(baseTime * 1.25);
    
    return `${minTime}-${maxTime} hours`;
  };

  if (isLoading) {
    return (
      <div className="bg-yeast-50 p-4 sm:p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Calculating...</h3>
        <ConversionSummary
          amount={amount}
          fromType={fromType}
          toType={toType}
          result={result}
          isLoading={true}
        />
      </div>
    );
  }

  return (
    <div className="bg-yeast-50 p-4 sm:p-6 rounded-lg">
      <h3 className="font-semibold mb-4 text-base sm:text-lg">Conversion Result</h3>
      <div className="space-y-4">
        <ConversionSummary
          amount={amount}
          fromType={fromType}
          toType={toType}
          result={result}
        />
        
        <AdjustmentDetails
          temperature={temperature}
          temperatureAdjustment={temperatureAdjustment}
          hydrationAdjustment={hydrationAdjustment}
          fermentationTime={getFermentationTime()}
        />
      </div>
    </div>
  );
};

export default ConversionResult;