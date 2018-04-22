const initialState = {
  gameStatus: 'Playing',
  loser: null,
  move: null,
  playerCount: 0,
  availablePlayers: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'START_GAME':
    return state;
  case 'UPDATE_LIST_OF_PLAYERS':
    return {
      ...state,
      playerCount: action.playerCount
    }
  case 'UPDATE_PLAYER_COUNT':
    return {
      ...state,
      playerCount: action.playerCount
    }
  case 'MOVE_LEFT':
    return {
      ...state,
      move: 'left'
    }
  case 'MOVE_RIGHT':
    return {
      ...state,
      move: 'right'
    }
  case 'ROTATE':
    return {
      ...state,
      move: 'rotate'
    }
  case 'MOVE_DOWN':
    return {
      ...state,
      move: 'down'
    }
  case 'DROP_DOWN':
    return {
      ...state,
      move: 'drop'
    }
  case 'FINISH_GAME':
    return {
      ...state,
      gameStatus: 'Game Over',
      loser: action.player.name
    };
  default:
    return state;
  }
};

export default rootReducer;
