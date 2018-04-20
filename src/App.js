import React, { Component } from 'react';
import './App.css';
import Board from './containers/board';
import './socketCommunication'

class App extends Component {

  handleKeyPress = (event) => {
    if(event.key === 'ArrowLeft'){
      console.log('Going left...')
    }
    if(event.key === 'ArrowRight'){
      console.log('Going right...')
    }
    if(event.key === 'ArrowUp'){
      console.log('Going up...')
    }
    if(event.key === 'ArrowDown'){
      console.log('Going down...')
    }
    if(event.key === ' '){
      console.log('Spacebar')
    }
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
        <Board />
        <Board />
      </div>
    );
  }
}

export default App;
