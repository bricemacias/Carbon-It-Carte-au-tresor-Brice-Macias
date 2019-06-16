const Aventurier = require('./Aventurier');

let Un_Aventurier = new Aventurier(test, 2, 3, 'N', 'AADGADG');

test('testing constructor', () => {
  expect(Un_Aventurier.label).toBe('A');
  expect(Un_Aventurier.position).toMatchObject([2, 3]);
  expect(Un_Aventurier.orientation).toBe('N');
  expect(Un_Aventurier.commandes_de_deplacement).toBe('AADGADG');
  expect(Un_Aventurier.etapes_avec_oriention).toMatchObject([]);
  expect(Un_Aventurier.tresors_recoltes).toBe(0);
});

test('testing etapesSansOrientation', () => {
  expect(
    Un_Aventurier.etapesSansOrientation(Un_Aventurier.commandes_de_deplacement)
  ).toMatchObject(['A', 'A', 'D', 'G', 'A', 'D', 'G']);
});

test('testing etapesAvecOrientation', () => {
  expect(
    Un_Aventurier.etapesAvecOrientation(
      Un_Aventurier.etapesSansOrientation(
        Un_Aventurier.commandes_de_deplacement
      ),
      Un_Aventurier.orientation
    )
  ).toMatchObject(['Up', 'Up', 'Right', 'Left', 'Up', 'Right', 'Left']);

  expect(
    Un_Aventurier.etapesAvecOrientation(
      Un_Aventurier.etapesSansOrientation(
        Un_Aventurier.commandes_de_deplacement
      ),
      'S'
    )
  ).toMatchObject(['Down', 'Down', 'Left', 'Right', 'Down', 'Left', 'Right']);

  expect(
    Un_Aventurier.etapesAvecOrientation(
      Un_Aventurier.etapesSansOrientation(
        Un_Aventurier.commandes_de_deplacement
      ),
      'E'
    )
  ).toMatchObject(['Right', 'Right', 'Down', 'Up', 'Right', 'Down', 'Up']);

  expect(
    Un_Aventurier.etapesAvecOrientation(
      Un_Aventurier.etapesSansOrientation(
        Un_Aventurier.commandes_de_deplacement
      ),
      'O'
    )
  ).toMatchObject(['Left', 'Left', 'Up', 'Down', 'Left', 'Up', 'Down']);
});
