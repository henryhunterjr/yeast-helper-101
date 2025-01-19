import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FlourInputProps {
  flour: number | null;
  setFlour: (value: number | null) => void;
  unit: 'g' | 'oz';
  error?: string;
}

const FlourInput = ({ flour, setFlour, unit, error }: FlourInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="flour">Flour Weight ({unit})</Label>
      <Input
        id="flour"
        type="number"
        value={flour || ''}
        onChange={(e) => setFlour(e.target.value === '' ? null : Number(e.target.value))}
        min="0"
        step="1"
        className={`w-full ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FlourInput;