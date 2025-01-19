import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveFavorite } from '@/utils/favoritesStorage';

interface ActionButtonsProps {
  onReset: () => void;
  fromType: string;
  toType: string;
  amount: string;
  temperature: string;
  result: string;
}

const ActionButtons = ({ 
  onReset, 
  fromType, 
  toType, 
  amount, 
  temperature, 
  result 
}: ActionButtonsProps) => {
  const { toast } = useToast();

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
    <div className="flex gap-2">
      <Button 
        onClick={onReset}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
      <Button 
        onClick={handleSave}
        variant="secondary"
        size="sm"
        className="gap-2 hover:bg-yeast-200"
      >
        <Save className="h-4 w-4" />
        Save
      </Button>
    </div>
  );
};

export default ActionButtons;