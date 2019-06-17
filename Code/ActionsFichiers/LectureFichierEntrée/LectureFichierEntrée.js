/* Module pour lire le fichier texte ligne par ligne*/

const readlines = require('n-readlines');

/* Décomposition ligne par ligne pour créer un vecteur d'instructions */

const fichier_en_entree = 'Fichiers/Entrée.txt';

const liner = new readlines(fichier_en_entree);
const instructions_initiales = [];
let next;

// Condition pour former le vecteur d'instructions initiales : Il doit contenir une de ces lettres
let conditions = ['C', 'M', 'T', 'A'];

while ((next = liner.next())) {
  let next_to_string = next.toString('ascii').split(/ - | -|- |-| /);
  if (conditions.some(el => next_to_string.includes(el))) {
    instructions_initiales.push(next_to_string);
  }
}

module.exports = instructions_initiales;
