import React, { Component } from 'react';
import './board.css';
import { socketHandler, socket } from '../socketCommunication';

class Board extends Component {
  render() {
    return (
      <canvas id="tetris-canvas" width="240" height="400"></canvas>
    );
  }
}

export default Board;

