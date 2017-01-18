var TemplateEngine = require('./TemplateEngine.js');

var Board = function(size) {
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

  this.render = function(node) {
    var N = _size;
    // Builds array with _size blank elements.  Hack because our template engine can loop over an array but cant do a while or for loop (See line 12)
    var arrayOfLengthGameSize = Array.apply(null, {length: N}).map(Number.call, Number);
    var boardComponent = TemplateEngine(this.getTemplate(), {
      size: _size,
      cards: arrayOfLengthGameSize
    });
    if(node) node.innerHTML = boardComponent;
    return boardComponent;
  }
}

module.exports = Board;
