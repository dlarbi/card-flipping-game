var TemplateEngine = require('./classes/TemplateEngine.js');
var Card = require('./classes/Card.js');
var Board = require('./classes/Board.js');
require('./assets/css/game.styles.css');

var CardFlippingGame = function(Board, Card, options) {

  /*
  * Private (indicate private members with "_" as prefix)
  */
  var _board = new Board(options.boardSize, Card);
  var _faceUpCards = [];
  var _removedCount = 0;
  var _cards = (function() {
    var cards = [];
    var cardValues = generateCardValues(_board.getSize());
    for(var i=0;i<cardValues.length;i++) {
      cards.push(new Card(cardValues[i]));
    }

    function generateCardValues(boardSize) {
      var result = [];
      for(var i=0;i<2;i++) {
        for(var j=1;j<=boardSize/2;j++) {
          result.push(j);
        }
      }
      return result;
    }

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    return shuffleArray(cards);
  })();

  /*
  * Public
  */
  this.render = function() {
    this.renderBoard();
    this.renderCards();
    this.bindEvents();
    if(_removedCount === _board.getSize()) {
      alert('You win!');
    }
  }

  this.playCard = function(card) {
    card.flip();
    this.analyzeBoard();
    this.render();
  }

  this.unflipFaceupCards = function() {
    _faceUpCards.forEach(function(card, i, cards) {
      card.flip();
    })
    _faceUpCards = [];
  }

  this.removeFaceupCards = function() {
    _faceUpCards.forEach(function(card, i, cards) {
      card.remove();
      _removedCount++;
    })
    _faceUpCards = [];
  }

  this.analyzeBoard = function() {
    _faceUpCards = [];
    if(_faceUpCards.length < 2) {
      for(var i=0;i<_cards.length;i++) {
        var card = _cards[i];
        if(card.faceUp && !card.removed) {
          _faceUpCards.push(card)
        }
      }
    }

    if(_faceUpCards.length === 2) {
      var sameValues = _faceUpCards[0].value === _faceUpCards[1].value,
          notSameCards = _faceUpCards[0].uid != _faceUpCards[1].uid;

      if(sameValues && notSameCards) {
        this.removeFaceupCards();
      } else {
        this.unflipFaceupCards();
      }
    }
  }

  this.renderBoard = function() {
    var boardComponent = TemplateEngine(_board.getTemplate(), {
      size: _board.getSize(),
      cards: _cards
    });
    var gameWrapper = document.getElementById('card_flipping_game');
    gameWrapper.innerHTML = boardComponent;
  }

  this.renderCards = function() {
    var boardSpaceEls = document.getElementsByClassName('card_flipping_game__board_space');
    for(var i=0;i<_cards.length;i++) {
      var card = _cards[i];
      var cardComponent = TemplateEngine(card.getTemplate(), {
        uid: card.uid,
        value: card.value,
        faceColor: card.faceColor
      });
      boardSpaceEls[i].innerHTML = cardComponent;
    }
  }

  this.bindEvents = function() {
    var cardEls = document.getElementsByClassName('card_flipping_game__card');
    for (var i = 0; i < cardEls.length; i++) {
      cardEls[i].addEventListener('click', this.playCard.bind(this, _cards[i]), false);
    }
  }
}

var cardFlippingGame = new CardFlippingGame(Board, Card, {
  boardSize: 24
});

cardFlippingGame.render();
