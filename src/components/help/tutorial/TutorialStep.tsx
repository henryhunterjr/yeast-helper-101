import React from 'react';
import { Check, Play, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { TutorialStep as TutorialStepType } from '@/types/tutorial';

interface TutorialStepProps {
  step: TutorialStepType;
  isActive: boolean;
  isCompleted: boolean;
  onTryExample: (step: TutorialStepType) => void;
}

const TutorialStep = ({ step, isActive, isCompleted, onTryExample }: TutorialStepProps) => {
  return (
    <Card className={`transition-all duration-200 ${
      isActive ? 'ring-2 ring-yeast-500' : ''
    } ${isCompleted ? 'bg-yeast-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Play className="h-4 w-4 text-yeast-600" />
              )}
              <h4 className="font-medium text-yeast-700">{step.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTryExample(step)}
            className="gap-2 shrink-0"
          >
            Try This <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {isActive && (
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
  );
};

export default TutorialStep;