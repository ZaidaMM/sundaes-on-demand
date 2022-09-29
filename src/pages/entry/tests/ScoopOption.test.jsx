import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test.only('that scoop is non-int or out of range', () => {
  <ScoopOption name='' imagePath='' updateItemCount={jest.fn()} />;

  // expect input to be invalide, negative number
  const vanillaInput = screen.getByRole('spinbutton', { name: 'Vanilla' });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  // with decimal input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  // with out of range input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  // with a valid input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
