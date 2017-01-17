var TemplateEngine = require('../classes/TemplateEngine');
describe('TemplateEngine', function() {

  it('Creates HTML string from object and template', function() {
    var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
    expect(TemplateEngine(template, {
        name: "Dean Larbi",
        profile: { age: 26 }
    })).toBe("<p>Hello, my name is Dean Larbi. I'm 26 years old.</p>");
  });

});
