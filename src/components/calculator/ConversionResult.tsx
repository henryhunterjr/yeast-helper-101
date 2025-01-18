import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProofingTimeDisplay from './conversion/ProofingTimeDisplay';
import WaterTempDisplay from './conversion/WaterTempDisplay';
import { yeastTypes } from '@/utils/yeastCalculations';
import { saveFavorite } from '@/utils/favoritesStorage';

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
  isLoading: boolean;
}

const ConversionResult = ({
  amount,
  fromType,
  toType,
  temperature,
  hydration,
  result,
  hydrationAdjustment,
  isLoading,
}: ConversionResultProps) => {
  const { toast } = useToast();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!amount || parseFloat(amount) === 0) {
    return null;
  }

  const handleSave = () => {
    try {
      saveFavorite({
        fromType,
        toType,
        amount: parseFloat(amount),
        temperature: parseFloat(temperature),
        result: parseFloat(result),
      });
      toast({
        title: "Saved!",
        description: "Conversion has been added to your favorites.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save conversion.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Conversion Result */}
      <Card className="p-6 bg-gradient-to-r from-yeast-50 to-yeast-100 border-2 border-yeast-200 shadow-lg transition-all hover:shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-yeast-800">Conversion Result</h3>
          <Button 
            onClick={handleSave}
            variant="secondary"
            className="gap-2 hover:bg-yeast-200"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-mono break-words text-yeast-700">
            {amount}g {yeastTypes[fromType]} =
          </p>
          <p className="text-3xl font-bold text-yeast-800 font-mono break-words animate-in fade-in-50 duration-300">
            {result}g {yeastTypes[toType]}
          </p>
        </div>
      </Card>

      {/* Proofing and Water Temperature Information */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ProofingTimeDisplay 
          temperature={temperature} 
          hydration={hydration}
        />
        
        <WaterTempDisplay 
          roomTemp={temperature}
        />
      </div>

      {/* Hydration Adjustments */}
      {hydrationAdjustment?.showAdjustments && (
        <Card className="p-6 bg-gradient-to-r from-yeast-50 to-white border border-yeast-200">
          <h3 className="font-medium mb-3 text-yeast-800">Hydration Adjustments</h3>
          <div className="space-y-2 text-yeast-700">
            <p>Flour Adjustment: {hydrationAdjustment.flourAdjustment.toFixed(1)}g</p>
            <p>Water Adjustment: {hydrationAdjustment.waterAdjustment.toFixed(1)}g</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConversionResult;