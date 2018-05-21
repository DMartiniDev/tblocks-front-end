# TBlocks

Insert Image Here

> TBlocks is a multiplayer tetris-like game

## Running the game

### Online Version

The easiest way to run the game is to use the [online version](https://bit.ly/2rVTPSj) which is already
deployed to a server on the internet.

### Locally

If you want to run the game locally, you'll need to:

* Clone the repository
* Install dependencies using `npm i`
* Start the project using `npm start`
* Enjoy

*Notice*: The game will use the back-end which is already deployed to match you
with other players. If you want to run your own back-end, you'll need to clone
the [back-end repository](https://bit.ly/2LjPctw) as well.


## How to Play

* `Left Arrow`: Move the current piece to the left
* `Right Arrow`: Move the current piece to the right
* `Up Arrow`: Rotate the current piece
* `Down Arrow`: Move the current piece down by one unit
* `Space Bar`: Drop current piece to the bottom of the board

## Future of the game

Looking ahead, there are a few things that I'd like to add to the game. Here
are some of the ideas I want to implement:

* Add preview of the next piece
* Increase speed of the pieces falling based on player's performance
* Add an Attack/Perk system
  * Transfer cleared lines to the other player
  * Apply gravity to the pieces so they drop if there is nothing below them
  * Temporarily double the speed of the opponent's board
  * Temporarily flip upside-down the opponent's board
* Add music to the game

## Built with

* [Express](https://expressjs.com) - Server
* [SocketIO](https://socket.io) - Web socket Communication
* [React](https://reactjs.org) - Front End framework
* [Redux](https://redux.js.org) - State Management
* [HTML Canvas](https://developer.mozilla.org/kab/docs/Web/API/Canvas_API) - Drawing of the boards

## Contributing

If you'd like to contribute to this project, feel free to open a new issue in
this repository so we can get a conversation started. 👍

## Authors

* **Dave Martínez** - [Github](https://github.com/dkm-coder)
