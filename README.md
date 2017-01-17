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

Include bundled game script below the element.

```<script src="/dist/game.bundle.js"></script>```


#### Dependencies

> None, just plain Javascript.

> ~10kb

#### Development Dependencies
* Jest for Unit testing.

```npm test``` will run the tests, independent of build process.
* webpack for bundling/minification
* css-loader and style-loader for combining our CSS stylesheets with our bundle.
* ...
* (See package.json)

#### Stuff used to make this:

* http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line super light weight, 20 line templating engine for javascript!  Passes all the units we need.  Huge helper. :+1:
