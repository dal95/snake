import state from './state';
import loadingImgUrl from '../images/banner/LOADING-red.png';
import holdonImgUrl from '../images/title/snake-title-holdon.png';
import ohyesImgUrl from '../images/title/snake-title-oh-yes.png';
import congratImgUrl from '../images/banner/CONGRATULATION.png';
import howtoplayImgUrl from '../images/banner/HOWTOPLAY.png';
import pipeBlueImg from '../images/pipe-blue.png';
import pipeRedImg from '../images/pipe-red.png';
import headerRedHeadlessImg from '../images/header-red-headless.png';
import headerBlueImg from '../images/header-blue.png';
import headerBlueHeadlessImg from '../images/header-blue-headless.png';
import footerBlueImg from '../images/footer-blue.png';
import footerRedImg from '../images/footer-red.png';

const frame = {
  'pipe-blue': pipeBlueImg,
  'pipe-red': pipeRedImg,
  'header-red-headless': headerRedHeadlessImg,
  'header-blue': headerBlueImg,
  'header-blue-headless': headerBlueHeadlessImg,
  'footer-blue': footerBlueImg,
  'footer-red': footerRedImg,
};

let sequence;
const score = document.getElementById('score');

const gameHeader = document.getElementById('game-header');
const gameBoard = document.getElementById('game-board');
const gameFooter = document.getElementById('game-footer');
const gameBody = document.getElementById('game-body');
export const gameBanner = document.querySelector('.banner-image');
const gameContainer = document.getElementById('game-container');
const gameTitle = document.querySelector('.big-title');

export function nextScreen() {
  const id = $(this).data('next');
  updateAsset(gameBanner, howtoplayImgUrl);
  $(this)
    .closest('.screen')
    .fadeOut(function () {
      $(id).fadeIn();

      if ($(id).data('animate-on-visible')) {
        animateOnvisible($(id).data('animate-on-visible'), id);
      }

      if ($(id).find('.anim-sequence').length < 1)
        return cancelAnimationFrame(sequence);

      animate(
        $(id),
        $(id).find('.anim-sequence').data('total-frames'),
        $(id).find('.anim-sequence').data('duration')
      );
    });
}

export function loadingScreen() {
  updateTitle(holdonImgUrl);

  $(gameBanner).attr('src', loadingImgUrl).fadeIn();
  $('#data-transmit').fadeIn();
  animate($('#data-transmit'), 59, 1000);
  resetGame();

  // Simulate Submit the data
  setTimeout(() => showFinalScore(), 3000);
}

function showFinalScore() {
  $('#result-score').text(state.SCORE || '0')
  $('#result-score').fadeIn()
  // Change the frame to blue here
  //-
  //////////////////////////////////
  updateTitle(ohyesImgUrl);
  changeFrame('blue-headless');
  updateAsset(gameBanner, congratImgUrl);
  $('.screen').fadeOut();
  $('#final-score').fadeIn();
  animate($('#final-score'), 29, 1000);
}

$('[data-next]').click(nextScreen);

function animate(parent, totalFrames, animationDuration = 1500) {
  const timePerFrame = animationDuration / totalFrames;
  let timeWhenLastUpdate;
  let timeFromLastUpdate;
  let frameNumber = 1;

  // 'step' function will be called each time browser rerender the content
  // we achieve that by passing 'step' as a parameter to 'requestAnimationFrame' function
  function step(startTime) {
    // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
    // first of all we calculate how much time has passed from the last time when frame was update
    if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
    timeFromLastUpdate = startTime - timeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (timeFromLastUpdate > timePerFrame) {
      // hide all frames
      parent.find('.anim-sequence img').css('opacity', 0);
      // and show the required one
      parent.find(`.seq-${frameNumber}`).css('opacity', 1);
      // reset the last update time
      timeWhenLastUpdate = startTime;

      // then increase the frame number or reset it if it is the last frame
      if (frameNumber >= totalFrames) {
        frameNumber = 1;
      } else {
        frameNumber = frameNumber + 1;
      }
    }

    sequence = requestAnimationFrame(step);
  }

  sequence = requestAnimationFrame(step);
}

export function updateHud() {
  updateScore();
}

function updateTitle(imageUrl) {
  $(gameTitle).attr('src', imageUrl).fadeIn();
}

function updateAsset(element, imageUrl) {
  $(element).attr('src', imageUrl).fadeIn();
}

function updateScore() {
  score.textContent = state.SCORE;
}

export function redeemBoost(foodType) {
  if (foodType.color == 'blue') {
    state.SCORE += 20;
    // $(score).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    score.classList.add('blink');
    setTimeout(() => score.classList.remove('blink'), 500);
  }

  if (foodType.color == 'green') {
    state.SNAKE_SPEED += 2;
  }

  if (foodType.color == 'red') {
    state.SCORE += 10;
    // $(score).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    score.classList.add('blink');
    setTimeout(() => score.classList.remove('blink'), 500);
  }
}

function updateBanner() {}

function animateOnvisible(target, dep) {
  if ($(dep).is(':hidden')) return;

  $(target).addClass('blink').css({
    animationIterationCount: 1,
    animationDuration: 1,
  });
}

export function changeFrame(str) {
  // blue, blue-headless, red-headless
  const [color, type] = str.split('-');

  let headerUrl = frame[`header-${color}`];
  // Style for headless
  if (type == 'headless') {
    $('#timer, #score').hide();
    headerUrl = frame[`header-${color}-headless`];
  }

  const footerUrl = frame[`footer-${color}`];
  const bodyUrl = frame[`pipe-${color}`];
  $(gameBody).css('background-image', 'url(' + bodyUrl + ')');
  $('.banner-image').hide();
  $(gameHeader).find('.header-bg').attr('src', headerUrl);
  $(gameFooter).attr('src', footerUrl);
  $('.big-title').show();
}

export function resetGame() {
  $(gameBoard).empty();
}
