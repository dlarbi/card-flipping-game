var Modal = function(type, message, action) {

  var _showing = false;

  this.uid = Math.random(0, 1000000);
  this.type = type;
  this.message = message;
  this.action = action;

  this.show = function() {
    _showing = true;
  }

  this.hide = function() {
    _showing = false;
  }

  this.getTemplate = function() {
    return _showing ?
        '<div class="card_flipping_game__modal_content">'+
          '<%this.message%>'+
        '</div>'
      :
        '';
  }
}


module.exports = Modal;
