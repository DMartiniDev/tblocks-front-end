const initialState = {
  gameStatus: 'Playing',
  loser: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'START_GAME':
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
