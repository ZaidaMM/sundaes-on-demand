import { screen, render, act } from '../../../test-utils/testing-library-utils';
import { userEvent } from '@testing-library/user-event';
import Options from '../Options';

test('scoops subtotal when scoops have changed', async () => {
  render(<Options optionType='scoops' />);

  // make sure total starts out a $0.00
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
