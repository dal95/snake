
import $ from 'jquery'
import imagesLoaded from 'imagesloaded'
import '../sass/styles.scss'
import timeUpImgUrl from '../images/banner/TIMEUP.png'

import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection
} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import state from './state'
import init, { getGridSize } from './init'
import {
  updateHud,
  updateAsset,
  changeFrame,
  showLoadingScreen,
  gameBanner,
  preload,
  preloadImages,
  showFailScreen,
  gameTitle
} from './hud'

imagesLoaded.makeJQueryPlugin($)

let lastRenderTime = 0
let gameOver = false

export const gameBoard = document.getElementById('game-board')

preload(preloadImages)

$('#game-container')
  .imagesLoaded()
  .always(function () {
    $('#overlay').fadeOut()
    init()

    // Click start button to play
    $('#play-button, [data-next="#play-screen"]').on('click', function () {
      state.GRID_SIZE = getGridSize(gameBoard)
      runCountdown()
      start()
    })
  })
  .progress(function (instance, image) {
    const result = image.isLoaded ? 'loaded' : 'broken'
    console.log('image is ' + result + ' for ' + image.img.src)
  })

$('.play-again').click(function () {
  location.reload()
})

const timer = document.querySelector('#timer')
function runCountdown () {
  timer.textContent = state.COUNTDOWN
  if (state.COUNTDOWN-- > 0) {
    setTimeout(runCountdown, 1000)
  }
}

function showGameOverScreen () {
  changeFrame('red-headless')
  $(gameTitle).fadeIn()
  $(gameBanner).hide()
}

function main (currentTime) {
  if (gameOver) {
    if (state.COUNTDOWN <= 0) {
      showGameOverScreen()
      updateAsset(gameBanner, timeUpImgUrl)
    }
    state.COUNTDOWN = 0

    if (state.SCORE <= state.MIN_SCORE) {
      showGameOverScreen()
      setTimeout(() => showFailScreen(), 1500)

      return
    }

    showGameOverScreen()
    setTimeout(() => showLoadingScreen(), 1500)

    return
  }

  window.requestAnimationFrame(main)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / state.SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

function start () {
  state.GRID_SIZE = getGridSize(gameBoard)
  $(gameBanner).fadeOut()
  window.requestAnimationFrame(main)
}

function update () {
  updateSnake()
  updateFood()
  checkDeath()
  updateHud()
}

function draw () {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath () {
  gameOver =
    outsideGrid(getSnakeHead()) || snakeIntersection() || state.COUNTDOWN < 0
}
