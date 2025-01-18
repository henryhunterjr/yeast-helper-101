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
    description: "Let's walk through how to use this yeast conversion calculator. We'll show you all the features to help you bake better bread.",
    position: {
      top: '50%',
      left: '50%'
    }
  },
  {
    id: 2,
    title: "Enter Your Yeast Amount",
    description: "Start by entering the amount of yeast you want to convert. Use grams for precise measurements.",
    position: {
      top: '30%',
      left: '25%'
    }
  },
  {
    id: 3,
    title: "Room Temperature",
    description: "Set your room temperature - this helps calculate fermentation time adjustments.",
    position: {
      top: '40%',
      left: '25%'
    }
  },
  {
    id: 4,
    title: "Starter Hydration",
    description: "For sourdough conversions, specify your starter's hydration percentage.",
    position: {
      top: '50%',
      left: '25%'
    }
  },
  {
    id: 5,
    title: "Select Yeast Types",
    description: "Choose which type of yeast you're converting from and to.",
    position: {
      top: '60%',
      left: '25%'
    }
  },
  {
    id: 6,
    title: "View Results",
    description: "See your conversion result and recommended adjustments based on temperature and hydration.",
    position: {
      top: '40%',
      left: '75%'
    }
  },
  {
    id: 7,
    title: "Save Favorites",
    description: "Save your commonly used conversions for quick access later.",
    position: {
      top: '50%',
      left: '75%'
    }
  }
];