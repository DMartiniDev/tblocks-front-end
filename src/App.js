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

    socketHandler['updateClient']((data) => {
      console.log('Status has been changed with:', data);
      this.props.updateClientStatus(data);
    })
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

  lookForAnOpponentClicked() {
    socketHandler['makePlayerAvailable'](this.refs.name.value)
  }

  renderView() {
    if (this.props.clientStatus === 'welcome') {
      return (
        <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
          <h1 style={{color: 'white'}}>Welcome to TELTRIS</h1>
          <p style={{color: 'white'}}>Players online: {this.props.playerCount}</p>
          <p style={{color: 'white'}}>Enter your name:</p>
          <input placeholder="Name" ref="name"/>
          <br />
          <br />
          <button onClick={this.lookForAnOpponentClicked.bind(this)}>LOOK FOR AN OPPONENT</button>
        </div>
      );
    } else if (this.props.clientStatus === 'wait') {
      return (<p style={{color: 'white'}}>Waiting for opponent</p>);
    } else if (this.props.clientStatus === 'pair') {
      return (
        <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
          <p style={{color: 'white'}}>{this.props.player01.name}, you've been paired with {this.props.player02.name}</p>
          <Board player={this.player01} />
          <Board player={this.player02} />
          {this.showGameResults()}
        </div>
      );
    } else {
      return (<p style={{color: 'white'}}>Something unexpected happened</p>);
    }
  }

  render() {
    return this.renderView()
  }
}

const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus,
    loser: state.loser,
    playerCount: state.playerCount,
    clientStatus: state.clientStatus,
    player01: state.player01,
    player02: state.player02
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGame: () => {
    dispatch({
      type: 'START_GAME'
    })
  },

  updateClientStatus: (data) => {
    dispatch({
      type: 'UPDATE_CLIENT_STATUS',
      data: data
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