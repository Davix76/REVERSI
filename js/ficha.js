function Ficha(board, i, j) {
  this.pos = [i, j];
  this.status = 'vacio';
  this.element = $("<div class='hueco'>");
  this.element.click(this.click.bind(this));
  this.element.appendTo(board.element);
  this.parentBoard = board;
}

Ficha.prototype.click = function() {
  if (!this.ficha) {
    this.parentBoard.clickOnEmpty(this.pos);
  }
};

Ficha.prototype.cambiaColor = function(newColor) {
  if (this.ficha) {
    this.ficha.removeClass(this.status);
    this.status = newColor;
    this.ficha.addClass(this.status);
  } else {
    throw 'ERROR, no se puede cambiar el color, aqui no hay ficha';
  }
};

Ficha.prototype.addFicha = function(type) {
  if (this.status == 'vacio') {
    this.status = type;
    this.ficha = $("<div class='ficha'>").addClass(this.status);
    this.ficha.appendTo(this.element);
  } else {
    throw 'ERROR, no se puede añadir otra ficha en este hueco';
  }
};
