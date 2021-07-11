import nipplejs from 'nipplejs'

let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

const options = {
  zone: document.getElementById('play-screen'),
  dynamicPage: true
}

const joy = nipplejs.create(options)

joy
  .on('added', function (evt, nipple) {
    nipple.on('dir', function (evt) {
      switch (evt.target.direction.angle) {
        case 'up':
          if (lastInputDirection.y !== 0) break
          inputDirection = { x: 0, y: -1 }
          break
        case 'down':
          if (lastInputDirection.y !== 0) break
          inputDirection = { x: 0, y: 1 }
          break
        case 'left':
          if (lastInputDirection.x !== 0) break
          inputDirection = { x: -1, y: 0 }
          break
        case 'right':
          if (lastInputDirection.x !== 0) break
          inputDirection = { x: 1, y: 0 }
          break
      }
    })
  })
  .on('removed', function (evt, nipple) {
    nipple.off('start move end dir plain')
  })

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

export function getInputDirection () {
  lastInputDirection = inputDirection
  return inputDirection
}
