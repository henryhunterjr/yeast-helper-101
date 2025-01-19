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
    description: "Let's explore our tools for precise bread baking calculations. We'll help you convert between yeast types and calculate baker's percentages for perfect results every time.",
    position: {
      top: '50%',
      left: '50%'
    }
  },
  {
    id: 2,
    title: "Yeast Conversion Calculator",
    description: "Start with our yeast converter to switch between different types of yeast. Enter your amount and select your yeast types to get precise conversions.",
    position: {
      top: '30%',
      left: '25%'
    }
  },
  {
    id: 3,
    title: "Baker's Percentage Calculator",
    description: "Use our baker's percentage calculator to create perfectly balanced recipes. Enter your flour weight and adjust hydration, starter, and salt percentages.",
    position: {
      top: '40%',
      left: '25%'
    }
  },
  {
    id: 4,
    title: "Unit Switching",
    description: "Switch between grams and ounces at any time using the unit toggle. Your measurements will automatically update to the selected unit.",
    position: {
      top: '50%',
      left: '25%'
    }
  },
  {
    id: 5,
    title: "Real-time Validation",
    description: "As you input values, we'll provide immediate feedback to ensure your recipe stays within recommended ranges for best results.",
    position: {
      top: '60%',
      left: '25%'
    }
  },
  {
    id: 6,
    title: "Recipe Breakdown",
    description: "View a detailed breakdown of your recipe, including exact measurements for each ingredient and the total recipe weight.",
    position: {
      top: '40%',
      left: '75%'
    }
  }
];