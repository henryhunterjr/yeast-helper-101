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
});