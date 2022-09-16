import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  // check that checkbox starts out unchecked
  expect(checkbox).not.toBeChecked();

  // check that button starts out disabled
  expect(confirmButton).toBeDisabled();
});

test('checking checkbox enables button on first check and disbles button on second check', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  // check the checkbox is checked
  fireEvent.click(checkbox);

  // check that button is enabled
  expect(confirmButton).toBeEnabled();

  // unchecking the button disables the button
  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
