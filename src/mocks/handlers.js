import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imaPath: '/images/chocolate.png' },
        { name: 'Vanilla', imaPath: '/images/vanilla.png' },
      ])
    );
  }),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-&-ms.png' },
        { name: 'Hot Fudge', imagePath: '/images/hot-fudge.png' },
      ])
    );
  }),
];
