import React, { useState } from 'react';
import { BookOpen, ArrowRight, Play, Check, RefreshCw, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { TutorialStep } from '@/types/tutorial';

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Basic Conversion",
    description: "Convert Active Dry to Instant Yeast - the most common conversion",
    example: {
      fromType: "active-dry",
      toType: "instant",
      amount: 7,
      temperature: 72
    }
  },
  {
    id: 2,
    title: "Temperature Adjustment",
    description: "See how temperature affects yeast activity",
    example: {
      fromType: "active-dry",
      toType: "instant",
      amount: 10,
      temperature: 85
    }
  },
  {
    id: 3,
    title: "Recipe Scaling",
    description: "Scale your recipe up or down",
    example: {
      fromType: "fresh",
      toType: "active-dry",
      amount: 15,
      temperature: 72
    }
  },
  {
    id: 4,
    title: "Sourdough Conversion",
    description: "Convert between commercial yeast and sourdough starter",
    example: {
      fromType: "active-dry",
      toType: "sourdough",
      amount: 5,
      temperature: 72
    }
  }
];

const QuickStartGuide = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const progress = (completedSteps.length / tutorialSteps.length) * 100;

  const handleTryExample = (step: TutorialStep) => {
    toast({
      title: `Loading ${step.title}`,
      description: "Example values have been pre-filled in the calculator",
    });
    
    navigate('/', { 
      state: { 
        prefill: {
          amount: step.example.amount.toString(),
          fromType: step.example.fromType,
          toType: step.example.toType,
          temperature: step.example.temperature.toString()
        }
      }
    });

    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    toast({
      title: "Tutorial Reset",
      description: "Starting fresh from the beginning",
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Your Progress</h3>
              <p className="text-sm text-gray-500">
                {completedSteps.length} of {tutorialSteps.length} steps completed
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Start Over
            </Button>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="grid gap-4">
            {tutorialSteps.map((step) => (
              <Card
                key={step.id}
                className={`transition-all duration-200 ${
                  currentStep === step.id ? 'ring-2 ring-yeast-500' : ''
                } ${completedSteps.includes(step.id) ? 'bg-yeast-50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {completedSteps.includes(step.id) ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4 text-yeast-600" />
                        )}
                        <h4 className="font-medium text-yeast-700">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTryExample(step)}
                      className="gap-2 shrink-0"
                    >
                      Try This <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {currentStep === step.id && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-yeast-200">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>Amount:</span>
                          <span className="font-mono">{step.example.amount}g</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Temperature:</span>
                          <span className="font-mono">{step.example.temperature}°F</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {currentStep < tutorialSteps.length && (
            <Button 
              onClick={handleNextStep}
              className="w-full gap-2"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuickStartGuide;