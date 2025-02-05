import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../../components/YeastCalculator';

describe('Basic Yeast Conversions', () => {
  it('should convert between active dry and instant yeast', async () => {
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

  it('should convert between active dry and fresh yeast', async () => {
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

  it('should handle small amount conversions differently', async () => {
    render(<YeastCalculator />);
    
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    
    await userEvent.type(amountInput, '5');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'instant');

    const simplifiedNotice = await screen.findByText(/can be used interchangeably/i);
    expect(simplifiedNotice).toBeInTheDocument();
  });
});