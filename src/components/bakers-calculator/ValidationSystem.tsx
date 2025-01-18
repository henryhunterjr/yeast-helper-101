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
        <Alert key={index} variant="warning">
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default ValidationSystem;