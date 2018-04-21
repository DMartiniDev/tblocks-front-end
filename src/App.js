import React, { Component } from 'react';
import './App.css';
import Board from './containers/board';
import './socketCommunication'
import { connect } from 'react-redux';

class App extends Component {

  handleKeyPress = (event) => {
    if(event.key === 'ArrowLeft'){
      this.props.requestMoveLeft();
    }
    if(event.key === 'ArrowRight'){
      this.props.requestMoveRight();
    }
    if(event.key === 'ArrowUp'){
      this.props.requestRotate();
    }
    if(event.key === 'ArrowDown'){
      this.props.requestMoveDown();
    }
    if(event.key === ' '){
      this.props.requestDropDown();
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