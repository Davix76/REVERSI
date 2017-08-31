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

// -- private

function posValida(board, pos, color) {
  var colorAdversario = color === "negra" ? "blanca" : "negra" ;
  var y = pos[0];
  var x = pos[1];
  // posicion izquierda
  if (x > 0 && board[y][x - 1].status === colorAdversario) {
    return true;
  }
  // posicion arriba
  else if (y > 0 && board[y-1][x].status === colorAdversario) {
    return true;
  }
  //posicion derecha
  else if (x < 7 && board[y][x + 1].status === colorAdversario) {
    return true;
  }
  //posicion abajo
  else if (y < 7 && board[y+1][x].status === colorAdversario) {
    return true;
  }

    return false;

}

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
  console.log(pos,color);
  this.selectedPos = pos;
  this.selectedColor = color;

};

Board.prototype.clickOnEmpty = function(pos){
  if(this.selectedPos){
    console.log("Ficha seleccionada, validar posicion y cambiar estado de nueva posicion si es valido");
    console.log(pos);
    // PONER CONDICIONES A LAS FICHAS
    if (posValida(this.board, pos, this.selectedColor)) {

      this.board[this.selectedPos[0]][this.selectedPos[1]].unselected();
      this.selectedPos = null;

      // Creas una ficha nueva en la posicion válida
      this.board[pos[0]][pos[1]].addFicha(this.selectedColor);

      //cambiar status FICHAS
    }

  }else{
    console.log("No hay ficha seleccionada");
  }
};
