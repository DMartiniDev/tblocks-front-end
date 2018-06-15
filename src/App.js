import React, { Component } from 'react';
import { startGame, finishGame, updateClientBoard, updateClientStatus, updatePlayerCount, requestMoveLeft, requestMoveRight, requestMoveDown, requestDropDown, requestRotate  } from "./actions/index";
import './App.css';
import ReactDOM from 'react-dom';
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

  focusDiv() {
    console.log('Clicking on board');
    ReactDOM.findDOMNode(this.refs.board).click();
    ReactDOM.findDOMNode(this.refs.board).focus();
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
          <h1 style={{color: 'white'}}>Welcome to TBlocks</h1>
          <p style={{color: 'white'}}>Players online: {this.props.playerCount}</p>
          <input placeholder="Enter your name" ref="name"/>
          <br />
          <br />
          <button onClick={this.lookForAnOpponentClicked.bind(this)}>Look for an opponent</button>
        </div>
      );
    } else if (this.props.clientStatus === 'wait') {
      return (
        <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
          <p style={{color: 'white'}}>Waiting for opponent</p>
        </div>
      );
    } else if (this.props.clientStatus === 'pair') {
      setTimeout(() => {
        this.focusDiv();
      },1500);

      return (
        <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0" ref="board">
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
    startGame: () => dispatch(startGame()),
    finishGame: (data) => dispatch(finishGame(data)),
    updateClientBoard: (data) => dispatch(updateClientBoard(data)),
    updateClientStatus: (data) => dispatch(updateClientStatus(data)),
    updatePlayerCount: (playerCount) => dispatch(updatePlayerCount(playerCount)),
    requestMoveLeft: () => dispatch(requestMoveLeft()),
    requestMoveRight: () => dispatch(requestMoveRight()),
    requestMoveDown: () => dispatch(requestMoveDown()),
    requestDropDown: () => dispatch(requestDropDown()),
    requestRotate: () => dispatch(requestRotate())

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
