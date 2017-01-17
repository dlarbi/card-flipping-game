var Board = function(size, Card) {
  var _size = size;

  this.getSize = function() {
    return _size;
  }

  this.getTemplate = function() {
    return '<div class="card_flipping_game__board">'+
              '<%for(var i in this.cards) {%>' +
                '<div class="card_flipping_game__board_space"></div>' +
              '<%}%>' +
           '</div>'

  }
}

module.exports = Board;
