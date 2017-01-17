var TemplateEngine = require('./TemplateEngine.js');

var CardFlippingGame = function(Board, Card, options) {

  /*
  * Private (indicate private members with "_" as prefix)
  */
  var _board = new Board(options.boardSize, Card);
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

  this.analyzeBoard = function() {
    this.faceUpCards = [];
    if(this.faceUpCards.length < 2) {
      for(var i=0;i<this.cards.length;i++) {
        var card = this.cards[i];
        if(card.faceUp && !card.removed) {
          this.faceUpCards.push(card)
        }
      }
    }

    if(this.faceUpCards.length === 2) {
      var sameValues = this.faceUpCards[0].value === this.faceUpCards[1].value,
          notSameCards = this.faceUpCards[0].uid != this.faceUpCards[1].uid;

      if(sameValues && notSameCards) {
        setTimeout(this.removeFaceupCards.bind(this), options.hideFlipDelay);
      } else {
        setTimeout(this.unflipFaceupCards.bind(this), options.hideFlipDelay);
      }
    }
    this.render();
  }

  this.renderBoard = function() {
    var boardComponent = TemplateEngine(_board.getTemplate(), {
      size: _board.getSize(),
      cards: this.cards
    });
    var gameWrapper = document.getElementById('card_flipping_game');
    if(gameWrapper) gameWrapper.innerHTML = boardComponent;
  }

  this.renderCards = function() {
    var boardSpaceEls = document.getElementsByClassName('card_flipping_game__board_space');
    for(var i=0;i<this.cards.length;i++) {
      var card = this.cards[i];
      var cardComponent = TemplateEngine(card.getTemplate(), {
        uid: card.uid,
        value: card.value,
        faceColor: card.faceColor
      });
      if(boardSpaceEls[i]) boardSpaceEls[i].innerHTML = cardComponent;
    }
  }

  this.bindEvents = function() {
    var cardEls = document.getElementsByClassName('card_flipping_game__card');
    for (var i = 0; i < cardEls.length; i++) {
      cardEls[i].addEventListener('click', this.playCard.bind(this, this.cards[i]), false);
    }
  }
}

module.exports = CardFlippingGame;
