import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

const TroubleshootingGuide = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yeast-800">Understanding Warnings & Troubleshooting</h2>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-yeast-700">Common Warnings Explained</h3>
          
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <span className="font-medium">High Hydration Warning</span>
              <p className="text-sm mt-1">
                Appears when water content exceeds 75%. While not necessarily an error, high hydration doughs require special handling techniques.
              </p>
            </AlertDescription>
          </Alert>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <span className="font-medium">Salt Range Warning</span>
              <p className="text-sm mt-1">
                Shown when salt percentage is outside 1.8-2.2%. Adjust based on your recipe's needs and taste preferences.
              </p>
            </AlertDescription>
          </Alert>

          <div className="mt-6">
            <h4 className="font-medium text-yeast-700 mb-2">Tips for Success</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Start with lower hydration (65%) if you're new to bread baking</li>
              <li>Double-check your measurements when warnings appear</li>
              <li>Consider ambient temperature and humidity when adjusting hydration</li>
              <li>Use baker's percentages to easily scale recipes up or down</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TroubleshootingGuide;