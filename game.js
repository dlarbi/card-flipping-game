var Card = require('./classes/Card.js');
var Board = require('./classes/Board.js');
var CardFlippingGame = require('./classes/CardFlippingGame.js');
require('./assets/css/game.styles.css');
require('./assets/css/smaller.screens.css');

var cardFlippingGame = new CardFlippingGame(Board, Card, {
  boardSize: 24,
  hideFlipDelay: 800
});

cardFlippingGame.render();
