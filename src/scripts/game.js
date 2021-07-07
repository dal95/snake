import '../sass/styles.scss';
import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
import state from './state';
import init, { getGridSize } from './init';
import { updateHud } from './hud';

let lastRenderTime = 0;
let gameOver = false;
let countdown = 60;

export const gameBoard = document.getElementById('game-board');

$(window).on('load', function () {
  init();
  // Click start button to play
  $('#play-button, [data-next="#play-screen"]').on('click', function () {
    state.GRID_SIZE = getGridSize(gameBoard);
    runCountdown();
    start();
  });
});

const timer = document.querySelector('#timer');
function runCountdown() {
  timer.textContent = countdown;
  if (countdown-- > 0) {
    setTimeout(runCountdown, 1000);
  }
}

function main(currentTime) {
  if (gameOver) {
    countdown = 0;
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / state.SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

function start() {
  window.requestAnimationFrame(main);
}

function update() {
  updateSnake();
  updateFood();
  checkDeath();
  updateHud();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver =
    outsideGrid(getSnakeHead()) || snakeIntersection() || countdown < 0;
}
