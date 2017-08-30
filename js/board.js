function Board(lado) {
  this.element = $("#game");

  this.scoreA = 0;
  this.scoreB = 0;

  // Create the board
  this.board = undefined;
  for(var i=0; i < lado ;i++){
    this.board.push([]);
    for(var j=0; j< lado; j++){
      var ficha = $("<div class='ficha' data-status='vacia'>");
      ficha.appendTo(this.element);
      this.board[j].push(ficha);
    }
    this.element.append($('<br>'));
  }
}

Board.prototype.changeFicha = fucntion(color){

}
ClassName.prototype.methodName = function () {

};
