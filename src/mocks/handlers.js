import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imaPath: '/images/chocolate.png' },
        { name: 'Vanilla', imaPath: '/images/vanilla.png' },
      ])
    );
  }),
];
