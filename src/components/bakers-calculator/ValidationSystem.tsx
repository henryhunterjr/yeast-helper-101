import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ValidationSystemProps {
  warnings: string[];
}

const ValidationSystem = ({ warnings }: ValidationSystemProps) => {
  if (!warnings.length) return null;

  return (
    <div className="space-y-2">
      {warnings.map((warning, index) => (
        <Alert key={index} variant="default" className="bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-700">{warning}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default ValidationSystem;