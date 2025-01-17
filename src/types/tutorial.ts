export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  example: {
    fromType: string;
    toType: string;
    amount: number;
    temperature: number;
  };
}

export interface TutorialProgress {
  currentStep: number;
  completed: number[];
}