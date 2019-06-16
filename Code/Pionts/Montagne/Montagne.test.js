const Montagne = require('./Montagne');

let Une_Montagne = new Montagne(1, 3);

test('testing constructor', () => {
  expect(Une_Montagne.position).toMatchObject([1, 3]);
  expect(Une_Montagne.label).toBe('M');
});
