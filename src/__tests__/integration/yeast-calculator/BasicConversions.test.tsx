import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../../components/YeastCalculator';

describe('Basic Yeast Conversions', () => {
  it('should perform active dry to instant conversion', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    
    await userEvent.type(amountInput, '10');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'instant');

    const result = await screen.findByText(/10.00g/i);
    expect(result).toBeInTheDocument();
  });

  it('should perform active dry to fresh conversion', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    
    await userEvent.type(amountInput, '10');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'fresh');

    const result = await screen.findByText(/33.30g/i);
    expect(result).toBeInTheDocument();
  });

  it('should perform instant to fresh conversion', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    
    await userEvent.type(amountInput, '10');
    await userEvent.selectOptions(fromSelect, 'instant');
    await userEvent.selectOptions(toSelect, 'fresh');

    const result = await screen.findByText(/33.30g/i);
    expect(result).toBeInTheDocument();
  });
});