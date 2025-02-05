import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../../components/YeastCalculator';

describe('Temperature Adjustments', () => {
  it('should calculate correct water temperature for commercial yeast', async () => {
    render(<YeastCalculator />);
    
    const temperatureInput = screen.getByPlaceholderText(/Temperature/i);
    const fromSelect = screen.getByLabelText(/From/i);
    
    await userEvent.clear(temperatureInput);
    await userEvent.type(temperatureInput, '72');
    await userEvent.selectOptions(fromSelect, 'active-dry');

    const waterTemp = await screen.findByText(/75°F/i);
    expect(waterTemp).toBeInTheDocument();
  });

  it('should calculate correct water temperature for sourdough', async () => {
    render(<YeastCalculator />);
    
    const temperatureInput = screen.getByPlaceholderText(/Temperature/i);
    const fromSelect = screen.getByLabelText(/From/i);
    const toSelect = screen.getByLabelText(/To/i);
    
    await userEvent.clear(temperatureInput);
    await userEvent.type(temperatureInput, '72');
    await userEvent.selectOptions(fromSelect, 'active-dry');
    await userEvent.selectOptions(toSelect, 'sourdough');

    const waterTemp = await screen.findByText(/78°F/i);
    expect(waterTemp).toBeInTheDocument();
  });

  it('should handle extreme temperatures appropriately', async () => {
    render(<YeastCalculator />);
    
    const temperatureInput = screen.getByPlaceholderText(/Temperature/i);
    const fromSelect = screen.getByLabelText(/From/i);
    
    await userEvent.clear(temperatureInput);
    await userEvent.type(temperatureInput, '85');
    await userEvent.selectOptions(fromSelect, 'active-dry');

    const adjustment = await screen.findByText(/Decrease starter amount/i);
    expect(adjustment).toBeInTheDocument();
  });
});