import React from 'react';
import { BookOpen, ArrowRight, Play, Check, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const examples = [
  {
    title: "Convert Active Dry to Instant",
    description: "Common conversion for modern recipes",
    amount: "7",
    fromType: "active-dry",
    toType: "instant",
    expectedResult: "6.23g"
  },
  {
    title: "Fresh Yeast to Active Dry",
    description: "Traditional to modern conversion",
    amount: "10",
    fromType: "fresh",
    toType: "active-dry",
    expectedResult: "3.33g"
  }
];

const QuickStartGuide = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTryExample = (amount: string, fromType: string, toType: string, expectedResult: string) => {
    toast({
      title: "Example Loaded",
      description: `Expected result: ${expectedResult}`,
      duration: 3000,
    });
    
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
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Play className="h-4 w-4 text-yeast-600" />
                Interactive Examples
              </h3>
              <div className="space-y-6">
                {examples.map((example, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-yeast-200 hover:border-yeast-300 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-yeast-700">{example.title}</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTryExample(
                          example.amount,
                          example.fromType,
                          example.toType,
                          example.expectedResult
                        )}
                        className="text-sm gap-2"
                      >
                        Try This <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">{example.description}</p>
                    <div className="mt-2 text-sm text-yeast-600">
                      Expected result: {example.expectedResult}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Basic Steps</h3>
              <ol className="list-decimal list-inside space-y-4">
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Enter the amount of yeast you have</span>
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Select your current yeast type</span>
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Choose the yeast type you want to convert to</span>
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Input the room temperature (optional)</span>
                </li>
                <li className="transition-all duration-200 hover:bg-yeast-50 p-2 rounded flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>View your conversion result and temperature adjustments</span>
                </li>
              </ol>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
                className="mt-4 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Start Fresh
              </Button>
            </CardContent>
          </Card>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuickStartGuide;