import React from 'react';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { RefreshCw } from 'lucide-react';

interface TutorialProgressProps {
  completedSteps: number[];
  totalSteps: number;
  onReset: () => void;
}

const TutorialProgress = ({ completedSteps, totalSteps, onReset }: TutorialProgressProps) => {
  const progress = (completedSteps.length / totalSteps) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">Your Progress</h3>
          <p className="text-sm text-gray-500">
            {completedSteps.length} of {totalSteps} steps completed
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Start Over
        </Button>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default TutorialProgress;