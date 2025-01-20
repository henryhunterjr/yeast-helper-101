export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  position?: {
    top: string;
    left: string;
  };
  example?: {
    amount: number;
    temperature: number;
  };
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to YeastWise!",
    description: "Let's explore our tools for precise bread baking calculations. We'll help you convert between yeast types and calculate baker's percentages for perfect results every time.",
    position: {
      top: '50%',
      left: '50%'
    },
    example: {
      amount: 7,
      temperature: 75
    }
  },
  {
    id: 2,
    title: "Yeast Conversion Calculator",
    description: "Start with our yeast converter to switch between different types of yeast. Enter your amount and select your yeast types to get precise conversions.",
    position: {
      top: '30%',
      left: '25%'
    },
    example: {
      amount: 2.25,
      temperature: 75
    }
  },
  {
    id: 3,
    title: "Temperature Adjustments",
    description: "The temperature of your dough affects fermentation. Adjust the temperature to see how it impacts your proofing time.",
    position: {
      top: '40%',
      left: '25%'
    },
    example: {
      amount: 2.25,
      temperature: 82
    }
  },
  {
    id: 4,
    title: "Baker's Percentage Calculator",
    description: "Use our baker's percentage calculator to create perfectly balanced recipes. Enter your flour weight and adjust hydration, starter, and salt percentages.",
    position: {
      top: '50%',
      left: '25%'
    },
    example: {
      amount: 1000,
      temperature: 75
    }
  },
  {
    id: 5,
    title: "Real-time Updates",
    description: "As you adjust values, all calculations update instantly. This helps you see how changes affect your recipe in real-time.",
    position: {
      top: '60%',
      left: '25%'
    },
    example: {
      amount: 7,
      temperature: 75
    }
  },
  {
    id: 6,
    title: "Ready to Start!",
    description: "You're all set to start using YeastWise! Remember, you can always access this tutorial again using the tutorial button in the bottom right corner.",
    position: {
      top: '40%',
      left: '75%'
    },
    example: {
      amount: 7,
      temperature: 75
    }
  }
];