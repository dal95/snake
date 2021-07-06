const trackingSize = 10; // Cell size

export const gameBoard = document.getElementById('game-board');
export const GRID_SIZE = getGridSize(gameBoard);

export function getGridSize(gameBoard) {
  return {
    x: Math.floor(gameBoard.offsetWidth / trackingSize),
    y: Math.floor(gameBoard.offsetHeight / trackingSize),
  };
}
