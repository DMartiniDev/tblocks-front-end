import React, { Component } from 'react';
import './board.css';
import { socketHandler, socket } from '../socketCommunication';
import canvasLogic from './canvasLogic';
import { connect } from 'react-redux';
import { finishGame } from '../actions/index';

class Board extends Component {
  componentDidMount() {
  console.log('here we go')
    this.tetrisCanvas = this.refs.tetrisCanvas;
    this.tetrisCanvasContext = this.tetrisCanvas.getContext('2d');
    this.tetrisCanvasContext.scale(20, 20);
    this.clearCanvas('#000');
    this.colors = [
      null,
      '#a000f0',    // T
      '#f0a000',    // L
      '#0000f0',    // J
      '#00f000',    // S
      '#f00000',    // Z
      '#00f0f0',    // L
      '#f0f000'     // O
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.clearCanvas('#000');
    this.drawMatrix(nextProps.boardStatus, {x:0,y:0});
    this.drawMatrix(nextProps.piece.matrix, nextProps.piece.pos);

    return false;
  }

  clearCanvas(color = '#000') {
    this.tetrisCanvasContext.fillStyle = color;
    this.tetrisCanvasContext.fillRect(0,0,this.tetrisCanvas.width,this.tetrisCanvas.height);
  }
  drawBorder(xPos, yPos, width, height, thickness = 1)
  {
    this.tetrisCanvasContext.fillStyle='#000';
    this.tetrisCanvasContext.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
  }
  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.drawBorder(x + offset.x,
            y + offset.y,
            1,
            1,0.01)
          this.tetrisCanvasContext.fillStyle = this.colors[value];
          // this.tetrisCanvasContext.fillStyle = 'lightblue';
          this.tetrisCanvasContext.fillRect(x + offset.x,
            y + offset.y,
            1,
            1);
        }
      })
    })
  }

  render() {
    return (
      <div style={{display:'inline'}}>
        <audio className="music" ref='music' src="tetris.mp3" volume="0.1" loop="loop" autoPlay >
          Error: your web browser does not support this audio player.
        </audio>
        <canvas width="240" height="400" ref="tetrisCanvas"></canvas>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus,
    move: state.move
  }
}

const mapDispatchToProps = (dispatch) => ({
  finishGame: (player) => dispatch(finishGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
