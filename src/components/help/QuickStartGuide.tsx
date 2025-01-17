import React, { useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { TutorialStep as TutorialStepType } from '@/types/tutorial';
import TutorialStep from './tutorial/TutorialStep';
import TutorialProgress from './tutorial/TutorialProgress';
import { tutorialSteps } from '@/utils/tutorialData';

const QuickStartGuide = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleTryExample = (step: TutorialStepType) => {
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
          <TutorialProgress 
            completedSteps={completedSteps}
            totalSteps={tutorialSteps.length}
            onReset={handleReset}
          />

          <div className="grid gap-4">
            {tutorialSteps.map((step) => (
              <TutorialStep
                key={step.id}
                step={step}
                isActive={currentStep === step.id}
                isCompleted={completedSteps.includes(step.id)}
                onTryExample={handleTryExample}
              />
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