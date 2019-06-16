const Montagne = require('./Pionts/Montagne');
const Tresor = require('./Pionts/Tresor');
const Aventurier = require('./Pionts/Aventurier');

/* Modules pour tranformer le fichier d'entrée en instructions initiales */

const instructions_initiales = require('./ActionsFichiers/LectureFichierEntrée');

/* Fonction pour tranformer les instructions finales en fichier sortie */

const EcrireFichier = require('./ActionsFichiers/EcritureFichierSortie');

/* Création de la matrice de la map */

let x_map,
  x_map_length,
  y_map,
  y_map_length,
  map = [];

/* Création de la matrice de dessin de la map */

let map_draw = [];

/* Création des vecteurs contenant les différents éléments */

let montagnes = [];
let tresors = [];
let aventuriers = [];

/* Création du vecteurs d'instructions en sortie */

let instructions_finales = [];

/* fonction de transposition de la matrice */

function transpose(une_matrice) {
  return Object.keys(une_matrice[0]).map(function(une_colonne) {
    return une_matrice.map(function(une_ligne) {
      return une_ligne[une_colonne];
    });
  });
}

/* Fonction d'initialisation de la matrice map : recherche d'une instruction commençant par un C dans le fichier d'entrée, puis, dans le cas où plusieurs intructions C seraient présentes, on prend pour chaque instruction celui qui contient le plus grand nombre d'éléments respectivement en x et en y */

async function initMap(des_instructions) {
  let max_x = 0;
  let max_y = 0;
  des_instructions.forEach(element => {
    if (element.includes('C')) {
      if (max_x > element[1]) {
        x_map_length = max_x;
      } else if (max_x <= element[1]) {
        max_x = element[1];
        x_map_length = max_x;
      }
      if (max_y > element[2]) {
        y_map_length = max_y;
      } else if (max_y <= element[2]) {
        max_y = element[2];
        y_map_length = max_y;
      }

      for (x_map = 0; x_map < x_map_length; x_map++) {
        if (!map[x_map]) {
          map[x_map] = [];
          map_draw[x_map] = [];
        }
        for (y_map = 0; y_map < y_map_length; y_map++) {
          map[x_map][y_map] = 0;
          map_draw[x_map][y_map] = '  0     ';
        }
      }
    }
  });
  return [map, map_draw];
}

/* Fonction qui place les premiers éléments sur la map */

async function createMap(des_instructions) {
  des_instructions.forEach(element => {
    switch (element[0]) {
      case 'M':
        map[element[1]][element[2]] = new Montagne(element[1], element[2]);

        montagnes.push(map[element[1]][element[2]]);

        map_draw[element[1]][element[2]] = '  M     ';
        break;
      case 'T':
        if (map[element[1]][element[2]] === 0) {
          map[element[1]][element[2]] = new Tresor(
            parseInt(element[1]),
            parseInt(element[2]),
            parseInt(element[3])
          );

          tresors.push(map[element[1]][element[2]]);

          map_draw[element[1]][element[2]] = `  T(${element[3]})  `;
        }
        break;
      case 'A':
        if (
          map[element[2]][element[3]] === 0 ||
          map[element[2]][element[3]].label === 'T'
        ) {
          let A = new Aventurier(
            element[1],
            parseInt(element[2]),
            parseInt(element[3]),
            element[4],
            element[5]
          );

          aventuriers.push(A);

          if (map[element[2]][element[3]].label === 'T') {
            map[element[2]][element[3]].addAventurier(A);
            //++A.tresors_recoltes;
            //--map[element[2]][element[3]].nombre_tresors;
            map_draw[element[2]][element[3]] = `A(${A.tresors_recoltes})T(${
              map[element[2]][element[3]].nombre_tresors
            })`;
          } else {
            map[element[2]][element[3]] = A;
            map_draw[element[2]][element[3]] = `A(${element[1]})`;
          }
        } else if (map[element[2]][element[3]].label === 'T') {
          let A = new Aventurier(
            element[1],
            parseInt(element[2]),
            parseInt(element[3]),
            element[4],
            element[5]
          );
        }

        break;
    }
  });
  return [map, map_draw];
}

/* Fonction qui transforme les vecteur d'objets en instructions finales */

function vecteursToInstructions(
  vecteur_montagnes,
  vecteur_tresors,
  vecteur_aventuriers
) {
  instructions_finales[0] = ['C', `${x_map_length}`, `${y_map_length}`];
  vecteur_montagnes.forEach(element => {
    instructions_finales.push([
      'M',
      `${element.position[0]}`,
      `${element.position[1]}`
    ]);
  });

  vecteur_tresors.forEach(element => {
    instructions_finales.push([
      'T',
      `${element.position[0]}`,
      `${element.position[1]}`,
      `${element.nombre_tresors}`
    ]);
  });

  vecteur_aventuriers.forEach(element => {
    element.aventurierFaitSonParcours(map, x_map_length, y_map_length);
    instructions_finales.push([
      'A',
      `${element.name}`,
      `${element.position[0]}`,
      `${element.position[1]}`,
      `${element.tresors_recoltes}`
    ]);
  });

  return instructions_finales;
}

/* Fonction qui transforme des instructions initiales en instructions finales */

function instructionsInitialesEnFinales(instructions_initiales) {
  initMap(instructions_initiales)
    .then(createMap(instructions_initiales))
    .then(
      anventuriers.forEach(element => {
        element.aventurierFaitSonParcours(map, x_map_length, y_map_length);
      })
    )
    .then(vecteursToInstructions(montagnes, tresors, aventuriers));
}

/* Exécution du Script */

initMap(instructions_initiales)
  .then(console.log(`Instructions initiales`))
  .then(console.log(instructions_initiales))
  .then(
    console.log(
      `
Map Initialisée avec une taille de ${x_map_length}x${y_map_length}
`
    )
  )
  //.then(console.log(transpose(map_draw)))
  .then(
    createMap(instructions_initiales).then(
      console.log(
        `
Premiers pionts placés
`
      )
    )
    //.then(console.log(transpose(map_draw)))
  )
  // .then(console.log(aventuriers))
  // .then(console.log(map[0][0].label))
  // .then(
  //   console.log(
  //     `Vecteur d'étapes final tenant compte de l'orientation ${
  //       aventuriers[0].orientation
  //     }`
  //   )
  // )
  // .then(
  //   console.log(
  //     aventuriers[0].etapesAvecOrientation(
  //       aventuriers[0].etapesSansOrientation(
  //         aventuriers[0].commandes_de_deplacement
  //       ),
  //       aventuriers[0].orientation
  //     )
  //   )
  // )
  // .then(
  //   console.log(
  //     aventuriers[0].aventurierFaitSonParcours(map, x_map_length, y_map_length),
  //     aventuriers[1].aventurierFaitSonParcours(map, x_map_length, y_map_length)
  //   )
  // )
  .then(
    console.log(
      `
Instructions Finales
`
    )
  )
  .then(console.log(vecteursToInstructions(montagnes, tresors, aventuriers)));
//.then(console.log(transpose(map_draw)))
//.then(console.log(instructionFinalesToString(instructions_finales)));

EcrireFichier(instructions_finales);
