function Board(lado) { // lado siempre tiene que ser un numero par
  this.element = $("#game");
  this.scoreA = 0;
  this.scoreB = 0;

  // Create the board
  this.board = [];
  for(var i=0; i < lado ;i++){
    this.board.push([]);
    for(var j=0; j< lado; j++){
      var f = new Ficha(this, i, j);
      this.board[i].push(f);
    }
    this.element.append($('<br>'));
  }

  // Fichas diagonales centrales blancas y negras
  this.board[(lado/2)-1][(lado/2)-1].addFicha('blanca');
  this.board[(lado/2)][(lado/2)].addFicha('blanca');
  this.board[(lado/2)][(lado/2)-1].addFicha('negra');
  this.board[(lado/2)-1][(lado/2)].addFicha('negra');
}

Board.prototype.posValida = function (pos) {

  var colorAdversario = this.selectedColor === "negra" ? "blanca" : "negra" ;
  var y = pos[0];
  var x = pos[1];
  // posicion izquierda
  if (x > 0 && this.board[y][x - 1].status === colorAdversario) {
    return true;
  }
  // posicion arriba
  else if (y > 0 && this.board[y-1][x].status === colorAdversario) {
    return true;
  }
  //posicion derecha
  else if (x < 7 && this.board[y][x + 1].status === colorAdversario) {
    return true;
  }
  //posicion abajo
  else if (y < 7 && this.board[y+1][x].status === colorAdversario) {
    return true;
  }
    return false;
};

Board.prototype.cambiarColores = function (pos) {
  var colorAdversario = this.selectedColor === "negra" ? "blanca" : "negra" ;
  var y = pos[0];
  var x = pos[1];
  // posicion izquierda
if (y < 7 && this.board[y+1][x].status === colorAdversario) {
    this.board[y+1][x].status = colorAdversario;
  }
};

// -- public interface

Board.prototype.unselectAll = function(){
  for(var y=0; y< this.board.length; y++){
    for(var x=0; x< this.board[y].length; x++){
      this.board[y][x].unselected();
    }
  }
};

Board.prototype.selectedFicha = function(pos, color){
  this.unselectAll();
  this.selectedPos = pos;
  this.selectedColor = color;

};

Board.prototype.clickOnEmpty = function(pos){
  if(this.selectedPos){
    // PONER CONDICIONES A LAS FICHAS
    if (this.posValida(pos)) {

      this.board[this.selectedPos[0]][this.selectedPos[1]].unselected();
      this.selectedPos = null;

      // Creas una ficha nueva en la posicion válida
      this.board[pos[0]][pos[1]].addFicha(this.selectedColor);

      //cambiar status FICHAS
    }
    this.cambiarColores(pos);

  }else{
    console.log("No hay ficha seleccionada");
  }
};
