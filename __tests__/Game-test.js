var CardFlippingGame = require('../classes/CardFlippingGame');
describe('Card', function() {

  it('Only 2 cards can be faceup at a time', function() {
    var Card = require('../classes/Card.js');
    var Board = require('../classes/Board.js');
    var CardFlippingGame = require('../classes/CardFlippingGame.js');

    var cardFlippingGame = new CardFlippingGame(Board, Card, {
      boardSize: 24,
      hideFlipDelay: 800
    });

    cardFlippingGame.render();
    cardFlippingGame.playCard(cardFlippingGame.cards[0])
    cardFlippingGame.playCard(cardFlippingGame.cards[1])
    cardFlippingGame.playCard(cardFlippingGame.cards[2])

    expect(cardFlippingGame.faceUpCards.length).toBe(2);
  });


});
