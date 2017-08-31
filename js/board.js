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

  // Ficha en juego

  // Fichas diagonales centrales blancas y negras
  this.board[(lado/2)-1][(lado/2)-1].addFicha('blanca');
  this.board[(lado/2)][(lado/2)].addFicha('blanca');
  this.board[(lado/2)][(lado/2)-1].addFicha('negra');
  this.board[(lado/2)-1][(lado/2)].addFicha('negra');
}

Board.prototype.unselectAll = function(){
  for(var i=0; i< this.board.length; i++){
    for(var j=0; j< this.board[i].length; j++){
      this.board[i][j].unselected();
    }
  }
};

Board.prototype.selectedFicha = function(pos, color){
  this.unselectAll();
  console.log(pos,color);
};
