const [transpose, Execute] = require('./Script');

test('testing the transpose method', () => {
  expect(transpose([[0, 1], [2, 3]])).toMatchObject([[0, 2], [1, 3]]);
  expect(transpose([[0, 1], [2, 3], [4, 5]])).toMatchObject([
    [0, 2, 4],
    [1, 3, 5]
  ]);
});
