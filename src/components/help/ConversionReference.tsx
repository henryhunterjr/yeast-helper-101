import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ConversionReference = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Common Ranges & References</h2>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">Yeast Conversion Guidelines</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground">Small Quantity Conversions (≤14g)</h4>
              <p className="text-muted-foreground mb-2">For home baking with small quantities:</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Active dry and instant yeast can be used 1:1</li>
                <li>Simplified for convenience in home baking</li>
                <li>Applies to measurements up to 14 grams</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground">Large Quantity Conversions (>14g)</h4>
              <p className="text-muted-foreground mb-2">For professional baking or larger batches:</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Uses precise conversion ratios</li>
                <li>Active Dry to Instant: 4:3 ratio</li>
                <li>Important for consistency in large batches</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground">Hydration (Water)</h4>
              <p className="text-gray-600 mb-2">60-75% for standard bread dough</p>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>60-65%: Firmer dough, good for basic breads</li>
                <li>65-70%: Medium hydration, versatile for most breads</li>
                <li>70-75%: Higher hydration, better for artisan breads</li>
                <li>75%+: Very wet dough, for specific styles like ciabatta</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground">Salt</h4>
              <p className="text-gray-600 mb-2">1.8-2.2% is the standard range</p>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>Below 1.8%: May result in bland flavor</li>
                <li>Above 2.2%: Can inhibit yeast growth</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground">Yeast</h4>
              <p className="text-gray-600 mb-2">0.5-2% depending on type and fermentation time</p>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>0.5-1%: Longer fermentation (8-12 hours)</li>
                <li>1-2%: Standard fermentation (3-4 hours)</li>
                <li>2%+: Quick breads (1-2 hours)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionReference;
