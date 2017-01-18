# Card Flipping Memory Game

#### To get example up and running:

 * ```git clone https://github.com/dlarbi/card-flipping-game.git```
 * ```npm install```
 * ```npm run build:dev``` runs Unit tests and builds unminified bundle in /dist/game.bundle.js **OR** ```npm run build:production``` runs Unit tests and builds uglified+minified bundle

* Open **/card-flipping-app/index.html** in your browser

(Note: If you don't wan't to run the tests or the build process, you can simply download the archive and visit the index.html file in your browser.  The minified game is included in the repo at **/dist/game.bundle.js**, and is already linked to index.html.  You can open index.html in your browser to run the game.)

#### Usage

If you want to add this game to a webpage.  Add this element in your HTML markup:

```<div id="game_wrapper" class="card_flipping_game"></div>```

Include bundled game script below the element:

```<script src="/dist/game.bundle.js"></script>```

Initialize game:
* As a jQuery Plugin
```
$('#game_wrapper').cardFlippingGame({
	boardSize: 24,
	hideFlipDelay: 800
})
```
* Without jQuery
```    
CardFlippingGame({
	boardSize: 24,     		//Number of cards in the game
	hideFlipDelay: 800, 	//Time for cards to be removed or flip back over
    gameEl: 'game_wrapper'	//Id of element in which the game should be rendered
})
```


#### Dependencies

> None, just plain Javascript.

> ~11kb

#### Development Dependencies
* Jest for Unit testing.

```npm test``` will run the tests, independent of build process.
* webpack for bundling/minification
* css-loader and style-loader for combining our CSS stylesheets with our bundle.
* ...
* (See package.json)

#### Patterns/ideas

* CSS is patterned using the BEM methodology.  For reference: https://en.bem.info/methodology/


* /classes/Card.js and /classes/Board.js are components similar to the thought process found in React components, Vue components, et al.  Each component has a set of properties to describe the component's state, methods to act upon those properties, and a render method to decide an HTML markup based on the properties, which renders to a given DOM element.  There is no virtual DOM/diffing, or binding of component.render() methods to data change events, so each component is re-rendered when it's render method is called explicitly in the Controller.  For example, a card can do things like this (pseudocode):

```
var card = new Card(2);
//card.faceUp == false
card.flip();
//card.faceUp == true
card.render(DOMNode)
// => <div class="card face-up">Value is 2</div> rendered in DOMNode

```
* /classes/CardFlippingGame.js is essentially a controller.  It is responsible for holding a collection of Cards and a Board, binding click/touch events to elements, and calling methods that manipulate our Card and Board components.  A good place to see its responsibilities, is by examples in our Tests.

```
// Test name: 'Only 2 cards can be faceup at a time'
// (See __tests__/Game-test.js for full version)

    var CardFlippingGame = require('../classes/CardFlippingGame.js');
    var cardFlippingGame = new CardFlippingGame(Board, Card, {
    	boardSize: 24,
    	hideFlipDelay: 800
    });
    cardFlippingGame.playCard(cardFlippingGame.cards[0])
    cardFlippingGame.playCard(cardFlippingGame.cards[1])
    cardFlippingGame.playCard(cardFlippingGame.cards[2])

    expect(cardFlippingGame.faceUpCards.length).toBe(2);

```


#### Stuff used to make this:

* http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line super light weight, 20 line templating engine for javascript!  Passes all the units we need.  Huge helper. :+1:
