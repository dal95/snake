import state from './state'

const gameHeader = document.getElementById('game-header');
const gameFooter = document.getElementById('game-footer');
const gameBody = document.getElementById('game-body');
const gameContainer = document.getElementById('game-container');
export const gameBoard = document.getElementById('game-board');

export let GRID_SIZE = getGridSize(gameBoard);

// export function init() {
//   gameBody.style.height =
//     gameContainer.offsetHeight -
//     gameHeader.offsetHeight -
//     gameFooter.offsetHeight +
//     'px';

// 		GRID_SIZE = getGridSize(gameBoard)
// }

export function getGridSize(gameBoard) {
  return {
    x: Math.floor(gameBoard.offsetWidth / state.CELL_SIZE),
    y: Math.floor(gameBoard.offsetHeight / state.CELL_SIZE),
  };
}

export default function init() {
  loadImageSequence(
    '#tutorial-countdown .anim-sequence',
    'countdown',
    'snake-time-seq',
    29
  );

  loadImageSequence(
    '#tutorial-score .anim-sequence',
    'score',
    'snake-score-seq',
    29
  );

  loadImageSequence(
    '#tutorial-snake .anim-sequence',
    'snake',
    'snake-seq',
    130
  );
}

function loadImageSequence(target, folder, prefix, totalFrames) {
  let html = '';
  for (let i = 1; i < totalFrames - 1; i++) {
    const imageUrl = `../images/animation/${folder}/${prefix}${String(i).padStart( 3, '0')}.png`

    html += `<img class="seq-${i}" src="${imageUrl}" />`;
  }

  $(target).append(html).data('total-frames', totalFrames);
}
