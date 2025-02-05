import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../../components/YeastCalculator';

describe('Unit Conversions', () => {
  it('should handle gram to teaspoon conversion', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const unitToggle = screen.getByText(/tsp/i);
    
    await userEvent.type(amountInput, '3');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.click(unitToggle);

    const result = await screen.findByText(/1.00 tsp/i);
    expect(result).toBeInTheDocument();
  });

  it('should handle teaspoon to gram conversion', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const unitToggle = screen.getByText(/tsp/i);
    
    await userEvent.click(unitToggle);
    await userEvent.type(amountInput, '1');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.click(unitToggle);

    const result = await screen.findByText(/3.00g/i);
    expect(result).toBeInTheDocument();
  });
});