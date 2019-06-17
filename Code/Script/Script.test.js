const [transpose, vecteursToInstructions] = require('./Script');
const Aventurier = require('../Pionts/Aventurier/Aventurier');

//let Sara = new Aventurier('Sara', 7, 8, 'N', 'AADGADG');

test('testing the transpose method', () => {
  expect(transpose([[0, 1], [2, 3]])).toMatchObject([[0, 2], [1, 3]]);
  expect(transpose([[0, 1], [2, 3], [4, 5]])).toMatchObject([
    [0, 2, 4],
    [1, 3, 5]
  ]);
});

/* Développement en cours */

// // let un_vecteur_C = ['C', '10', '10'];
// let un_vecteur_montagne = [['M', '1', '2'], ['M', '2', '3']];
// let un_vecteur_tresor = [['T', '3', '4', '1'], ['T', '5', '6', '2']];
// let un_vecteur_aventurier = [
//   ['A', 'Sara', '7', '8', '3'],
//   ['A', 'Bibi', '6', '2', '9']
// ];

// test('testing the vecteursToInstructions method', () => {
//   expect(
//     vecteursToInstructions(
//       un_vecteur_montagne,
//       un_vecteur_tresor,
//       un_vecteur_aventurier
//     )
//   ).toMatchObject([
//     ['M', '1', '2'],
//     ['M', '2', '3'],
//     ['T', '3', '4', '1'],
//     ['T', '5', '6', '2'],
//     ['A', 'Sara', '7', '8', '3'],
//     ['A', 'Bibi', '6', '2', '9']
//   ]);
// });
