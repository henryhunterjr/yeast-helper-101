import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const QuickStartGuide = () => {
  const navigate = useNavigate();

  const handleTryExample = (amount: string, fromType: string, toType: string) => {
    // Navigate to calculator with pre-filled values
    navigate('/', { 
      state: { 
        prefill: {
          amount,
          fromType,
          toType
        }
      }
    });
  };

  return (
    <AccordionItem value="quick-start">
      <AccordionTrigger className="text-lg font-semibold">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-yeast-600" />
          Quick Start Guide
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Basic Usage</h3>
              <ol className="list-decimal list-inside space-y-4">
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded">
                  Enter the amount of yeast you have
                  <div className="ml-6 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTryExample("7", "active-dry", "instant")}
                      className="text-sm"
                    >
                      Try Example: 7g Active Dry → Instant
                    </Button>
                  </div>
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded">
                  Select your current yeast type
                  <div className="ml-6 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTryExample("10", "fresh", "active-dry")}
                      className="text-sm"
                    >
                      Try Example: 10g Fresh → Active Dry
                    </Button>
                  </div>
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded">
                  Choose the yeast type you want to convert to
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded">
                  Input the room temperature (optional)
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded">
                  View your conversion result and temperature adjustments
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuickStartGuide;