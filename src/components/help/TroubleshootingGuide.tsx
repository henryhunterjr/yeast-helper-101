import React, { useState } from 'react';
import { HelpCircle, AlertTriangle, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const TroubleshootingGuide = () => {
  const [openIssue, setOpenIssue] = useState<string | null>(null);

  const issues = [
    {
      id: 'slow-rise',
      problem: 'Slow Rise',
      symptoms: 'Dough takes longer than usual to rise',
      solution: 'Check water temperature and yeast freshness',
      severity: 'warning'
    },
    {
      id: 'no-rise',
      problem: 'No Rise',
      symptoms: 'Dough shows no signs of rising after expected time',
      solution: 'Verify yeast is active and water temperature is correct',
      severity: 'error'
    },
    {
      id: 'over-proofing',
      problem: 'Over-proofing',
      symptoms: 'Dough has collapsed or has a strong alcohol smell',
      solution: 'Reduce proofing time or temperature',
      severity: 'warning'
    }
  ];

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
          {issues.map((issue) => (
            <Card key={issue.id} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-4">
                <Collapsible open={openIssue === issue.id} onOpenChange={() => setOpenIssue(openIssue === issue.id ? null : issue.id)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between p-2 hover:bg-yeast-50"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-5 w-5 ${issue.severity === 'error' ? 'text-red-500' : 'text-yellow-500'}`} />
                        <span className="font-medium">{issue.problem}</span>
                      </div>
                      {openIssue === issue.id && <Check className="h-4 w-4 text-green-500" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-2 space-y-2">
                    <p className="text-gray-600"><span className="font-medium">Symptoms:</span> {issue.symptoms}</p>
                    <p className="text-gray-600"><span className="font-medium">Solution:</span> {issue.solution}</p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TroubleshootingGuide;