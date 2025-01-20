import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTutorial } from './useTutorial';
import { tutorialSteps } from '@/utils/tutorialData';
import { cn } from '@/lib/utils';

const TutorialOverlay = () => {
  const { isActive, currentStep, nextStep, previousStep, endTutorial, setHasSeenTutorial } = useTutorial();

  useEffect(() => {
    if (currentStep >= tutorialSteps.length) {
      endTutorial();
      setHasSeenTutorial();
    }
  }, [currentStep, endTutorial, setHasSeenTutorial]);

  if (!isActive) return null;

  const step = tutorialSteps[currentStep];
  if (!step) return null;

  const isLastStep = currentStep === tutorialSteps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
      <div 
        className={cn(
          "absolute p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl",
          "max-w-[90%] w-[400px] mx-auto left-1/2 -translate-x-1/2",
          "my-4 sm:my-8 transition-all duration-300 ease-in-out"
        )}
        style={{
          top: typeof window !== 'undefined' && window.innerWidth < 640 ? '50%' : (step.position?.top || '50%'),
          transform: typeof window !== 'undefined' && window.innerWidth < 640 
            ? 'translate(-50%, -50%)' 
            : `translate(-50%, ${step.position?.top ? '0' : '-50%'})`
        }}
      >
        <button
          onClick={endTutorial}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close tutorial"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>

          {step.example && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">Example values:</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                  <span className="font-mono">{step.example.amount}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Temperature:</span>
                  <span className="font-mono">{step.example.temperature}°F</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={isFirstStep}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button 
              onClick={nextStep} 
              className="gap-2"
              variant={isLastStep ? "default" : "secondary"}
            >
              {isLastStep ? 'Finish' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentStep === index 
                      ? "bg-primary w-4" 
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;