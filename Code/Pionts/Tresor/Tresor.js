class Tresor {
  constructor(x, y, nombre_tresors) {
    this.label = 'T';
    this.position = [x, y];
    this.nombre_tresors = nombre_tresors;
    this.aventuriers_sur_case = [];
  }

  addAventurier(aventurier) {
    this.aventuriers_sur_case.push(aventurier);
    if (this.label === 'T') {
      this.label = 'T+A';
    }
  }

  removeAventurier(aventurier) {
    this.aventuriers_sur_case.splice(
      this.aventuriers_sur_case.indexOf(aventurier),
      1
    );
    if (this.aventuriers_sur_case.length === 0) {
      this.label = 'T';
    }
  }
}

module.exports = Tresor;
