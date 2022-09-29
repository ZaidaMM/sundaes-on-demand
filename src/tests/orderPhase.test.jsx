import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  //render App, no need to wrap in provider, already wrapped
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });

  userEvent.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: £4.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: £1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // another way to do this:
  // const optionItems = screen.getAllByRole('listitem');
  // const optionItemsText = optionItems.map((item) => item.textContent);
  // expect(optionItemsText).toEqual(['2 Vanilla', 'Cherries'])

  // accept terms and conditions, click order confirmation button
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // expect loading to show
  const loading = screen.getByText('/loading/i');
  expect(loading).toBeInTheDocument();

  // confirm order number in confirmation page
  // confirmation page is sending a POST request to the server, therefore is async
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // confirm loading has disappeared
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click place new order button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  // check that scoops and topping subtotals have been reset
  const scoopsTotal = await screen.findByText('Scoops total: £0.00');
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = await screen.findByText('Toppings total: £0.00');
  expect(toppingsTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  // wait for items to appear so that Testing Library is ok about what is happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('Cherries');
});

test('Toppings do not appear in the summary page if no toppings selected', async () => {
  render(<App />);

  // add vanilla ice cream scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');

  // find and click summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });

  userEvent.click(orderSummaryButton);

  // check scoops are in the summary and toppings are not if not selected
  const scoopsHeading = screen.getByRole('heading', { name: /scoops: £/i });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', {
    name: /toppings: £/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});
