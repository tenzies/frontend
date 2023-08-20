import { nanoid } from "nanoid";

//Generating One Square
export function generateOneSquare() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }
  }

// Generating All Squares
export function generateSquares() {
    const SquareArray = []
    for(let i = 0; i < 10; i++) {
      SquareArray.push(generateOneSquare())
    }
    return SquareArray
  }