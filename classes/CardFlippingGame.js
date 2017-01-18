var TemplateEngine = require('./TemplateEngine.js');

var CardFlippingGame = function(Board, Card, options) {

  /*
  * Private (indicate private members with "_" as prefix)
  */
  var _board = new Board(options.boardSize);
  var _removedCount = 0;

  /*
  * Public.
  */
  this.cards = (function() {
    var cards = [];
    var cardValues = generateCardValues(_board.getSize());
    for(var i=0;i<cardValues.length;i++) {
      cards.push(new Card(cardValues[i]));
    }

    function generateCardValues(boardSize) {
      var values = [];
      for(var j=1;j<=boardSize/2;j++) {
        values.push(j);
      }
      var dup = values.slice(0);
      var result = values.concat(dup);
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

  this.faceUpCards = [];

  this.render = function() {
    this.renderBoard();
    this.renderCards();
    this.bindEvents();
    if(_removedCount === _board.getSize()) {
      alert('You win! Play again.');
      location.reload();
    }
  }

  this.playCard = function(card) {
    if(this.faceUpCards.length < 2) {
      card.flip();
      this.analyzeBoard();
      this.render();
    }
  }

  this.unflipFaceupCards = function() {
    this.faceUpCards.forEach(function(card, i, cards) {
      card.flip();
    })
    this.faceUpCards = [];
    this.render();
  }

  this.removeFaceupCards = function() {
    this.faceUpCards.forEach(function(card, i, cards) {
      card.remove();
      _removedCount++;
    })
    this.faceUpCards = [];
    this.render();
  }

  this.getRemovedCount = function() {
    return _removedCount;
  }

  this.analyzeBoard = function() {
    this.faceUpCards = [];
    for(var i=0;i<this.cards.length;i++) {
      var card = this.cards[i];
      if(card.faceUp && !card.removed) {
        this.faceUpCards.push(card)
      }
    }

    if(this.faceUpCards.length === 2) {
      var sameValues = this.faceUpCards[0].value === this.faceUpCards[1].value,
          notSameCards = this.faceUpCards[0].uid != this.faceUpCards[1].uid;

      var gameAction = sameValues && notSameCards ? this.removeFaceupCards.bind(this) : this.unflipFaceupCards.bind(this);
      setTimeout(gameAction, options.hideFlipDelay);
    }
    this.render();
  }

  this.renderBoard = function() {
    var gameWrapper = document.getElementById(options.gameEl);
    if(gameWrapper) _board.render(gameWrapper);
  }

  this.renderCards = function() {
    var boardSpaceEls = document.getElementsByClassName('card_flipping_game__board_space');
    for(var i=0;i<this.cards.length;i++) {
      if(boardSpaceEls[i]) this.cards[i].render(boardSpaceEls[i]);
    }
  }

  this.bindEvents = function() {
    var cardEls = document.getElementsByClassName('card_flipping_game__card');
    for (var i = 0; i < cardEls.length; i++) {
      var eventType = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
      cardEls[i].addEventListener(eventType, this.playCard.bind(this, this.cards[i]), false);
    }
  }
}

module.exports = CardFlippingGame;
