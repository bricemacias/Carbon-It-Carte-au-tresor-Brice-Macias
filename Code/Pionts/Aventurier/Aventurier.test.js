const Aventurier = require('./Aventurier');

let Un_Aventurier = new Aventurier('test', 2, 3, 'N', 'AADGADG');
let Un_Autre_Aventurier = new Aventurier('test2', 4, 5, 'S', 'AADGADG');
let Un_Dernier_Aventurier = new Aventurier('test3', 6, 7, 'E', 'AADGADG');

test('testing constructor', () => {
  expect(Un_Aventurier.label).toBe('A');
  expect(Un_Aventurier.name).toBe('test');
  expect(Un_Aventurier.position).toMatchObject([2, 3]);
  expect(Un_Aventurier.orientation).toBe('N');
  expect(Un_Aventurier.commandes_de_deplacement).toBe('AADGADG');
  expect(Un_Aventurier.etapes_avec_oriention).toMatchObject([]);
  expect(Un_Aventurier.tresors_recoltes).toBe(0);
  expect(Un_Aventurier.aventuriers_voisins).toMatchObject([]);
});

test('testing addAventurier', () => {
  Un_Aventurier.addAventurier(Un_Autre_Aventurier);

  expect(Un_Aventurier.aventuriers_voisins).toMatchObject([
    Un_Autre_Aventurier
  ]);
  expect(Un_Aventurier.aventuriers_voisins[0]).toMatchObject(
    Un_Autre_Aventurier
  );
  expect(Un_Aventurier.label).toBe('A+A');

  Un_Aventurier.addAventurier(Un_Dernier_Aventurier);

  expect(Un_Aventurier.aventuriers_voisins).toMatchObject([
    Un_Autre_Aventurier,
    Un_Dernier_Aventurier
  ]);
  expect(Un_Aventurier.aventuriers_voisins[1]).toMatchObject(
    Un_Dernier_Aventurier
  );
  expect(Un_Aventurier.label).toBe('A+A');
});

test('testing removeAventurier', () => {
  Un_Aventurier.removeAventurier(Un_Autre_Aventurier);

  expect(Un_Aventurier.aventuriers_voisins).toMatchObject([
    Un_Dernier_Aventurier
  ]);
  expect(Un_Aventurier.aventuriers_voisins[0]).toMatchObject(
    Un_Dernier_Aventurier
  );
  expect(Un_Aventurier.aventuriers_voisins.length).toBe(1);
  expect(Un_Aventurier.label).toBe('A+A');

  Un_Aventurier.removeAventurier(Un_Dernier_Aventurier);

  expect(Un_Aventurier.aventuriers_voisins).toMatchObject([]);
  expect(Un_Aventurier.aventuriers_voisins[0]).toBeUndefined();
  expect(Un_Aventurier.aventuriers_voisins.length).toBe(0);
  expect(Un_Aventurier.label).toBe('A');
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

/* Développement en cours */
