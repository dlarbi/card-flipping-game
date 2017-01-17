var Card = function(value) {
  
  /*
  * Private (indicate private members with "_" as prefix)
  */
  var _stringToColorCode = function(str) {
    var color_codes = {};
    return (str in color_codes) ? color_codes[str] : (color_codes[str] = '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6));
  }

  this.uid = Math.random(0, 1000000);
  this.value = value;
  this.faceUp = false;
  this.removed = false;
  this.faceColor = _stringToColorCode(this.value.toString());

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
}


module.exports = Card;
