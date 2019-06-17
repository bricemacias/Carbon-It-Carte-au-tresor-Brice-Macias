const Tresor = require('./Tresor');
const Aventurier = require('../Aventurier/Aventurier');

let Un_Tresor = new Tresor(2, 3, 1);

let Un_Aventurier = new Aventurier('test1', 2, 3, 'N', 'AADGADG');
let Un_Autre_Aventurier = new Aventurier('test2', 4, 5, 'S', 'AADGADG');

test('testing constructor', () => {
  expect(Un_Tresor.label).toBe('T');
  expect(Un_Tresor.position).toMatchObject([2, 3]);
  expect(Un_Tresor.nombre_tresors).toBe(1);
  expect(Un_Tresor.aventuriers_sur_case[0]).toBeUndefined();
  expect(Un_Tresor.aventuriers_sur_case).toMatchObject([]);
});

test('testing addAventurier', () => {
  Un_Tresor.addAventurier(Un_Aventurier);

  expect(Un_Tresor.aventuriers_sur_case).toMatchObject([Un_Aventurier]);
  expect(Un_Tresor.aventuriers_sur_case[0]).toMatchObject(Un_Aventurier);
  expect(Un_Tresor.label).toBe('T+A');

  Un_Tresor.addAventurier(Un_Autre_Aventurier);

  expect(Un_Tresor.aventuriers_sur_case).toMatchObject([
    Un_Aventurier,
    Un_Autre_Aventurier
  ]);
  expect(Un_Tresor.aventuriers_sur_case[1]).toMatchObject(Un_Autre_Aventurier);
  expect(Un_Tresor.label).toBe('T+A');
});

test('testing removeAventurier', () => {
  Un_Tresor.removeAventurier(Un_Aventurier);

  expect(Un_Tresor.aventuriers_sur_case).toMatchObject([Un_Autre_Aventurier]);
  expect(Un_Tresor.aventuriers_sur_case[0]).toMatchObject(Un_Autre_Aventurier);
  expect(Un_Tresor.aventuriers_sur_case.length).toBe(1);
  expect(Un_Tresor.label).toBe('T+A');

  Un_Tresor.removeAventurier(Un_Autre_Aventurier);

  expect(Un_Tresor.aventuriers_sur_case).toMatchObject([]);
  expect(Un_Tresor.aventuriers_sur_case[0]).toBeUndefined();
  expect(Un_Tresor.aventuriers_sur_case.length).toBe(0);
  expect(Un_Tresor.label).toBe('T');
});
