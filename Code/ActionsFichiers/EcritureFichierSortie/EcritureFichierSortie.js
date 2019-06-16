const fs = require('fs');

const fichier_en_sortie = 'Fichiers/Sortie.txt';

/* Fonction qui transforme un vecteur d'instructions finales en texte */

function instructionFinalesToString(des_instructions_finales) {
  let string_final = '';
  des_instructions_finales.forEach(element => {
    string_intermediaire = string_final;
    string_final = string_intermediaire + `${element[0]}`;
    for (let i = 1; i < element.length; i++) {
      string_intermediaire = string_final;
      string_final = string_intermediaire + ` - ${element[i]}`;
    }
    string_intermediaire = string_final;
    string_final =
      string_intermediaire +
      `
`;
  });
  return string_final;
}

/* Fonction qui écrit le fichier sortie à partir des instructions finales */

async function EcrireFichier(des_instructions_finales) {
  fs.writeFile(
    fichier_en_sortie,

    `${instructionFinalesToString(des_instructions_finales)}`,

    function(err) {
      if (err) throw err;
      console.log('Fichier Sortie écrit');
    }
  );
}

module.exports = EcrireFichier;
