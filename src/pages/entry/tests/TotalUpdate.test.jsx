import { screen, render, act } from '../../../test-utils/testing-library-utils';
import { userEvent } from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('scoops subtotal when scoops have changed', async () => {
  render(<Options optionType='scoops' />);

  // make sure subtotal starts out at £0.00
  // use exact:false, bcs it is by default true
  const scoopSubtotal = screen.getByText('Scoops total: £', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  //  if updating a TEXT ELEMENT, better to use clear first as don't know what's been in it before,
  //  may end up with a 10 instead of a 1 and test will fail

  // await userEvent.clear(vanillaInput);
  // await userEvent.type(vanillaInput, '1');
  // expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  // await userEvent.clear(chocolateInput);
  // await userEvent.type(chocolateInput, '2');
  // expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('toppings subtotal updates when toppings have changed', async () => {
  render(<Options optionType='toppings' />);

  // make sure subtotal starts out at £0.00
  const toppingSubtotal = screen.getByText('Toppings total: £', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  // find and tick cherries box and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  expect(cherriesCheckbox).not.toBeChecked();

  // userEvent.click(cherriesCheckbox);
  // expect(toppingSubtotal).toHaveTextContent('1.50');

  // tick M&Ms box and check subtotal
  const mmsCheckbox = screen.getByRole('checkbox', { name: /M&Ms/i });

  // userEvent.click(mmsCheckbox);
  // expect(toppingSubtotal).toHaveTextContent('3.00');

  // tick one of those boxes off and check subtotal
  // userEvent.click(cherriesCheckbox);
  // expect(toppingSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts out at £0.00', () => {
    // test that grand total starts at £0.00
    render(<OrderEntry />);

    // get the heading
    // can also use screen.getByText('Grand total: £', {exact:false})
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: £/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: £/i,
    });

    // update vanilla scoops to 2, check grand total
    const vanillaScoops = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    // userEvent.clear(vanillaScoops);
    // userEvent.type(vanillaScoops, '2');
    // expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total
    const cherriesTopping = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    // userEvent.click(cherriesTopping);
    // expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total: £/i });

    // add cherries and check grand total
    const cherriesTopping = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    // userEvent.click(cherriesTopping);
    // expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla scoops to 2, check grand total
    const vanillaScoops = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    // userEvent.type(vanillaScoops, '2');
    // expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if an item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: £/i });

    // add cherries
    const cherriesTopping = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    // userEvent.click(cherriesTopping);
    // grand total £1.50

    // update vanilla scoops to 2, grand total £5.50
    const vanillaScoops = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    // userEvent.clear(vanillaScoops);
    // userEvent.click(vanillaScoops);

    // remove 1 scoop of vanilla and check grand total
    // userEvent.clear(vanillaScoops);
    // userEvent.type(vanillaScoops, '1');
    // expect(grandTotal).toHaveTextContent('3.50');

    // remove cherries
    // userEvent.click(cherriesTopping);
    // expect(grandTotal).toHaveTextContent('2.00');
  });
});
