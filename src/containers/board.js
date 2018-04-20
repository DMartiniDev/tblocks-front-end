import React, { Component } from 'react';
import './board.css';
import { socketHandler, socket } from '../socketCommunication';

class Board extends Component {
  componentDidMount() {
    this.tetrisCanvasContext = this.refs.tetrisCanvas.getContext('2d');
  }

  render() {
    return (
      <canvas width="240" height="400" ref="tetrisCanvas"></canvas>
    );
  }
}

export default Board;

