import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const TroubleshootingGuide = () => {
  return (
    <AccordionItem value="troubleshooting">
      <AccordionTrigger className="text-lg font-semibold">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-yeast-600" />
          Troubleshooting
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Common Issues</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Slow Rise:</span> Check water temperature and yeast freshness</li>
                <li><span className="font-medium">No Rise:</span> Verify yeast is active and water temperature is correct</li>
                <li><span className="font-medium">Over-proofing:</span> Reduce proofing time or temperature</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TroubleshootingGuide;