import * as Utils from '../Utils'

export const newGame = (noMines, width, height) => ({
  type: 'NEW_GAME',
  noMines,
  width,
  height,
});

export const resetGame = () => ({
  type: 'RESET_GAME',
});

export const createMines = (noMines, width, height, x, y) => ({
  type: 'CREATE_MINES',
  mines: Utils.generateRandomMines(noMines, width, height, {x:x,y:y}),
  x,
  y,
});

export const flagCell = (x, y) => ({
  type: 'FLAG_CELL',
  x,
  y,
});

export const openCell = (x, y) => ({
  type: 'OPEN_CELL',
  x,
  y,
});
