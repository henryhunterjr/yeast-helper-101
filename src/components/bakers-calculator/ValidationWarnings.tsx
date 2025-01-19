import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ValidationWarningsProps {
  warnings: string[];
}

const ValidationWarnings = ({ warnings }: ValidationWarningsProps) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="space-y-2">
      {warnings.map((warning, index) => (
        <Alert key={index} variant="default" className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            {warning}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default ValidationWarnings;