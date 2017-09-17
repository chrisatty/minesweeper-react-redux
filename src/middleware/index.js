import { createMines } from '../actions'
import * as Utils from '../Utils'

const minesweeperMiddleware = store => next => action => {
    if (action.type === "OPEN_CELL" && store.getState().noMoves === 0) {
        store.dispatch(createMines(store.getState().noMines, Utils.getWidth(store.getState().grid), Utils.getHeight(store.getState().grid), action.x, action.y))
    }
    next(action);
}

export default minesweeperMiddleware;