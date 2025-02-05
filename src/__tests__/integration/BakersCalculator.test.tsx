import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewCalculator from '../../components/bakers-calculator/NewCalculator';

describe('Bakers Calculator Integration', () => {
  it('should calculate correct hydration percentage', async () => {
    render(<NewCalculator />);
    
    // Input flour weight
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');

    // Input water weight
    const waterInput = screen.getByLabelText(/Water/i);
    await userEvent.clear(waterInput);
    await userEvent.type(waterInput, '650');

    // Check hydration calculation
    const hydrationDisplay = screen.getByText(/65%/i);
    expect(hydrationDisplay).toBeInTheDocument();
  });

  it('should handle unit conversion between grams and ounces', async () => {
    render(<NewCalculator />);
    
    // Switch to ounces
    const unitToggle = screen.getByText(/Ounces/i);
    await userEvent.click(unitToggle);

    // Input flour weight in ounces
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '35.27'); // ~1000g

    // Check conversion accuracy
    const totalWeight = screen.getByText(/1000g/i);
    expect(totalWeight).toBeInTheDocument();
  });

  it('should calculate correct salt percentage', async () => {
    render(<NewCalculator />);
    
    // Input flour weight
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');

    // Input salt weight
    const saltInput = screen.getByLabelText(/Salt/i);
    await userEvent.clear(saltInput);
    await userEvent.type(saltInput, '20');

    // Check salt percentage calculation (should be 2%)
    const saltPercentage = screen.getByText(/2%/i);
    expect(saltPercentage).toBeInTheDocument();
  });

  it('should handle starter calculations correctly', async () => {
    render(<NewCalculator />);
    
    // Input flour weight
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');

    // Input starter percentage
    const starterInput = screen.getByLabelText(/Starter Percentage/i);
    await userEvent.clear(starterInput);
    await userEvent.type(starterInput, '20');

    // Check starter calculations
    const starterWeight = screen.getByText(/200g/i); // 20% of 1000g
    expect(starterWeight).toBeInTheDocument();
  });

  it('should show validation warnings for extreme values', async () => {
    render(<NewCalculator />);
    
    // Input extreme hydration
    const hydrationInput = screen.getByLabelText(/Hydration/i);
    await userEvent.clear(hydrationInput);
    await userEvent.type(hydrationInput, '120');

    // Check for warning message
    const warning = screen.getByText(/High hydration/i);
    expect(warning).toBeInTheDocument();
  });

  it('should persist calculations when switching units', async () => {
    render(<NewCalculator />);
    
    // Input values in grams
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');

    // Switch to ounces
    const unitToggle = screen.getByText(/Ounces/i);
    await userEvent.click(unitToggle);

    // Values should be converted but maintain same ratios
    const ouncesValue = screen.getByText(/35.27/i);
    expect(ouncesValue).toBeInTheDocument();
  });
});