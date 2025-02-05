import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../../components/YeastCalculator';

describe('Sourdough Conversions', () => {
  it('should handle active dry to sourdough conversion', async () => {
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

    const result = await screen.findByText(/300.00g/i);
    expect(result).toBeInTheDocument();
  });

  it('should adjust sourdough conversion based on hydration', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    const hydrationInput = screen.getByPlaceholderText(/Enter hydration/i);
    
    await userEvent.type(amountInput, '10');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'sourdough');
    await userEvent.clear(hydrationInput);
    await userEvent.type(hydrationInput, '80');

    const result = await screen.findByText(/300.00g/i);
    const flourAdjustment = await screen.findByText(/Flour Adjustment/i);
    expect(result).toBeInTheDocument();
    expect(flourAdjustment).toBeInTheDocument();
  });
});