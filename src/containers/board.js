import React, { Component } from 'react';
import './board.css';
import { socketHandler, socket } from '../socketCommunication';
import canvasLogic from './canvasLogic';
import { connect } from 'react-redux';

class Board extends Component {
  componentDidMount() {
    this.tetrisCanvas = this.refs.tetrisCanvas;
    this.tetrisCanvasContext = this.tetrisCanvas.getContext('2d');
    this.tetrisCanvasContext.scale(20, 20);

  /**
   * Object that contains a multidimensional array with all the positions of the
   * board. It uses 1s to represent a taken position and 0 to represent an empty
   * position.
   */
  this.arena = this.createMatrix(12, 20);

  /**
   * Object representing the information of the player:
   *   - position of the current piece
   *   - The shape of the current piece
   *   - Player's score
   *   - Game Status
   */
  this.player = {
    pos: {
      x: 4,
      y: 0
    },
    matrix: null,
    score: 0,
  }

  this.dropCounter = 0;
  this.dropInterval = 80;          // Amount of miliseconds before a piece drops
  this.lastTime = 0;

    // Initialisation of the game
    this.playerReset();
    // this.updateScore();
    this.update();
  }

  /**
   * List of colors for the different pieces
   */
  colors = [
    null,
    '#a000f0',    // T
    '#f0a000',    // L
    '#0000f0',    // J
    '#00f000',    // S
    '#f00000',    // Z
    '#00f0f0',    // L
    '#f0f000'     // O
  ];

  // ---------------------- Update Canvas ----------------------------------- //

  clearCanvas = (color = '#000') => {
    this.tetrisCanvasContext.fillStyle = color;
    this.tetrisCanvasContext.fillRect(0,0,this.tetrisCanvas.width,this.tetrisCanvas.height);
  }

  draw = () => {
    this.clearCanvas();

    this.drawMatrix(this.arena, {x:0, y:0});
    this.drawMatrix(this.player.matrix, this.player.pos);
  }

  drawMatrix = (matrix, offset) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.tetrisCanvasContext.fillStyle = this.colors[value];
          this.tetrisCanvasContext.fillRect(x + offset.x,
            y + offset.y,
            1,
            1);
        }
      })
    })
  }

  // --------------------- Helper Functions --------------------------------- //

  createMatrix = (width, height) => {
    const matrix = [];
    while (height--) {
      matrix.push(new Array(width).fill(0));
    }
    return matrix;
  }

  merge = (arena, player) => {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      })
    })
  }

  // ----------------------- GAME LOGIC ------------------------------------- //

  arenaSweep = () => {
    let rowCount = 1;
    outer: for (let y = this.arena.length -1; y > 0; --y) {
      for (let x = 0; x < this.arena[y].length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = this.arena.splice(y, 1)[0].fill(0);
      this.arena.unshift(row);
      ++y;

      this.player.score += rowCount*10;
      // The following is used to give more points based on the amount of lines cleared in one go
      // rowCount *= 2;

    }
  }

  collide = (arena, player) => {
    const [m, o] = [player.matrix, player.pos];

    for (let y=0; y < m.length; y++) {
      for (let x=0;x< m[y].length; ++x) {
        if (m[y][x] !== 0 && (arena[y + o.y] && arena[y+o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
  }

  playerDrop = () => {
    this.player.pos.y++;
    if (this.collide(this.arena, this.player)) {
      this.player.pos.y--;
      this.merge(this.arena, this.player);
      this.playerReset();
      this.arenaSweep();
      // this.updateScore();
    }
    this.dropCounter = 0;
  }

  playerDropToBottom = () => {
    while (!this.collide(this.arena, this.player)) {
      this.player.pos.y++;
    }
    this.player.pos.y--;
    this.merge(this.arena, this.player);
    this.playerReset();
    this.arenaSweep();
    this.updateScore();
    this.dropCounter = 0;
  }

  playerRotate = (dir) => {
    this.rotate(this.player.matrix, dir);

    // Deal with collisions
    const pos = this.player.pos.x;
    let offset = 1;
    while (this.collide(this.arena, this.player)) {
      this.player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1: -1));
      if (offset > this.player.matrix[0].length) {
        this.rotate(this.player.matrix, -dir);
        this.player.pos.x = pos;
        return;
      }
    }
  }

  rotate = (matrix, direction) => {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < y; x++) {
        [
          matrix[x][y],
          matrix[y][x],
        ] = [
          matrix[y][x],
          matrix[x][y],
        ];
      }
    }

    if (direction > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  playerReset = () => {
    const pieces = 'ILJOTSZ';
    this.player.matrix = this.createPiece(pieces[Math.floor(pieces.length * Math.random())]);
    this.player.pos.y = 0;
    this.player.pos.x = (this.arena[0].length / 2 | 0) - (Math.floor(this.player.matrix[0].length / 2));

    if (this.collide(this.arena, this.player)) {
      // GAME OVER LOGIC
      this.props.finishGame(this.props.player);
      this.player.score = 0;
      //this.updateScore();
    }
  }

  playerMove = (direction) => {
    this.player.pos.x += direction;

    if(this.collide(this.arena, this.player)) {
      this.player.pos.x -= direction;
    }
  }

  createPiece = (type) => {
    if (type === 'T') {
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];
    }

    if (type === 'L') {
      return [
        [0,2,0],
        [0,2,0],
        [0,2,2]
      ]
    }

    if (type === 'J') {
      return [
        [0,3,0],
        [0,3,0],
        [3,3,0]
      ]
    }

    // z
    if (type === 'Z') {
      return [
        [0,4,4],
        [4,4,0],
        [0,0,0]
      ]
    }

    // s
    if (type === 'S') {
      return [
        [5,5,0],
        [0,5,5],
        [0,0,0]
      ]
    }

    if (type === 'I') {
      return [
        [0, 0, 6, 0, 0],
        [0, 0, 6, 0, 0],
        [0, 0, 6, 0, 0],
        [0, 0, 6, 0, 0],
        [0, 0, 6, 0, 0]
      ]
    }

    if (type === 'O') {
      return [
        [7,7],
        [7,7]
      ]
    }
  }

  update = (time=0) => {
    if (this.props.gameStatus === 'Game Over') {
      return;
    }

    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;

    if (this.dropCounter > this.dropInterval ) {
      this.playerDrop();
    }

    this.draw();
    requestAnimationFrame(this.update);
  }

  // ------------------------------------------------------------------------ //

  render() {
    return (
      <canvas width="240" height="400" ref="tetrisCanvas"></canvas>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus
  }
}

const mapDispatchToProps = (dispatch) => ({
  finishGame: (player) => {
    dispatch({
      type: 'FINISH_GAME',
      player
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

