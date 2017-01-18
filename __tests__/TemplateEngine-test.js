var TemplateEngine = require('../classes/TemplateEngine');
describe('TemplateEngine', function() {

  it('Creates HTML string from object and template', function() {
    var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
    expect(TemplateEngine(template, {
        name: "Dean Larbi",
        profile: { age: 26 }
    })).toBe("<p>Hello, my name is Dean Larbi. I'm 26 years old.</p>");
  });

  it('Correctly builds card component given string and arguments', function() {
    var template = '<div class="card_flipping_game__card card_flipping_game__card--bigger" data-uid="<%this.uid%>">'+
                    '<div class="card_flipping_game__card_face" style="background:<%this.faceColor%>;">'+
                      '<div class="card_flipping_game__card_value"><%this.value%></div>'+
                    '</div>'+
                  '</div>';

    expect(TemplateEngine(template, {
        uid:1,
        faceColor:'#fff',
        value:3
    })).toBe("<div class=\"card_flipping_game__card card_flipping_game__card--bigger\" data-uid=\"1\"><div class=\"card_flipping_game__card_face\" style=\"background:#fff;\"><div class=\"card_flipping_game__card_value\">3</div></div></div>");
  });

  it('Correctly builds board component given string and arguments', function() {
    var template = '<div class="card_flipping_game__board">'+
                      '<%for(var i in this.cards) {%>' +
                        '<div class="card_flipping_game__board_space"></div>' +
                      '<%}%>' +
                   '</div>';


    expect(TemplateEngine(template, {
        cards:[]
    })).toBe("<div class=\"card_flipping_game__board\"></div>");
  });

});
