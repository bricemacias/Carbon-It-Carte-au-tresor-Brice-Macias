class Aventurier {
  constructor(name, x, y, orientation, commandes_de_deplacement) {
    this.label = 'A';
    this.name = name;
    this.position = [x, y];
    this.orientation = orientation;
    this.commandes_de_deplacement = commandes_de_deplacement;
    this.etapes_avec_oriention = [];
    this.tresors_recoltes = 0;
  }

  /* Fonction permettant de transformer les commandes de déplacements en un vecteur d'étapes */

  etapesSansOrientation(des_commandes_de_deplacement) {
    let vecteur_etapes = des_commandes_de_deplacement.split('');
    return vecteur_etapes;
  }

  /* Fonction permettant de transformer le vecteur d'étapes sans orientation d'un aventurier en un vecteur d'étapes prenant compte de l'orientation initiale */

  etapesAvecOrientation(vecteur_etapes, orientation) {
    let etapes_finales = [];
    vecteur_etapes.forEach(element => {
      switch (orientation) {
        case 'N':
          switch (element) {
            case 'A':
              etapes_finales.push('Up');
              break;
            case 'D':
              etapes_finales.push('Right');
              break;
            case 'G':
              etapes_finales.push('Left');
              break;
          }
          break;
        case 'S':
          switch (element) {
            case 'A':
              etapes_finales.push('Down');
              break;
            case 'D':
              etapes_finales.push('Left');
              break;
            case 'G':
              etapes_finales.push('Right');
              break;
          }
          break;
        case 'E':
          switch (element) {
            case 'A':
              etapes_finales.push('Right');
              break;
            case 'D':
              etapes_finales.push('Down');
              break;
            case 'G':
              etapes_finales.push('Up');
              break;
          }
          break;
        case 'O':
          switch (element) {
            case 'A':
              etapes_finales.push('Left');
              break;
            case 'D':
              etapes_finales.push('Up');
              break;
            case 'G':
              etapes_finales.push('Down');
              break;
          }
          break;
      }
    });
    this.etapes_avec_oriention = etapes_finales;
    return etapes_finales;
  }

  /* Fonction permettant à aventurier de faire son parcours */

  aventurierFaitSonParcours(map, x_map_length, y_map_length) {
    let [x, y] = [this.position[0], this.position[1]];

    // On crée un vecteur d'étapes prenant compte de l'orientation
    let vecteur_etapes = this.etapesAvecOrientation(
      this.etapesSansOrientation(this.commandes_de_deplacement),
      this.orientation
    );

    // On déplace l'aventurier selon chaque instruction en respectant les conditions (montagnes, trésors et ne pas sortir des rebords de la carte)
    for (let i = 0; i < vecteur_etapes.length; i++) {
      switch (vecteur_etapes[i]) {
        case 'Up':
          if (
            y > 0 &&
            map[this.position[0]][this.position[1] - 1].label !== 'M'
          ) {
            // Si pas de montagne en face, et dans les rebords de la map, on regarde si on se trouve déja sur une case trésor, auquel cas on retire l'aventurier de la case trésor avant d'avancer
            if (map[this.position[0]][this.position[1]].label === 'T+A') {
              map[this.position[0]][this.position[1]].removeAventurier();
            }
            this.position[1] = --y;

            // Si la prochaine case est une case trésor, on ajoute un aventurier à la case (aventurier et trésor cohabitent) puis si le nombre de trésors présents sur la case n'est pas nul, l'aventurier récolte un trésor
            if (map[this.position[0]][this.position[1]].label === 'T') {
              map[this.position[0]][this.position[1]].addAventurier(this);
              if (map[this.position[0]][this.position[1]].nombre_tresors > 0) {
                --map[this.position[0]][this.position[1]].nombre_tresors;
                ++this.tresors_recoltes;
              }
            }
          }
          break;
        case 'Down':
          if (
            y < y_map_length - 1 &&
            map[this.position[0]][this.position[1] + 1].label !== 'M'
          ) {
            if (map[this.position[0]][this.position[1]].label === 'T+A') {
              map[this.position[0]][this.position[1]].removeAventurier();
            }
            this.position[1] = ++y;

            if (map[this.position[0]][this.position[1]].label === 'T') {
              map[this.position[0]][this.position[1]].addAventurier(this);
              if (map[this.position[0]][this.position[1]].nombre_tresors > 0) {
                --map[this.position[0]][this.position[1]].nombre_tresors;
                ++this.tresors_recoltes;
              }
            }
          }
          break;
        case 'Right':
          if (
            x < x_map_length - 1 &&
            map[this.position[0] + 1][this.position[1]].label !== 'M'
          ) {
            if (map[this.position[0]][this.position[1]].label === 'T+A') {
              map[this.position[0]][this.position[1]].removeAventurier();
            }
            this.position[0] = ++x;

            if (map[this.position[0]][this.position[1]].label === 'T') {
              map[this.position[0]][this.position[1]].addAventurier(this);
              if (map[this.position[0]][this.position[1]].nombre_tresors > 0) {
                --map[this.position[0]][this.position[1]].nombre_tresors;
                ++this.tresors_recoltes;
              }
            }
          }
          break;
        case 'Left':
          if (
            x > 0 &&
            map[this.position[0] - 1][this.position[1]].label !== 'M'
          ) {
            if (map[this.position[0]][this.position[1]].label === 'T+A') {
              map[this.position[0]][this.position[1]].removeAventurier();
            }
            this.position[0] = --x;

            if (map[this.position[0]][this.position[1]].label === 'T') {
              map[this.position[0]][this.position[1]].addAventurier(this);
              if (map[this.position[0]][this.position[1]].nombre_tresors > 0) {
                --map[this.position[0]][this.position[1]].nombre_tresors;
                ++this.tresors_recoltes;
              }
            }
          }
          break;
      }
    }
    return this;
  }
}

module.exports = Aventurier;
