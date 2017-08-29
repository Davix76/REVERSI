$(document).ready(function() {


  var d;
  if ($(document).width() > $(document).height()) {
    d = $(document).height();
  } else {
    d = $(document).width();
  }
  d *= 0.9;


  var cantidadCeldas = 8;

  //BORDE
  $('<div id="tablero-borde"></div>').appendTo('body');
  $('#tablero-borde').css('width', d + 'px');
  $('#tablero-borde').css('height', d + 'px');
  //

  //INTERIOR
  $('<div id="casilla-interna"></div>').appendTo('#tablero-borde');
  $('#casilla-interna').css('width', 90 + '%');
  $('#casilla-interna').css('height', 90 + '%');
  $('#casilla-interna').css('margin', 5 + '%');
  //

  //ABAJO
  $('<div id="info" style="text-align:center; font-size:3em;"></div>').appendTo('body');
  //

  //FILAS
  var altoFilas = 0.9 * 100 / cantidadCeldas;
  var marginTopFilas = 0.1 * 100 / (cantidadCeldas);
  var anchoFilas = 100 / 1;
  for (var i = 0; i < cantidadCeldas; i++)

  {
    $('<div class="filas ' + 'fila_' + (i + 1) + '"></div>').appendTo('#casilla-interna');
  }

  $('.filas').each(function() {
    $(this).css('width', anchoFilas + '%');
    $(this).css('height', altoFilas + '%');
    if (!$(this).is(':first-child')) {
      $(this).css('margin-top', marginTopFilas + '%');
    }

  });

  var altoCeldas = 100 / 1;
  var anchoCeldas = 0.9 * 100 / cantidadCeldas;
  var leftCeldas = 0.1 * 100 / (cantidadCeldas);


  for (var i = 0; i < cantidadCeldas; i++)
    for (var j = 1; j <= cantidadCeldas; j++) {
      $('<div class="celdas ' + 'columna_' + (i + 1) + ' "></div>').appendTo('#casilla-interna .filas:nth-child(' + j + ')');
    }

  $('.celdas').each(function() {
    $(this).css('width', anchoCeldas + '%');
    $(this).css('height', altoCeldas + '%');
    if (!$(this).is(':first-child')) {
      $(this).css('margin-left', leftCeldas + '%');
    }
  });

  $('#casilla-interna').children(':last-child').children(':last-child').empty();


});
