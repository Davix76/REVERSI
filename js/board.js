function Board(lado) { // lado siempre tiene que ser un numero par
  this.element = $("#game");
  this.scoreA = 0;
  this.scoreB = 0;

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
  // si la posicion adjacente izquierda es color adversaria
  if (x > 0 && this.board[y][x - 1].status === colorAdversario) {
    // e si encontro mi color en essa dire
    for (var k = x-1; k >= 0; k--){
      // si la celula en la posicion del loop es igual al la que jugo
      if (this.board[y][k].status === this.colorTurno){
        return 'izquierda';
      }
    }
  }
  // si la posicion adjacente arriba es color adversaria
  if (y > 0 && this.board[y - 1][x].status === colorAdversario) {
    // e si encontro mi color en essa dire
    for (var k = y-1; k >= 0; k--){
      // si la celula en la posicion del loop es igual al la que jugo
      if (this.board[k][x].status === this.colorTurno){
        return 'arriba';
      }
    }
  }
  // si la posicion adjacente derecha es color adversaria
  if (x < 7 && this.board[y][x + 1].status === colorAdversario) {
    for (var k = x+1; k < 7; k++){
      // si la celula en la posicion del loop es igual al la que jugo
      if (this.board[y][k].status === this.colorTurno){
        return 'derecha';
      }
    }

  }
  // si la posicion adjacente abajo es color adversaria
  if (y < 7 && this.board[y + 1][x].status === colorAdversario) {
    for (var k = y+1; k < 7; k++){
      // si la celula en la posicion del loop es igual al la que jugo
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

  var hayQueCambiar = false;

  // loop de pos[0] hasta 0 para detectar se hay que cambiar colores
  for (var k = y-1; k >= 0; k--){
    // si la celula en la posicion del loop es igual al la que jugo
    if (this.board[k][x].status === this.colorTurno){
      hayQueCambiar = true;
    }
  }

  // se no ay que cambiar, return

  console.log();

  // loop de pos[0] hasta 0 para cambiarlas
     // si la celula en la posicion del loop es color adversaria
        // cambiarla
     // si es tu color, return
};

// -- public interface

Board.prototype.clickOnEmpty = function(pos) {
  // PONER CONDICIONES A LAS FICHAS
  if (this.posValida(pos)) {
    // Creas una ficha nueva en la posicion válida
    this.board[pos[0]][pos[1]].addFicha(this.colorTurno);
    //cambiar status FICHAS
    // this.cambiarColores(pos);
    // inverter la color del turno
    this.colorTurno = this.colorTurno === 'negra' ? 'blanca' : 'negra';
    this.updateColorTurno();
  }
};
