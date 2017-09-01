function Board(lado) { // lado siempre tiene que ser un numero par
  this.element = $("#game");
  this.scoreA = 0;
  this.scoreB = 0;
  this.lado = lado;

  this.colorTurno = 'blanca';

  // create the turno display
  var $turno = $('<p>Turno: <span></span></p>');
  this.$turnoColor = $turno.find('span');
  this.element.append($turno);

  // Create the board
  this.board = [];
  for (var i = 0; i < lado; i++) {
    this.board.push([]);
    for (var j = 0; j < lado; j++) {
      var f = new Ficha(this, i, j);
      this.board[i].push(f);
    }
    this.element.append($('<br>'));
  }

  // Fichas diagonales centrales blancas y negras
  this.board[(lado / 2) - 1][(lado / 2) - 1].addFicha('blanca');
  this.board[(lado / 2)][(lado / 2)].addFicha('blanca');
  this.board[(lado / 2)][(lado / 2) - 1].addFicha('negra');
  this.board[(lado / 2) - 1][(lado / 2)].addFicha('negra');

  this.updateColorTurno();
}

Board.prototype.updateColorTurno = function() {
  this.$turnoColor.text(this.colorTurno);
};

Board.prototype.posValida = function(pos) {

  var colorAdversario = this.colorTurno === "negra" ? "blanca" : "negra";
  var y = pos[0];
  var x = pos[1];
  // si la posicion izquierda es color  adversariao
  if (x > 0 && this.board[y][x - 1].status === colorAdversario) {

    for (var k = x-1; k >= 0; k--){

      if (this.board[y][k].status === this.colorTurno){
        return 'izquierda';
      }
    }
  }

  if (y > 0 && this.board[y - 1][x].status === colorAdversario) {

    for (var k = y-1; k >= 0; k--){

      if (this.board[k][x].status === this.colorTurno){
        return 'arriba';
      }
    }
  }

  if (x < this.lado - 1 && this.board[y][x + 1].status === colorAdversario) {
    for (var k = x+1; k < this.lado - 1; k++){

      if (this.board[y][k].status === this.colorTurno){
        return 'derecha';
      }
    }

  }

  if (y < this.lado - 1 && this.board[y + 1][x].status === colorAdversario) {
    for (var k = y+1; k < this.lado - 1; k++){

      if (this.board[k][x].status === this.colorTurno){
        return 'abajo';
      }
    }
  }
  return false;
};

Board.prototype.cambiarColoresArriba = function(pos) {
  var colorAdversario = this.colorTurno === "negra" ? "blanca" : "negra";
  var y = pos[0];
  var x = pos[1];

  // loop de pos[0] hasta 0 para cambiar colores
  for (var k = y-1; k >= 0; k--){

    if (this.board[k][x].status === colorAdversario){
      this.board[k][x].cambiaColor(this.colorTurno);
    }
    else {
      break;
      }
  }
};

Board.prototype.cambiarColoresAbajo = function(pos) {
  var colorAdversario = this.colorTurno === "negra" ? "blanca" : "negra";
  var y = pos[0];
  var x = pos[1];

  // loop de pos[0] hasta 0 para cambiar colores
  for (var k = y+1; k >= 0; k++){
  
    if (k > this.lado - 1) {
      return;
    }
    if (this.board[k][x].status === colorAdversario){
      this.board[k][x].cambiaColor(this.colorTurno);
    }
    else {
      break;
      }
  }
};

Board.prototype.cambiarColoresIzquierda = function(pos) {
  var colorAdversario = this.colorTurno === "negra" ? "blanca" : "negra";
  var y = pos[0];
  var x = pos[1];

  // loop de pos[0] hasta 0 para cambiar colores
  for (var k = x-1; k < 8; k--){
    // si la celula en la posicion del loop es adversario
    if (k < 0){ return;}
    if (this.board[y][k].status === colorAdversario){
      this.board[y][k].cambiaColor(this.colorTurno);
    }
    else {
      break;
      }
  }
};

Board.prototype.cambiarColoresDerecha = function(pos) {
  var colorAdversario = this.colorTurno === "negra" ? "blanca" : "negra";
  var y = pos[0];
  var x = pos[1];

  // loop de pos[0] hasta 0 para cambiar colores
  for (var k = x+1; k < 8; k++){
    // si la celula en la posicion del loop es adversario
    if (this.board[y][k].status === colorAdversario) {
      this.board[y][k].cambiaColor(this.colorTurno);
    }
    else {
      break;
    }
  }
};

Board.prototype.puedeJugar = function() {
  for (var i = 0; i < this.lado; i++) {
    for (var j = 0; j < this.lado; j++) {
      var pos = [i, j];
      var puede = this.posValida(pos);
      if (puede) {
        return true;
      }
    }
  }
};

Board.prototype.clickOnEmpty = function(pos) {
  // PONER CONDICIONES A LAS FICHAS
  var cambiarDireccion = this.posValida(pos);
  if (cambiarDireccion) {
    // Creas una ficha nueva en la posicion válida
    this.board[pos[0]][pos[1]].addFicha(this.colorTurno);
    //cambiar status FICHAS
    if (cambiarDireccion === 'arriba') {
        this.cambiarColoresArriba(pos);
    }

    if (cambiarDireccion === 'abajo') {
        this.cambiarColoresAbajo(pos);
    }
    if (cambiarDireccion === 'izquierda') {
        this.cambiarColoresIzquierda(pos);
    }
    if (cambiarDireccion === 'derecha') {
        this.cambiarColoresDerecha(pos);
    }
    // inverter la color del turno
    this.colorTurno = this.colorTurno === 'negra' ? 'blanca' : 'negra';
    this.updateColorTurno();

    if (!this.puedeJugar()) {
      // mostrar alerta
      // e despues, cambiar turno de nuevo
      console.log();
    }
  }
};
