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
    this.clearCanvas('#F00');
  }

  clearCanvas(color = '#000') {
    this.tetrisCanvasContext.fillStyle = color;
    this.tetrisCanvasContext.fillRect(0,0,this.tetrisCanvas.width,this.tetrisCanvas.height);
  }

  draw() {
    this.clearCanvas();

    this.drawMatrix(this.arena, {x:0, y:0});                // Draw board
    this.drawMatrix(this.player.matrix, this.player.pos);   // Draw piece
  }

  drawMatrix(matrix, offset) {
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

  render() {
    return (
      <div style={{display:'inline'}}>
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
  finishGame: (player) => {
    dispatch({
      type: 'FINISH_GAME',
      player
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

