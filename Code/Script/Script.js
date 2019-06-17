/* Modules pour les différents pionts */

const Montagne = require('../Pionts/Montagne/Montagne');
const Tresor = require('../Pionts/Tresor/Tresor');
const Aventurier = require('../Pionts/Aventurier/Aventurier');

/* Modules pour tranformer le fichier d'entrée en instructions initiales */

const instructions_initiales = require('../ActionsFichiers/LectureFichierEntrée/LectureFichierEntrée');

/* Fonction pour tranformer les instructions finales en fichier sortie */

const EcrireFichier = require('../ActionsFichiers/EcritureFichierSortie/EcritureFichierSortie');

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

/* Fonction d'initialisation de la matrice map : 
recherche d'une instruction commençant par un C dans le fichier d'entrée, 
puis, dans le cas où plusieurs intructions C seraient présentes, 
on prend pour chaque instruction celui qui contient le plus grand nombre d'éléments respectivement en x et en y */

async function initMap(des_instructions) {
  let max_x = 0;
  let max_y = 0;
  des_instructions.forEach(element => {
    if (element.includes('C')) {
      let [taille_x, taille_y] = [parseInt(element[1]), parseInt(element[2])];

      if (max_x > taille_x) {
        x_map_length = max_x;
      } else if (max_x <= taille_x) {
        max_x = taille_x;
        x_map_length = max_x;
      }
      if (max_y > taille_y) {
        y_map_length = max_y;
      } else if (max_y <= taille_y) {
        max_y = taille_y;
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

/* Fonction qui place les éléments sur la map à partir d'instructions */

async function createMap(des_instructions) {
  des_instructions.forEach(element => {
    switch (element[0]) {
      case 'M':
        let [une_position_montagne_x, une_position_montagne_y] = [
          parseInt(element[1]),
          parseInt(element[2])
        ];
        let Une_Case_Montagne = new Montagne(
          une_position_montagne_x,
          une_position_montagne_y
        );
        map[une_position_montagne_x][une_position_montagne_y] = new Montagne(
          une_position_montagne_x,
          une_position_montagne_y
        );

        montagnes.push(Une_Case_Montagne);

        map_draw[une_position_montagne_x][une_position_montagne_y] = '  M     ';
        break;
      case 'T':
        let [
          une_position_tresor_x,
          une_position_tresor_y,
          un_nombre_de_tresors
        ] = [parseInt(element[1]), parseInt(element[2]), parseInt(element[3])];
        if (map[une_position_tresor_x][une_position_tresor_y] === 0) {
          let Une_Case_Tresor = new Tresor(
            une_position_tresor_x,
            une_position_tresor_y,
            un_nombre_de_tresors
          );
          map[une_position_tresor_x][une_position_tresor_y] = Une_Case_Tresor;

          tresors.push(Une_Case_Tresor);

          map_draw[une_position_tresor_x][
            une_position_tresor_y
          ] = `  T(${un_nombre_de_tresors})  `;
        }
        break;
      case 'A':
        let [
          un_nom,
          une_position_aventurier_x,
          une_position_aventurier_y,
          une_orientation,
          des_commandes_de_deplacement
        ] = [
          element[1],
          parseInt(element[2]),
          parseInt(element[3]),
          element[4],
          element[5]
        ];
        if (
          map[une_position_aventurier_x][une_position_aventurier_y] === 0 ||
          map[une_position_aventurier_x][une_position_aventurier_y].label ===
            'T'
        ) {
          let Un_Aventurier = new Aventurier(
            element[1],
            parseInt(une_position_aventurier_x),
            parseInt(une_position_aventurier_y),
            element[4],
            element[5]
          );

          aventuriers.push(Un_Aventurier);

          // Si la case est une case Trésor, alors on fait cohabiter Trésor et aventurier et on le note sous la forme T(nombre_de_trésors_sur_la_case)+{nombre_d_aventuriers_sur_la_case}A
          if (
            map[une_position_aventurier_x][une_position_aventurier_y].label ===
            'T'
          ) {
            map[une_position_aventurier_x][
              une_position_aventurier_y
            ].addAventurier(Un_Aventurier);
            map_draw[une_position_aventurier_x][
              une_position_aventurier_y
            ] = `T(${
              map[une_position_aventurier_x][une_position_aventurier_y]
                .nombre_tresors
            })+${
              map[une_position_aventurier_x][une_position_aventurier_y]
                .aventurier.length
            }A`;

            // Sinon, on rajoute juste l'aventurier sur la case
          } else {
            map[une_position_aventurier_x][
              une_position_aventurier_y
            ] = Un_Aventurier;
            map_draw[une_position_aventurier_x][
              une_position_aventurier_y
            ] = `A(${un_nom})`;
          }
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

  vecteur_aventuriers.forEach(element => {
    element.aventurierFaitSonParcours(map, x_map_length, y_map_length);
  });

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

/* Fonction qui execute le code : Si la taille de la carte ne dépasse pas la taille de 5*5, alors la carte est imprimée dans la console. 
Sinon, seul les instructions initiales et finales sont affichées */

async function Execute(des_instructions_initiales) {
  initMap(des_instructions_initiales)
    .then(console.log(`Instructions initiales`))
    .then(console.log(des_instructions_initiales))
    .then(
      console.log(
        `
Map Initialisée avec une taille de ${x_map_length}x${y_map_length}
`
      )
    );
  if (x_map_length <= 5 && y_map_length) {
    createMap(des_instructions_initiales)
      .then(
        console.log(
          `
Premiers pionts placés
`
        )
      )
      .then(console.log(transpose(map_draw)))
      .then(
        console.log(
          `
Instructions Finales
`
        )
      )
      .then(
        console.log(vecteursToInstructions(montagnes, tresors, aventuriers))
      )
      .then(initMap(des_instructions_initiales))
      .then(
        createMap(instructions_finales)
          .then(
            console.log(
              `
Derniers pionts placés
`
            )
          )
          .then(console.log(transpose(map_draw)))
      );
  } else {
    createMap(des_instructions_initiales)
      .then(
        console.log(
          `
Premiers pionts placés
`
        )
      )
      .then(
        console.log(
          `
Instructions Finales
`
        )
      )
      .then(
        console.log(vecteursToInstructions(montagnes, tresors, aventuriers))
      );
  }
}

/* Exécution du Script */

Execute(instructions_initiales);

EcrireFichier(instructions_finales);

module.exports = [transpose, vecteursToInstructions];
