import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTutorial } from './useTutorial';
import { tutorialSteps } from '@/utils/tutorialData';

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

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
      <div 
        className="absolute p-4 sm:p-6 bg-white rounded-lg shadow-xl max-w-[90%] w-[400px] mx-auto left-1/2 -translate-x-1/2 my-4 sm:my-8"
        style={{
          top: typeof window !== 'undefined' && window.innerWidth < 640 ? '50%' : (step.position?.top || '50%'),
          transform: typeof window !== 'undefined' && window.innerWidth < 640 
            ? 'translate(-50%, -50%)' 
            : `translate(-50%, ${step.position?.top ? '0' : '-50%'})`
        }}
      >
        <button
          onClick={endTutorial}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
        
        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
        <p className="text-gray-600 mb-4">{step.description}</p>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={nextStep} className="gap-2">
            {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;