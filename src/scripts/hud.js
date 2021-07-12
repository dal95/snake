import $ from 'jquery'
import state from './state'
import holdonImgUrl from '../images/title/snake-title-holdon.png'
import ohyesImgUrl from '../images/title/snake-title-oh-yes.png'
import ohnoImgUrl from '../images/title/snake-title-oh-no.png'
import introImgUrl from '../images/title/snake-title-introducing.png'

import loadingImgUrl from '../images/banner/LOADING-red.png'
import congratImgUrl from '../images/banner/CONGRATULATION.png'
import NBTImgUrl from '../images/banner/NEXTBIGTHING.png'
import howtoplayImgUrl from '../images/banner/HOWTOPLAY.png'
import timeUpImgUrl from '../images/banner/TIMEUP.png'
import tryagAinImgUrl from '../images/banner/TRYAGAIN.png'
import xlImgUrl from '../images/banner/EXTRALONG.png'
import xfImgUrl from '../images/banner/EXTRAFIRM.png'
import xvImgUrl from '../images/banner/EXTRAVALUE.png'

import pipeBlueImg from '../images/pipe-blue.png'
import pipeRedImg from '../images/pipe-red.png'
import headerRedHeadlessImg from '../images/header-red-headless.png'
import headerBlueImg from '../images/header-blue.png'
import headerBlueHeadlessImg from '../images/header-blue-headless.png'
import footerBlueImg from '../images/footer-blue.png'
import footerRedImg from '../images/footer-red.png'

export const frame = {
  'pipe-blue': pipeBlueImg,
  'pipe-red': pipeRedImg,
  'header-red-headless': headerRedHeadlessImg,
  'header-blue': headerBlueImg,
  'header-blue-headless': headerBlueHeadlessImg,
  'footer-blue': footerBlueImg,
  'footer-red': footerRedImg
}

export const preloadImages = [
  ...Object.values(frame),
  holdonImgUrl,
  loadingImgUrl,
  ohyesImgUrl,
  congratImgUrl,
  NBTImgUrl,
  howtoplayImgUrl,
  introImgUrl,
  timeUpImgUrl,
  xlImgUrl,
  xvImgUrl,
  xfImgUrl,
  tryagAinImgUrl,
  ohnoImgUrl
]

export function preload (images) {
  if (document.images) {
    let i = 0
    const imageObj = new Image()
    for (i = 0; i <= images.length - 1; i++) {
      $('body').append('<img src="' + images[i] + '" class="preloaded"/>') // Write to page (uncomment to check images)
      imageObj.src = images[i]
    }
  }
}

let sequence
const score = document.getElementById('score')

const gameHeader = document.getElementById('game-header')
const gameBoard = document.getElementById('game-board')
const gameFooter = document.getElementById('game-footer')
const gameBody = document.getElementById('game-body')
export const gameBanner = document.querySelector('.banner-image')
// const gameContainer = document.getElementById('game-container')
export const gameTitle = document.querySelector('.big-title')

$('[data-next="#coming-soon"]').click(function () {
  updateAsset(gameTitle, introImgUrl)
  updateAsset(gameBanner, NBTImgUrl)
})

export function nextScreen () {
  const id = $(this).data('next')
  if ($(id).data('banner') === 'howtoplay') {
    updateAsset(gameBanner, howtoplayImgUrl)
  }

  $(this)
    .closest('.screen')
    .fadeOut(function () {
      $(id).fadeIn()

      if ($(id).data('animate-on-visible')) {
        animateOnvisible($(id).data('animate-on-visible'), id)
      }

      if ($(id).find('.anim-sequence').length < 1) {
        return cancelAnimationFrame(sequence)
      }

      animate(
        $(id),
        $(id).find('.anim-sequence').data('total-frames'),
        $(id).find('.anim-sequence').data('duration')
      )
    })
}

export function showLoadingScreen () {
  resetGame()
  changeFrame('red-headless')
  updateAsset(gameTitle, holdonImgUrl)
  updateAsset(gameBanner, loadingImgUrl)

  $('#data-transmit').fadeIn()
  animate($('#data-transmit'), 59, 1000)

  // Simulate Submit the data
  setTimeout(() => showFinalScore(), 3000)
}

function showFinalScore () {
  resetGame()
  $('.screen').fadeOut()
  changeFrame('blue-headless')
  updateAsset(gameTitle, ohyesImgUrl)
  updateAsset(gameBanner, congratImgUrl)
  $('#final-score').fadeIn()
  $('#result-score').text(state.SCORE || '0')
  animate($('#final-score'), 29, 1000)
}

export function showFailScreen () {
  resetGame()
  $('.screen').fadeOut()
  updateAsset(gameTitle, ohnoImgUrl)
  updateAsset(gameBanner, tryagAinImgUrl)
  $('#fail-screen').fadeIn()
  $('#result-score').text(state.SCORE || '0')
}

$('[data-next]').click(nextScreen)

function animate (parent, totalFrames, animationDuration = 1500) {
  const timePerFrame = animationDuration / totalFrames
  let timeWhenLastUpdate
  let timeFromLastUpdate
  let frameNumber = 1

  function step (startTime) {
    if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime
    timeFromLastUpdate = startTime - timeWhenLastUpdate

    if (timeFromLastUpdate > timePerFrame) {
      parent.find('.anim-sequence img').css('opacity', 0)
      parent.find(`.seq-${frameNumber}`).css('opacity', 1)
      timeWhenLastUpdate = startTime

      if (frameNumber >= totalFrames) {
        frameNumber = 1
      } else {
        frameNumber = frameNumber + 1
      }
    }

    sequence = requestAnimationFrame(step)
  }

  sequence = requestAnimationFrame(step)
}

export function updateHud () {
  updateScore()
}

export function updateAsset (element, imageUrl) {
  if ($(element).attr('src') === imageUrl) return

  $(element).fadeOut(function () {
    $(this).attr('src', imageUrl).fadeIn()
  })
}

function updateScore () {
  score.textContent = state.SCORE
}

export function redeemBoost (foodType) {
  if (foodType.color === 'blue') {
    state.SCORE += 20
    score.classList.add('blink')
    updateAsset(gameBanner, xlImgUrl)
    setTimeout(() => score.classList.remove('blink'), 500)
  }

  if (foodType.color === 'green') {
    state.SNAKE_SPEED += 2
    updateAsset(gameBanner, xfImgUrl)
  }

  if (foodType.color === 'red') {
    state.SCORE += 10
    score.classList.add('blink')
    updateAsset(gameBanner, xvImgUrl)
    setTimeout(() => score.classList.remove('blink'), 500)
  }
}

function animateOnvisible (target, dep) {
  if ($(dep).is(':hidden')) return

  $(target).addClass('blink').css({
    animationIterationCount: 1,
    animationDuration: 1
  })
}

export function changeFrame (str) {
  // blue, blue-headless, red-headless
  const [color, type] = str.split('-')

  let headerUrl = frame[`header-${color}`]
  if (type === 'headless') {
    $('#timer, #score').hide()
    headerUrl = frame[`header-${color}-headless`]
  }

  const footerUrl = frame[`footer-${color}`]
  const bodyUrl = frame[`pipe-${color}`]
  $(gameBody).css('background-image', 'url(' + bodyUrl + ')')
  $(gameHeader).find('.header-bg').attr('src', headerUrl)
  $(gameFooter).attr('src', footerUrl)
  $('.big-title').fadeIn()
}

export function resetGame () {
  $(gameBoard).empty()
}
