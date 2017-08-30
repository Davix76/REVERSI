
$(document).ready(function() {
var player1 = new Player();
var player2 = new Player();
var board = new Board (player1,player2);
console.log(board);

  var game = $("#game");

  // Filas y columnas
  var m = 8;

  for(var i = 0; i < m; i++){
    for(var j= 0; j < m; j++){
    var ficha = $("<div class='ficha'>");
    ficha.appendTo(game);
    }
  //  var ficha = new Ficha(game);
    game.append($('<br>'));
  }
  $(".ficha").on("click", function (){
    
  });

});
