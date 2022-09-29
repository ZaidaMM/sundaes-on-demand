import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test('displays image for each scoop from the server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping from the server', async () => {
  render(<Options optionType={'toppings'} />);

  // find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot Fudge topping',
  ]);
});

test('total does not update if no scoops selected', async () => {
  render(<Options optionType='scoops' />);

  // check invalid input
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-2');

  // make sure total does not update
  const scoopsSubtotal = screen.getByText('Scoops total: £0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});
