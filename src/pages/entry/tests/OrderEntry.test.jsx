import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  // Use the mock function even if in this case not needed, just to deal with the request when using TypeScript
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('Order button disabled if no scoops selected', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // check that the order button starts out disabled
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // check that the button is enabled when selecting scoops
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again if removing scoop
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});
