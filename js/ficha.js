function Ficha(board, i, j) {
  this.pos = [i, j];
  this.status = 'vacio';
  this.element = $("<div class='hueco'>");
  this.element.click(this.selected.bind(this));
  this.element.appendTo(board.element);
  this.parentBoard = board;
}

Ficha.prototype.selected = function() {
  if (this.ficha) {
    this.parentBoard.selectedFicha(this.pos, this.status);
    this.ficha.addClass('selected');
  } else {
    this.parentBoard.clickOnEmpty(this.pos);
  }
};

Ficha.prototype.unselected = function() {
  if (this.ficha) {
    this.ficha.removeClass('selected');
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
