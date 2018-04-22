import React, { Component } from 'react';
import './App.css';
import Board from './containers/board';
import { socketHandler } from './socketCommunication';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();
    socketHandler['playersOnline']((playerCount) => {
      this.props.updatePlayerCount(playerCount);
    });
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
        {/* <Board player={this.player01} />
        <Board player={this.player02} /> */}
        <h1 style={{color: 'white'}}>Welcome to TELTRIS</h1>
        <p style={{color: 'white'}}>Players online: {this.props.playerCount}</p>
        <p style={{color: 'white'}}>Enter your name:</p>
        <input placeholder="Name" />
        <br />
        <br />
        <button>LOOK FOR AN OPPONENT</button>
        {this.showGameResults()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus,
    loser: state.loser,
    playerCount: state.playerCount
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGame: () => {
    dispatch({
      type: 'START_GAME'
    })
  },

  updatePlayerCount: (playerCount) => {
    dispatch({
      type: 'UPDATE_PLAYER_COUNT',
      playerCount: playerCount
    })
  },

  requestMoveLeft: () => {
    dispatch({
      type: 'MOVE_LEFT'
    })
  },

  requestMoveRight: () => {
    dispatch({
      type: 'MOVE_RIGHT'
    })
  },

  requestMoveDown: () => {
    dispatch({
      type: 'MOVE_DOWN'
    })
  },

  requestDropDown: () => {
    dispatch({
      type: 'DROP_DOWN'
    })
  },

  requestRotate: () => {
    dispatch({
      type: 'ROTATE'
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);