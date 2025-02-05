import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YeastCalculator from '../../components/YeastCalculator';
import NewCalculator from '../../components/bakers-calculator/NewCalculator';

describe('Calculator Validation Integration', () => {
  describe('Yeast Calculator Validation', () => {
    it('should show error for negative amounts', async () => {
      render(<YeastCalculator />);
      
      const amountInput = screen.getByPlaceholderText(/Enter amount/i);
      await userEvent.type(amountInput, '-1');

      const error = await screen.findByText(/cannot be negative/i);
      expect(error).toBeInTheDocument();
    });

    it('should show error for excessive amounts', async () => {
      render(<YeastCalculator />);
      
      const amountInput = screen.getByPlaceholderText(/Enter amount/i);
      await userEvent.type(amountInput, '1001');

      const error = await screen.findByText(/maximum amount/i);
      expect(error).toBeInTheDocument();
    });
  });

  describe('Bakers Calculator Validation', () => {
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

    it('should show warning for high salt percentage', async () => {
      render(<NewCalculator />);
      
      const flourInput = screen.getByLabelText(/Flour Weight/i);
      const saltInput = screen.getByLabelText(/Salt/i);
      
      await userEvent.clear(flourInput);
      await userEvent.type(flourInput, '1000');
      await userEvent.clear(saltInput);
      await userEvent.type(saltInput, '30');

      const warning = await screen.findByText(/salt percentage/i);
      expect(warning).toBeInTheDocument();
    });
  });
});