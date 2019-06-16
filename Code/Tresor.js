class Tresor {
  constructor(x, y, nombre_tresors) {
    this.label = 'T';
    this.position = [x, y];
    this.nombre_tresors = nombre_tresors;
    this.aventurier = [];
  }

  addAventurier(aventurier) {
    this.aventurier.push(aventurier);
    this.label = 'T+A';
  }

  removeAventurier() {
    this.aventurier.pop();
    this.label = 'T';
  }
}

module.exports = Tresor;
