import $ from 'jquery'
import state from './state'

export const gameBoard = document.getElementById('game-board')

export function getGridSize (element) {
  return {
    x: Math.floor(element.offsetWidth / state.CELL_DIMENSION),
    y: Math.floor(element.offsetHeight / state.CELL_DIMENSION)
  }
}

export default function init () {
  loadImageSequence(
    '.snake-sequence',
    'snake',
    'snake-seq',
    130
  )

  loadImageSequence(
    '.spinner-sequence',
    'spinner',
    'snake-loading',
    59
  )

  loadImageSequence(
    '.trophy-sequence',
    'trophy',
    'snake-trophy',
    29
  )
}

function loadImageSequence (target, folder, prefix, totalFrames) {
  let html = ''
  for (let i = 1; i < totalFrames - 1; i++) {
    const imageUrl = `../images/animation/${folder}/${prefix}${String(
      i
    ).padStart(3, '0')}.png`

    html += `<img class="seq-${i}" src="${imageUrl}" />`
  }

  $(target).append(html).data('total-frames', totalFrames)
}
