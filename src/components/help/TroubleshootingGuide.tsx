import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TroubleshootingGuide = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Troubleshooting Guide</h2>
      
      <Alert>
        <AlertDescription>
          Most common issues can be resolved by checking your measurements and environmental conditions.
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="dough-issues">
          <AccordionTrigger>Dough Not Rising Properly</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Check room temperature (ideal: 68-76°F)</li>
              <li>Verify yeast is fresh and properly stored</li>
              <li>Ensure water temperature is correct (95-105°F)</li>
              <li>Check salt measurements (too much can inhibit yeast)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="conversion-issues">
          <AccordionTrigger>Conversion Results Seem Incorrect</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Double-check input measurements</li>
              <li>Verify yeast types selected</li>
              <li>Consider environmental factors</li>
              <li>Check hydration levels (should be 65-80%)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="temperature">
          <AccordionTrigger>Temperature Adjustment Problems</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Use accurate room temperature readings</li>
              <li>Adjust water temperature accordingly</li>
              <li>Consider seasonal variations</li>
              <li>Account for kitchen environment</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TroubleshootingGuide;