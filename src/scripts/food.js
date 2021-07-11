import { onSnake, expandSnake, transformSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
import { redeemBoost } from './hud'

let food = getRandomFood()
const EXPANSION_RATE = 1

export function update () {
  if (onSnake(food.position)) {
    expandSnake(EXPANSION_RATE)
    transformSnake(food.type)
    redeemBoost(food.type)
    food = getRandomFood()
  }
}

export function draw (gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.position.y
  foodElement.style.gridColumnStart = food.position.x
  foodElement.classList.add('food')
  foodElement.classList.add(food.type.color)
  gameBoard.appendChild(foodElement)
}

function getRandomFood () {
  let newFoodPosition, powerUpType
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
    powerUpType = getRandomPowerUpFood()
  }

  return {
    position: newFoodPosition,
    type: powerUpType
  }
}

function getRandomPowerUpFood () {
  const types = [
    {
      color: 'blue',
      boost: 'extra-long'
    },
    {
      color: 'red',
      boost: 'extra-value'
    },
    {
      color: 'green',
      boost: 'extra-firm'
    }
  ]

  const newFoodBoost = types[Math.floor(Math.random() * types.length)]
  return newFoodBoost
}
