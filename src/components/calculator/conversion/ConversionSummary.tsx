import React from 'react';
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { saveFavorite } from '@/utils/favoritesStorage';
import { yeastTypes } from '../../../utils/yeastCalculations';

interface ConversionSummaryProps {
  amount: string;
  fromType: string;
  toType: string;
  result: string;
  temperature?: string;
  isLoading?: boolean;
}

const ConversionSummary = ({ 
  amount, 
  fromType, 
  toType, 
  result,
  temperature = "72",
  isLoading = false 
}: ConversionSummaryProps) => {
  const { toast } = useToast();

  const handleSaveFavorite = () => {
    try {
      saveFavorite({
        fromType,
        toType,
        amount: Number(amount),
        temperature: Number(temperature),
        result: Number(result),
      });
      
      toast({
        title: "Saved to favorites",
        description: "Your conversion has been saved to favorites.",
      });
    } catch (error) {
      toast({
        title: "Error saving favorite",
        description: "There was an error saving your conversion.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 sm:p-4 rounded shadow-sm space-y-4">
      <div>
        <p className="text-base sm:text-lg md:text-xl font-mono break-words">
          {amount || '0'}g {yeastTypes[fromType]} =
        </p>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yeast-600 font-mono break-words">
          {result}g {yeastTypes[toType]}
        </p>
      </div>
      
      <Button
        onClick={handleSaveFavorite}
        variant="outline"
        className="w-full"
      >
        <BookmarkPlus className="mr-2 h-4 w-4" />
        Save to Favorites
      </Button>
    </div>
  );
};

export default ConversionSummary;