var CardFlippingGame = require('../classes/CardFlippingGame');
jest.useFakeTimers();


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

  it('Removes faceup cards after hideFlipDelay', function() {
    var Card = require('../classes/Card.js');
    var Board = require('../classes/Board.js');
    var CardFlippingGame = require('../classes/CardFlippingGame.js');

    var cardFlippingGame = new CardFlippingGame(Board, Card, {
      boardSize: 24,
      hideFlipDelay: 800
    });

    cardFlippingGame.render();
    cardFlippingGame.playCard(cardFlippingGame.cards[0])

    for(var i=1;i<cardFlippingGame.cards.length;i++) {
      if(cardFlippingGame.cards[0].value == cardFlippingGame.cards[i].value) {
        cardFlippingGame.playCard(cardFlippingGame.cards[i]);
      }
    }

    expect(cardFlippingGame.faceUpCards.length).toBe(2);
    jest.runAllTimers();
    expect(cardFlippingGame.faceUpCards.length).toBe(0);
  });


});
