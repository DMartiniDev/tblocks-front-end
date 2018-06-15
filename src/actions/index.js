import {START_GAME, FINISH_GAME, UPDATE_CLIENT_BOARD, UPDATE_CLIENT_STATUS, UPDATE_PLAYER_COUNT, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, DROP_DOWN, ROTATE  } from "../constants/action-types";

export function startGame () {
    return {
      type: START_GAME,
    }
}
export function finishGame (data) {
    return {
      type: FINISH_GAME,
      data: data
    }
}
export function updateClientBoard (data) {
    return {
      type: UPDATE_CLIENT_BOARD,
        data: data
    }
}
export function updateClientStatus (data) {
    return {
      type: UPDATE_CLIENT_STATUS,
      data: data
    }
}

export function updatePlayerCount (playerCount) {
    return {
      type: UPDATE_PLAYER_COUNT,
      playerCount: playerCount
    }
}
export function requestMoveLeft () {
    return {
      type: MOVE_LEFT,

    }
}
export function requestMoveRight () {
    return {
      type: MOVE_RIGHT,

    }
}
export function requestMoveDown () {
    return {
      type: MOVE_DOWN,

    }
}
export function requestDropDown () {
    return {
      type: DROP_DOWN,

    }
}
export function requestRotate () {
    return {
      type: ROTATE,
    }
}
