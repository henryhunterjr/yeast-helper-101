import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../../components/YeastCalculator';

describe('Hydration Adjustments', () => {
  it('should calculate correct hydration adjustments for sourdough', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    const hydrationInput = screen.getByPlaceholderText(/Enter hydration/i);
    
    await userEvent.type(amountInput, '10');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'sourdough');
    await userEvent.clear(hydrationInput);
    await userEvent.type(hydrationInput, '100');

    const flourAdjustment = await screen.findByText(/Flour: \+150/i);
    const waterAdjustment = await screen.findByText(/Water: \+150/i);
    expect(flourAdjustment).toBeInTheDocument();
    expect(waterAdjustment).toBeInTheDocument();
  });

  it('should adjust calculations based on starter strength', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    const strengthSelect = screen.getByLabelText(/Starter Strength/i);
    
    await userEvent.type(amountInput, '10');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'sourdough');
    await userEvent.selectOptions(strengthSelect, 'strong');

    const result = await screen.findByText(/250.00g/i);
    expect(result).toBeInTheDocument();
  });
});