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
    description: "Let's learn how to convert between different types of yeast and get perfect results every time. We'll cover everything from basic conversions to advanced hydration calculations.",
    position: {
      top: '50%',
      left: '50%'
    }
  },
  {
    id: 2,
    title: "Enter Your Yeast Amount",
    description: "Start by entering the amount of yeast you want to convert. For precise measurements, use grams (metric) or ounces (imperial).",
    position: {
      top: '30%',
      left: '25%'
    }
  },
  {
    id: 3,
    title: "Choose Your Yeast Types",
    description: "Select your starting yeast type and what you want to convert to. Remember, when converting to/from sourdough starter, additional hydration calculations will be provided.",
    position: {
      top: '40%',
      left: '25%'
    }
  },
  {
    id: 4,
    title: "Starter Hydration",
    description: "For sourdough conversions, specify your starter's hydration percentage. A 100% hydration starter contains equal parts flour and water by weight.",
    position: {
      top: '50%',
      left: '25%'
    }
  },
  {
    id: 5,
    title: "Temperature Settings",
    description: "Enter your room temperature to get precise fermentation time estimates and water temperature adjustments for optimal results.",
    position: {
      top: '60%',
      left: '25%'
    }
  },
  {
    id: 6,
    title: "Understanding Results",
    description: "View your conversion result along with detailed hydration adjustments. For example, 100g of 100% hydration starter means adjusting by 50g flour and 50g water.",
    position: {
      top: '40%',
      left: '75%'
    }
  },
  {
    id: 7,
    title: "Hydration Adjustments",
    description: "When converting to/from sourdough starter, you'll see exactly how much flour and water to add or subtract to maintain your recipe's hydration.",
    position: {
      top: '50%',
      left: '75%'
    }
  },
  {
    id: 8,
    title: "Temperature Guidance",
    description: "Check the recommended water temperature and proofing time adjustments based on your room temperature for consistent results.",
    position: {
      top: '60%',
      left: '75%'
    }
  },
  {
    id: 9,
    title: "Save Your Favorites",
    description: "Save your commonly used conversions for quick access. They'll appear in your favorites list below the calculator, complete with all adjustment details.",
    position: {
      top: '70%',
      left: '75%'
    }
  }
];