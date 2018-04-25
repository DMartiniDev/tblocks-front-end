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
      this.props.updateClientStatus(data);
    });

    socketHandler['updateBoard']((data) => {
      this.props.updateClientBoard(data);
    });

    socketHandler['finishGame']((data) => {
      this.props.finishGame(data);
    });

  }

  handleKeyPress = (event) => {
    if(event.key === 'ArrowLeft'){
      socketHandler['keyPressed']({"key":'left', "player": this.props.player01});
      this.props.requestMoveLeft();
    }
    if(event.key === 'ArrowRight'){
      socketHandler['keyPressed']({"key":'right', "player": this.props.player01});
      this.props.requestMoveRight();
    }
    if(event.key === 'ArrowUp'){
      socketHandler['keyPressed']({"key":'up', "player": this.props.player01});
      this.props.requestRotate();
    }
    if(event.key === 'ArrowDown'){
      socketHandler['keyPressed']({"key":'down', "player": this.props.player01});
      this.props.requestMoveDown();
    }
    if(event.key === ' '){
      socketHandler['keyPressed']({"key":'spacebar', "player": this.props.player01});
      this.props.requestDropDown();
    }
  }

  showGameResults() {
    if (this.props.gameStatus === 'Game Over') {
      return (
        <p style={{color: 'white'}}>{this.props.message}</p>
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
      return (
        <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
          <p style={{color: 'white'}}>Waiting for opponent</p>
        </div>
      );
    } else if (this.props.clientStatus === 'pair') {
      return (
        <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
          <p style={{color: 'white'}}>{this.props.player01.name}, you've been paired with {this.props.player02.name}</p>
          <Board player={this.props.player01} boardStatus={this.props.playerBoard} piece={this.props.playerPiece}/>
          <Board player={this.props.player02} boardStatus={this.props.opponentBoard} piece={this.props.opponentPiece}/>
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
    message: state.message,
    playerCount: state.playerCount,
    clientStatus: state.clientStatus,
    player01: state.player01,
    player02: state.player02,
    playerBoard: state.playerBoard,
    opponentBoard: state.opponentBoard,
    playerPiece: state.playerPiece,
    opponentPiece: state.opponentPiece
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGame: () => {
    dispatch({
      type: 'START_GAME'
    })
  },

  finishGame: (data) => {
    dispatch({
      type: 'FINISH_GAME',
      data: data
    })
  },

  updateClientBoard: (data) => {
    dispatch({
      type: 'UPDATE_CLIENT_BOARD',
      data: data
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