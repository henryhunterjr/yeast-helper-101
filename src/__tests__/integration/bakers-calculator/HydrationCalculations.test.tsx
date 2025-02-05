import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewCalculator from '../../../components/bakers-calculator/NewCalculator';

describe('Hydration Calculations', () => {
  it('should calculate correct hydration percentage', async () => {
    render(<NewCalculator />);
    
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    const waterInput = screen.getByLabelText(/Water/i);
    
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');
    await userEvent.clear(waterInput);
    await userEvent.type(waterInput, '650');

    const hydrationDisplay = screen.getByText(/65%/i);
    expect(hydrationDisplay).toBeInTheDocument();
  });

  it('should show warning for high hydration', async () => {
    render(<NewCalculator />);
    
    const flourInput = screen.getByLabelText(/Flour Weight/i);
    const waterInput = screen.getByLabelText(/Water/i);
    
    await userEvent.clear(flourInput);
    await userEvent.type(flourInput, '1000');
    await userEvent.clear(waterInput);
    await userEvent.type(waterInput, '850');

    const warning = await screen.findByText(/high hydration/i);
    expect(warning).toBeInTheDocument();
  });
});