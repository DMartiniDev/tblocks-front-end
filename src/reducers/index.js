import {START_GAME, FINISH_GAME, UPDATE_CLIENT_BOARD, UPDATE_CLIENT_STATUS, UPDATE_PLAYER_COUNT, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, DROP_DOWN, ROTATE  } from "../constants/action-types";


const initialState = {
  gameStatus: 'Playing',
  message: null,
  move: null,
  playerCount: 0,
  availablePlayers: [],
  clientStatus: 'welcome',
  player01: null,
  player02: null,
  playerBoard: null,
  opponentBoard: null,
  playerPiece: null,
  opponentPiece: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_GAME:
    return state;
  case 'UPDATE_LIST_OF_PLAYERS':
    return {
      ...state,
      playerCount: action.playerCount,
    }

  case UPDATE_CLIENT_BOARD:
  if (state.player01.id === action.data.playerID) {
    return {
      ...state,
      playerBoard: action.data.board,
      playerPiece: action.data.player
    }
  } else {
    return {
      ...state,
      opponentBoard: action.data.board,
      opponentPiece: action.data.player
    }
  }


  case UPDATE_CLIENT_STATUS:
    return {
      ...state,
      clientStatus: action.data.status,
      player01: action.data.player,
      player02: action.data.opponent
    }

  case UPDATE_PLAYER_COUNT:
    return {
      ...state,
      playerCount: action.playerCount
    }
  case  MOVE_LEFT:
    return {
      ...state,
      move: 'left'
    }
  case MOVE_RIGHT:
    return {
      ...state,
      move: 'right'
    }
  case ROTATE:
    return {
      ...state,
      move: 'rotate'
    }
  case MOVE_DOWN:
    return {
      ...state,
      move: 'down'
    }
  case DROP_DOWN:
    return {
      ...state,
      move: 'drop'
    }
  case FINISH_GAME:
    if (state.gameStatus === 'Game Over') {
      return {
        ...state
      }
    } else {
      return {
        ...state,
        gameStatus: 'Game Over',
        message: action.data
      };
    }
  default:
    return state;
  }
};

export default rootReducer;
