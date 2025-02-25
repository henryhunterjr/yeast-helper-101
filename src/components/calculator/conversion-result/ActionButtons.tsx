
import React from 'react';
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  onReset: () => void;
  fromType: string;
  toType: string;
  amount: string;
  temperature: string;
  result: string;
}

const ActionButtons = ({ onReset }: ActionButtonsProps) => {
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
    </div>
  );
};

export default ActionButtons;
