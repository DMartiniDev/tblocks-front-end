const initialState = {
  gameStatus: 'Playing',
  loser: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'START_GAME':
    return state;
  case 'MOVE_LEFT':
    return state;
  case 'MOVE_RIGHT':
    return state;
  case 'ROTATE':
    return state;
  case 'MOVE_DOWN':
    return state;
  case 'DROP_DOWN':
    return state;
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
