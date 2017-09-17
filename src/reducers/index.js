import { CellState, GameStatus } from '../Constants'
import { List } from 'immutable'
import * as Utils from '../Utils'

const processCellOpening = (grid, x, y) => {
  if (grid.get(x).get(y).cellState !== CellState.UNOPENED) {
    return grid;
  }
  let row = grid.get(x);
  row = row.set(y, {
    ...row.get(y),
    cellState: CellState.OPENED,
  });
  let newGrid = grid.set(x, row);

  if (newGrid.get(x).get(y).mine || Utils.getNoAdjacentMines(newGrid, x, y) > 0) {
    return newGrid;
  }
  const neighbours = Utils.getNeighbouringCells(x, y, Utils.getWidth(newGrid), Utils.getHeight(newGrid));
  neighbours.forEach(cellCoords => {
    newGrid = processCellOpening(newGrid, cellCoords.x, cellCoords.y);
  });
  return newGrid;
}

const gameWon = (grid) => {
  return (grid.filter(row =>
    (row.filter(cell => (cell.cellState !== CellState.OPENED && !cell.mine)).size > 0)
  ).size === 0);
}


const isValidCell = (x, y, grid) => {
  if (x < 0 || x > Utils.getWidth(grid)) {
    return false;
  }
  if (y < 0 || y > Utils.getHeight(grid)) {
    return false;
  }
  return true;
}

const createGrid = (width, height) => {
  let grid = List();
  for (let i = 0; i < width; i++) {
    let row = List();
    for (let j = 0 ; j < height; j++) {
      row = row.insert(j, {mine: false, x: i, y: j, cellState: CellState.UNOPENED });
    }
    grid = grid.insert(i, row);
  }
  return grid;
}

const initialState = {
    noMines: 50,
    noMoves: 0,
    status: GameStatus.NOT_STARTED,
    grid: createGrid(20, 20),
}

const minesweeperApp = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_GAME': {
      return {
        noMines: action.noMines,
        noMoves: 0,
        status: GameStatus.NOT_STARTED,
        grid: createGrid(action.width, action.height),
      };
    }
    case 'RESET_GAME': {
      return {
        ...state,
        noMoves: 0,
        status: GameStatus.NOT_STARTED,
        grid: createGrid(Utils.getWidth(state.grid), Utils.getHeight(state.grid)),
      };
    }
    case 'CREATE_MINES': {
      let newGrid = state.grid;
      action.mines.forEach(mine => {
        let row = newGrid.get(mine.x);
        row = row.set(mine.y, {
          ...row.get(mine.y),
          mine:true,
        });
        newGrid = newGrid.set(mine.x, row);
      });
      return {
        ...state,
        grid: newGrid,
      }
    }
    case 'OPEN_CELL': {
        if (!isValidCell(action.x, action.y, state.grid) || Utils.gameComplete(state.status)) {
          return state;
        }
        const newGrid = processCellOpening(state.grid, action.x, action.y);
        let status = GameStatus.IN_PROGRESS;
        if (newGrid.get(action.x).get(action.y).mine) {
            status = GameStatus.LOST;
        } else if (gameWon(newGrid)) {
            status = GameStatus.WON;
        }

        return {
           ...state,
           grid: newGrid,
           noMoves: state.noMoves + 1,
           status: status,
        };
    }
    case 'FLAG_CELL': {
      if (!isValidCell(action.x, action.y, state.grid) ||
            state.grid.get(action.x).get(action.y).cellState === CellState.OPENED ||
            Utils.gameComplete(state.status)) {
        return state;
      }
      let row = state.grid.get(action.x);
      row = row.set(action.y, {
        ...row.get(action.y),
        cellState: (state.grid.get(action.x).get(action.y).cellState === CellState.UNOPENED) ? CellState.FLAGGED : CellState.UNOPENED,
      });
      return {
        ...state,
        grid: state.grid.set(action.x, row),
      };
    }
    default:
      return state
  }
}

export default minesweeperApp;