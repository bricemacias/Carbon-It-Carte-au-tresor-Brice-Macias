const Tresor = require('./Tresor');
const Aventurier = require('../Aventurier/Aventurier');

let Un_Tresor = new Tresor(2, 3, 1);

let Un_Aventurier = new Aventurier(test, 2, 3, 'N', 'AADGADG');

test('testing constructor', () => {
  expect(Un_Tresor.label).toBe('T');
  expect(Un_Tresor.position).toMatchObject([2, 3]);
  expect(Un_Tresor.nombre_tresors).toBe(1);
  expect(Un_Tresor.aventurier[0]).toBeUndefined();
  expect(Un_Tresor.aventurier).toMatchObject([]);
});

test('testing addAventurier', () => {
  Un_Tresor.addAventurier(Un_Aventurier);

  expect(Un_Tresor.aventurier).toMatchObject([Un_Aventurier]);
  expect(Un_Tresor.aventurier[0]).toMatchObject(Un_Aventurier);
  expect(Un_Tresor.label).toBe('T+A');
});

test('testing removeAventurier', () => {
  Un_Tresor.removeAventurier();

  expect(Un_Tresor.aventurier).toMatchObject([]);
  expect(Un_Tresor.aventurier[0]).toBeUndefined();
  expect(Un_Tresor.label).toBe('T');
});
