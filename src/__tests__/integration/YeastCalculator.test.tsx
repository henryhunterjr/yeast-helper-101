import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../components/YeastCalculator';

describe('YeastCalculator Integration', () => {
  it('should perform a complete conversion calculation', async () => {
    render(<YeastCalculator />);
    
    // Input amount
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    await userEvent.type(amountInput, '10');

    // Select yeast types
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'instant');

    // Check result display
    const result = await screen.findByText(/7.50g/i);
    expect(result).toBeInTheDocument();
  });

  it('should show error message for invalid input', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    await userEvent.type(amountInput, '-1');

    // Error message should be displayed
    const errorMessage = await screen.findByText(/Minimum amount/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should handle temperature adjustments', async () => {
    render(<YeastCalculator />);
    
    const temperatureInput = screen.getByPlaceholderText(/Temperature/i);
    await userEvent.clear(temperatureInput);
    await userEvent.type(temperatureInput, '62');

    const adjustment = await screen.findByText(/Increase proofing time/i);
    expect(adjustment).toBeInTheDocument();
  });

  it('should handle hydration adjustments for sourdough', async () => {
    render(<YeastCalculator />);
    
    // Set up sourdough conversion
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'sourdough');

    // Input amount and hydration
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const hydrationInput = screen.getByPlaceholderText(/Enter hydration/i);
    
    await userEvent.type(amountInput, '10');
    await userEvent.clear(hydrationInput);
    await userEvent.type(hydrationInput, '80');

    // Check for hydration adjustment details
    const adjustmentDetails = await screen.findByText(/Flour Adjustment/i);
    expect(adjustmentDetails).toBeInTheDocument();
  });

  it('should persist input values when switching yeast types', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    await userEvent.type(amountInput, '10');

    const fromSelect = screen.getByLabelText(/From/i);
    await userEvent.selectOptions(fromSelect, 'fresh');

    expect(amountInput).toHaveValue(10);
  });

  it('should handle all yeast type combinations', async () => {
    render(<YeastCalculator />);
    
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    
    const yeastTypes = ['active-dry', 'instant', 'fresh', 'sourdough'];
    
    for (const fromType of yeastTypes) {
      for (const toType of yeastTypes) {
        if (fromType === toType) continue;
        
        await userEvent.selectOptions(fromSelect, fromType);
        await userEvent.selectOptions(toSelect, toType);
        await userEvent.clear(amountInput);
        await userEvent.type(amountInput, '10');

        const result = await screen.findByText(/g/i);
        expect(result).toBeInTheDocument();
      }
    }
  });
});