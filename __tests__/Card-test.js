var Card = require('../classes/Card');
describe('Card', function() {

  it('A new card is facedown', function() {
    var card = new Card(3);
    expect(card.faceUp).toBe(false);
  });

  it('A facedown card that is flipped is now faceup', function() {
    var card = new Card(3);
    card.faceUp = false;
    card.flip();
    expect(card.faceUp).toBe(true)
  });

});
