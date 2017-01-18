var Card = require('./classes/Card.js');
var Board = require('./classes/Board.js');
var CardFlippingGame = require('./classes/CardFlippingGame.js');
require('./assets/css/game.styles.css');
require('./assets/css/smaller.screens.css');


/*
* Expose the initialization of Card Flipping Game to the user with options.
*/
window.CardFlippingGame = function(options) {
  var game = new CardFlippingGame(Board, Card, options);
  game.render();
}

/*
* Expose as jQuery plugin
*/
if(typeof jQuery != "undefined") {
  (function ( $ ) {
    $.fn.cardFlippingGame = function(options) {
      options.gameEl = this.attr('id');
      var game = new CardFlippingGame(Board, Card, options)
      game.render();
    };
  }( jQuery ));
}
