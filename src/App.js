import React, { Component } from 'react';
import './App.css';
import Board from './containers/board';
import './socketCommunication'
import { connect } from 'react-redux';

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

  player01 = {
    name: 'Player 01'
  };

  player02 = {
    name: 'Player 02'
  };

  showGameResults() {
    if (this.props.gameStatus === 'Game Over') {
      return (
        <p style={{color: 'white'}}>Apparently, {this.props.loser} has lost the game</p>
      )
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
        <Board player={this.player01} />
        <Board player={this.player02} />
        <div>
          <button onClick={this.props.startGame}>START GAME</button>
        </div>
        {this.showGameResults()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus,
    loser: state.loser
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGame: () => {
    dispatch({
      type: 'START_GAME'
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);