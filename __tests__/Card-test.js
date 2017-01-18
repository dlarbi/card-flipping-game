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
    expect(card.faceUp).toBe(true);
  });

  it('Renders its component correctly when given different data set and turned face up', function() {
    var card = new Card(3);
    card.uid = 1;
    card.faceColor = '#fff';
    card.flip();
    expect(card.render()).toBe("<div class=\"card_flipping_game__card card_flipping_game__card--bigger\" data-uid=\"1\"><div class=\"card_flipping_game__card_face\" style=\"background:#fff;\"><div class=\"card_flipping_game__card_value\">3</div></div></div>");
  })

  it('Renders its component correctly when given different data set and turned face down', function() {
    var card = new Card(15);
    card.uid = 77383;
    card.faceColor = '#aaa';
    expect(card.render()).toBe("<div class=\"card_flipping_game__card\" data-uid=\"77383\"><div class=\"card_flipping_game__card_icon--diamond\"></div></div>");
  })

});
