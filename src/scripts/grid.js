import { gameBoard } from './game';
const GRID_SIZE = getGridSize(gameBoard);

function getGridSize(gameBoard) {
  return {
    x: Math.floor(gameBoard.offsetWidth / 10),
    y: Math.floor(gameBoard.offsetHeight / 10),
  };
}

export function randomGridPosition() {
  console.log(GRID_SIZE)
  return {
    x: Math.floor(Math.random() * GRID_SIZE.x) + 1,
    y: Math.floor(Math.random() * GRID_SIZE.y) + 1,
  };
}

export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE.x ||
    position.y < 1 ||
    position.y > GRID_SIZE.y
  );
}
