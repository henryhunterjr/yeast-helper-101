export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  position?: {
    top: string;
    left: string;
  };
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to YeastWise!",
    description: "Let's learn how to convert between different types of yeast and get perfect results every time. We'll cover all features including hydration and temperature adjustments.",
    position: {
      top: '50%',
      left: '50%'
    }
  },
  {
    id: 2,
    title: "Enter Your Yeast Amount",
    description: "Start by entering the amount of yeast you want to convert. Use grams for the most accurate results.",
    position: {
      top: '30%',
      left: '25%'
    }
  },
  {
    id: 3,
    title: "Choose Your Yeast Types",
    description: "Select which type of yeast you're converting from and to. We support instant, active dry, fresh yeast, and sourdough starter.",
    position: {
      top: '40%',
      left: '25%'
    }
  },
  {
    id: 4,
    title: "Temperature Matters",
    description: "Enter your room temperature to get accurate fermentation time estimates and water temperature adjustments.",
    position: {
      top: '50%',
      left: '25%'
    }
  },
  {
    id: 5,
    title: "Starter Hydration",
    description: "When working with sourdough starter, specify its hydration percentage. This helps calculate the correct flour and water adjustments.",
    position: {
      top: '60%',
      left: '25%'
    }
  },
  {
    id: 6,
    title: "Understanding Results",
    description: "Your conversion results include the exact amount needed, plus any required flour and water adjustments for maintaining proper hydration.",
    position: {
      top: '40%',
      left: '75%'
    }
  },
  {
    id: 7,
    title: "Temperature Adjustments",
    description: "Check the recommended water temperature and estimated proofing time based on your room temperature.",
    position: {
      top: '50%',
      left: '75%'
    }
  },
  {
    id: 8,
    title: "Save Your Favorites",
    description: "Save frequently used conversions for quick access. They'll appear in your favorites list below the calculator.",
    position: {
      top: '60%',
      left: '75%'
    }
  }
];