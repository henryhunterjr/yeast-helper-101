import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewCalculator from '../../../components/bakers-calculator/NewCalculator';

describe('Starter Calculations', () => {
  it('should handle starter calculations correctly', async () => {
    render(<NewCalculator />);
    
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    const starterInput = screen.getByLabelText(/Starter Percentage/i);
    
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');
    await userEvent.clear(starterInput);
    await userEvent.type(starterInput, '20');

    const starterWeight = screen.getByText(/200g/i);
    expect(starterWeight).toBeInTheDocument();
  });

  it('should calculate correct flour contribution from starter', async () => {
    render(<NewCalculator />);
    
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    const starterInput = screen.getByLabelText(/Starter Percentage/i);
    
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');
    await userEvent.clear(starterInput);
    await userEvent.type(starterInput, '20');

    const flourFromStarter = screen.getByText(/100g from starter/i);
    expect(flourFromStarter).toBeInTheDocument();
  });
});