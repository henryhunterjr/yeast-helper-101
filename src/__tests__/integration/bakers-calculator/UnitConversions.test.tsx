import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewCalculator from '../../../components/bakers-calculator/NewCalculator';

describe('Unit Conversions', () => {
  it('should handle unit conversion between grams and ounces', async () => {
    render(<NewCalculator />);
    
    const unitToggle = screen.getByText(/Ounces/i);
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    
    await userEvent.click(unitToggle);
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '35.27');

    const totalWeight = screen.getByText(/1000g/i);
    expect(totalWeight).toBeInTheDocument();
  });

  it('should persist calculations when switching units', async () => {
    render(<NewCalculator />);
    
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');

    const unitToggle = screen.getByText(/Ounces/i);
    await userEvent.click(unitToggle);

    const ouncesValue = screen.getByText(/35.27/i);
    expect(ouncesValue).toBeInTheDocument();
  });
});