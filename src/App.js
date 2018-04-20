import React, { Component } from 'react';
import './App.css';
import Board from './containers/board';
import './socketCommunication'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
        <Board />
      </div>
    );
  }
}

export default App;
