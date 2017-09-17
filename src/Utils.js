import { List } from 'immutable'
import { GameStatus } from './Constants'

export const generateRandomMines = (noMines, width, height, exclude) => {
  const noPossibleCells = (width * height) - 1;
  if (noMines > noPossibleCells) {
    throw new Error("No mines bigger than grid size");
  }
  const generatedMineStrings = [];
  while (generatedMineStrings.length !== noMines) {
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    if (randomX === exclude.x && randomY === exclude.y) {
      continue;
    }
    const mineStr = randomX + "," + randomY;
    if (generatedMineStrings.indexOf(mineStr) === -1) {
      generatedMineStrings.push(mineStr);
    }
  }

  return generatedMineStrings.map(coOrds => {
    return {x: coOrds.split(",")[0], y: coOrds.split(",")[1]}
  });
}

export const gameComplete = (status) => {
    return status === GameStatus.WON || status === GameStatus.LOST;
}

export const getHeight = (grid = List()) => {
  return (grid.size !== 0) ? grid.get(0).size : 0;
}

export const getWidth = (grid = List()) => {
  return grid.size;
}

export const getNeighbouringCells = (x, y, gridWidth, gridHeight) => {
  const neighbours = [
    {x:x-1,y:y-1},
    {x:x-1,y:y},
    {x:x-1,y:y+1},
    {x:x,y:y-1},
    {x:x,y:y+1},
    {x:x+1,y:y-1},
    {x:x+1,y:y},
    {x:x+1,y:y+1},
  ];
  const validNeighbours = [];
  neighbours.forEach(cell =>
    isValidCell(cell.x, cell.y, gridWidth, gridHeight) ? validNeighbours.push(cell) : false
  );
  return validNeighbours;
}

export const isValidCell = (x, y, width, height) => {
  if (x < 0 || y < 0) {
    return false;
  } else if (x > width - 1) {
    return false;
  } else if (y > height - 1) {
    return false;
  }
  return true;
}

export const getNoAdjacentMines = (grid, x, y) => {
   let mines = 0;
   const neighbours = getNeighbouringCells(x, y, getWidth(grid), getHeight(grid));
   neighbours.forEach(cell => {
     if (grid.get(cell.x).get(cell.y).mine) {
       mines++;
     }
   });
   return mines;
}