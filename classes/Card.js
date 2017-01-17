var TemplateEngine = require('./TemplateEngine.js');

var color_codes = {};
function stringToColorCode(str) {
  return (str in color_codes) ? color_codes[str] : (color_codes[str] = '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6));
}

var Card = function(value) {

  this.uid = Math.random(0, 1000000);
  this.value = value;
  this.faceUp = false;
  this.removed = false;
  this.faceColor = stringToColorCode(this.value.toString());

  this.flip = function() {
    this.faceUp = !this.faceUp;
  }

  this.remove = function() {
    this.removed = true;
  }

  this.getTemplate = function() {
    return this.removed ?
        '<div class="card_flipping_game__card" data-uid="<%this.uid%>">'+
          '<img src="assets/images/check.png" class="card_flipping_game__card_icon--smaller"/>'+
        '</div>'
      : this.faceUp ?
        '<div class="card_flipping_game__card card_flipping_game__card--bigger" data-uid="<%this.uid%>">'+
          '<div class="card_flipping_game__card_face" style="background:<%this.faceColor%>;">'+
            '<div class="card_flipping_game__card_value"><%this.value%></div>'+
          '</div>'+
        '</div>'
      :
        '<div class="card_flipping_game__card" data-uid="<%this.uid%>">'+
          '<img src="assets/images/crown-icon.png" class="card_flipping_game__card_icon"/>'+
        '</div>';
  }

  this.render = function(node) {
    var cardComponent = TemplateEngine(this.getTemplate(), {
      uid: this.uid,
      value: this.value,
      faceColor: this.faceColor
    });
    node.innerHTML = cardComponent
  }
}


module.exports = Card;
