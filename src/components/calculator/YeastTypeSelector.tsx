
import React from 'react';
import { YeastType } from '@/utils/yeastTypes';
import { useToast } from "@/hooks/use-toast";

interface YeastTypeSelectorProps {
  fromType: YeastType;
  toType: YeastType;
  onFromTypeChange: (type: YeastType) => void;
  onToTypeChange: (type: YeastType) => void;
}

const YeastTypeSelector = ({
  fromType,
  toType,
  onFromTypeChange,
  onToTypeChange
}: YeastTypeSelectorProps) => {
  const { toast } = useToast();

  const handleFromTypeChange = (value: YeastType) => {
    if (value === toType) {
      toast({
        title: "Invalid Selection",
        description: "From and To types cannot be the same",
        variant: "destructive",
      });
      return;
    }
    onFromTypeChange(value);
  };

  const handleToTypeChange = (value: YeastType) => {
    if (value === fromType) {
      toast({
        title: "Invalid Selection",
        description: "From and To types cannot be the same",
        variant: "destructive",
      });
      return;
    }
    onToTypeChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-foreground">From Type</label>
        <select
          value={fromType}
          onChange={(e) => handleFromTypeChange(e.target.value as YeastType)}
          className="w-full p-2 border rounded bg-background text-foreground"
        >
          <option value="active-dry">Active Dry Yeast</option>
          <option value="instant">Instant Yeast</option>
          <option value="fresh">Fresh Yeast</option>
          <option value="sourdough">Sourdough Starter</option>
        </select>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-foreground">To Type</label>
        <select
          value={toType}
          onChange={(e) => handleToTypeChange(e.target.value as YeastType)}
          className="w-full p-2 border rounded bg-background text-foreground"
        >
          <option value="active-dry">Active Dry Yeast</option>
          <option value="instant">Instant Yeast</option>
          <option value="fresh">Fresh Yeast</option>
          <option value="sourdough">Sourdough Starter</option>
        </select>
      </div>
    </div>
  );
};

export default YeastTypeSelector;
