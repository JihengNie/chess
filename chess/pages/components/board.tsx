import React, { Component } from 'react';

interface BoardProps {
  turn?: string;
}

type MyState = {
  board?: string[][],
  potentialBoard?: string[][],
  piece?: string | undefined,
  potentialSpaces: (number[] | null)[],
  currentLocation: number[]
}

class Board extends Component<BoardProps, MyState> {
  constructor(props: BoardProps) {
    super(props)

    this.state = {
      board: createNewArrayOfBoard(),
      potentialBoard: createNewArrayPotentialBoard(),
      piece: '',
      potentialSpaces: [[]],
      currentLocation: []
    }
    this.handlePiecePotentialSpaces = this.handlePiecePotentialSpaces.bind(this);
    this.handlePieceMove = this.handlePieceMove.bind(this)
  }

  handlePieceMove(event: any) {
    let [selectedLocation] = event.target.id.split(' ')
    const yDirection = +selectedLocation[0]
    const xDirection = +selectedLocation[1]
    const selectedLocationArr = [yDirection, xDirection]

    const { potentialSpaces, board, piece, currentLocation } = this.state

    const currYLocation = currentLocation[0]
    const currXLocation = currentLocation[1]
    let ableMove = false

    for (let index in potentialSpaces) {
      if (JSON.stringify(selectedLocationArr) === JSON.stringify(potentialSpaces[index])) {
        ableMove = true
        if (piece === 'b-knight' && (board![yDirection][xDirection].split('-')[0] === 'w' || board![yDirection][xDirection]=== 'Empty')) {
          ableMove = true
        } else if (piece === 'w-knight' && (board![yDirection][xDirection].split('-')[0] === 'b' || board![yDirection][xDirection] === 'Empty')) {
          ableMove = true
        } else if (piece === 'b-bishop') {

        }
        else {
          console.log('Can not move there')
        }

      }
    }

    if (ableMove) {
      board![yDirection][xDirection] = piece!
      board![currYLocation][currXLocation] = 'Empty'
      this.setState({
        board: board,
        piece: '',
        potentialSpaces: [[]],
        currentLocation: [],
        potentialBoard: createNewArrayPotentialBoard()
      })
    } else {
      console.log('Can not move there')
    }

  }

  handlePiecePotentialSpaces(event: any) {
    let [currLocation, piece] = event.target.id.split(' ')
    const { board } = this.state
    const yDirection = +currLocation[0]
    const xDirection = +currLocation[1]
    const pieceLocation = [yDirection, xDirection]

    let potentialSpaces: any = []

    // Generating Potential Spaces for Knight
    if (piece === 'b-knight' || piece === 'w-knight') {
      if (piece === 'b-knight') {
        potentialSpaces = [
          checkCordsWithinBoard(yDirection - 2, xDirection + 1) && (board![yDirection - 2][xDirection + 1].split('-')[0] === 'w' || board![yDirection - 2][xDirection + 1].split('-')[0]==='Empty') ? [yDirection - 2, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection + 2) && (board![yDirection - 1][xDirection + 2].split('-')[0] === 'w' || board![yDirection - 1][xDirection + 2].split('-')[0]==='Empty') ? [yDirection - 1, xDirection + 2] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection + 2) && (board![yDirection + 1][xDirection + 2].split('-')[0] === 'w' || board![yDirection + 1][xDirection + 2].split('-')[0]==='Empty') ? [yDirection + 1, xDirection + 2] : null,
          checkCordsWithinBoard(yDirection + 2, xDirection + 1) && (board![yDirection + 2][xDirection + 1].split('-')[0] === 'w' || board![yDirection + 2][xDirection + 1].split('-')[0]==='Empty') ? [yDirection + 2, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection - 2, xDirection - 1) && (board![yDirection - 2][xDirection - 1].split('-')[0] === 'w' || board![yDirection - 2][xDirection - 1].split('-')[0]==='Empty') ? [yDirection - 2, xDirection - 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection - 2) && (board![yDirection - 1][xDirection - 2].split('-')[0] === 'w' || board![yDirection - 1][xDirection - 2].split('-')[0]==='Empty') ? [yDirection - 1, xDirection - 2] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection - 2) && (board![yDirection + 1][xDirection - 2].split('-')[0] === 'w' || board![yDirection + 1][xDirection - 2].split('-')[0]==='Empty') ? [yDirection + 1, xDirection - 2] : null,
          checkCordsWithinBoard(yDirection + 2, xDirection - 1) && (board![yDirection + 2][xDirection - 1].split('-')[0] === 'w' || board![yDirection + 2][xDirection - 1].split('-')[0]==='Empty') ? [yDirection + 2, xDirection - 1] : null
        ]
      }
      if (piece === 'w-knight') {
        potentialSpaces = [
          checkCordsWithinBoard(yDirection - 2, xDirection + 1) && (board![yDirection - 2][xDirection + 1].split('-')[0] === 'b' || board![yDirection - 2][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection - 2, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection + 2) && (board![yDirection - 1][xDirection + 2].split('-')[0] === 'b' || board![yDirection - 1][xDirection + 2].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection + 2] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection + 2) && (board![yDirection + 1][xDirection + 2].split('-')[0] === 'b' || board![yDirection + 1][xDirection + 2].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection + 2] : null,
          checkCordsWithinBoard(yDirection + 2, xDirection + 1) && (board![yDirection + 2][xDirection + 1].split('-')[0] === 'b' || board![yDirection + 2][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection + 2, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection - 2, xDirection - 1) && (board![yDirection - 2][xDirection - 1].split('-')[0] === 'b' || board![yDirection - 2][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection - 2, xDirection - 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection - 2) && (board![yDirection - 1][xDirection - 2].split('-')[0] === 'b' || board![yDirection - 1][xDirection - 2].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection - 2] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection - 2) && (board![yDirection + 1][xDirection - 2].split('-')[0] === 'b' || board![yDirection + 1][xDirection - 2].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection - 2] : null,
          checkCordsWithinBoard(yDirection + 2, xDirection - 1) && (board![yDirection + 2][xDirection - 1].split('-')[0] === 'b' || board![yDirection + 2][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection + 2, xDirection - 1] : null
        ]
      }
    } else if (piece === 'b-rook' || piece === 'w-rook') {
      let moveDown = true
      let downCounter = 0
      while(moveDown) {
        downCounter++
        if (checkCordsWithinBoard(yDirection + downCounter, xDirection)) {
          if (board![yDirection + downCounter][xDirection].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection + downCounter, xDirection])
          } else if (piece === 'b-rook' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
            moveDown = false
          } else if (piece === 'w-rook' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
            moveDown = false
          } else if (piece === 'b-rook' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection + downCounter, xDirection])
            moveDown = false
          } else if (piece === 'w-rook' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection + downCounter, xDirection])
            moveDown = false
          }
        } else {
          moveDown = false
        }
      }

      let moveUp = true
      let upCounter = 0
      while (moveUp) {
        upCounter++
        if (checkCordsWithinBoard(yDirection - upCounter, xDirection)) {
          if (board![yDirection - upCounter][xDirection].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection - upCounter, xDirection])
          } else if (piece === 'b-rook' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
            moveUp = false
          } else if (piece === 'w-rook' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
            moveUp = false
          } else if (piece === 'b-rook' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection - upCounter, xDirection])
            moveUp = false
          } else if (piece === 'w-rook' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection - upCounter, xDirection])
            moveUp = false
          }
        } else {
          moveUp = false
        }
      }

      let moveRight = true
      let rightCounter = 0
      while (moveRight) {
        rightCounter++
        if (checkCordsWithinBoard(yDirection, xDirection + rightCounter)) {
          if (board![yDirection][xDirection + rightCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection, xDirection + rightCounter])
          } else if (piece === 'b-rook' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
            moveRight = false
          } else if (piece === 'w-rook' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
            moveRight = false
          } else if (piece === 'b-rook' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection, xDirection + rightCounter])
            moveRight = false
          } else if (piece === 'w-rook' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection, xDirection + rightCounter])
            moveRight = false
          }
        } else {
          moveRight = false
        }
      }

      let moveLeft = true
      let leftCounter = 0
      while (moveLeft) {
        leftCounter++
        if (checkCordsWithinBoard(yDirection, xDirection - leftCounter)) {
          if (board![yDirection][xDirection - leftCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection, xDirection - leftCounter])
          } else if (piece === 'b-rook' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
            moveLeft = false
          } else if (piece === 'w-rook' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
            moveLeft = false
          } else if (piece === 'b-rook' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection, xDirection - leftCounter])
            moveLeft = false
          } else if (piece === 'w-rook' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection, xDirection - leftCounter])
            moveLeft = false
          }
        } else {
          moveLeft = false
        }
      }
    } else if (piece === 'w-bishop' || piece === 'b-bishop') {
      let moveDownRight = true
      let downRightCounter = 0
      while (moveDownRight) {
        downRightCounter++
        if (checkCordsWithinBoard(yDirection + downRightCounter, xDirection + downRightCounter)) {
          if (board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection + downRightCounter, xDirection + downRightCounter])
          } else if (piece === 'b-bishop' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'b') {
            moveDownRight = false
          } else if (piece === 'w-bishop' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'w') {
            moveDownRight = false
          } else if (piece === 'b-bishop' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection + downRightCounter, xDirection + downRightCounter])
            moveDownRight = false
          } else if (piece === 'w-bishop' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection + downRightCounter, xDirection + downRightCounter])
            moveDownRight = false
          }
        } else {
          moveDownRight = false
        }
      }

      let moveTopRight = true
      let topRightCounter = 0
      while (moveTopRight) {
        topRightCounter++
        if (checkCordsWithinBoard(yDirection - topRightCounter, xDirection + topRightCounter)) {
          if (board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection - topRightCounter, xDirection + topRightCounter])
          } else if (piece === 'b-bishop' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'b') {
            moveTopRight = false
          } else if (piece === 'w-bishop' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'w') {
            moveTopRight = false
          } else if (piece === 'b-bishop' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection - topRightCounter, xDirection + topRightCounter])
            moveTopRight = false
          } else if (piece === 'w-bishop' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection - topRightCounter, xDirection + topRightCounter])
            moveTopRight = false
          }
        } else {
          moveTopRight = false
        }
      }

      let moveUpLeft = true
      let upLeftCounter = 0
      while (moveUpLeft) {
        upLeftCounter++
        if (checkCordsWithinBoard(yDirection - upLeftCounter, xDirection - upLeftCounter)) {
          if (board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection - upLeftCounter, xDirection - upLeftCounter])
          } else if (piece === 'b-bishop' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'b') {
            moveUpLeft = false
          } else if (piece === 'w-bishop' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'w') {
            moveUpLeft = false
          } else if (piece === 'b-bishop' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection - upLeftCounter, xDirection - upLeftCounter])
            moveUpLeft = false
          } else if (piece === 'w-bishop' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection - upLeftCounter, xDirection - upLeftCounter])
            moveUpLeft = false
          }
        } else {
          moveUpLeft = false
        }
      }

      let moveDownLeft = true
      let downLeftCounter = 0
      while (moveDownLeft) {
        downLeftCounter++
        if (checkCordsWithinBoard(yDirection + downLeftCounter, xDirection - downLeftCounter)) {
          if (board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
          } else if (piece === 'b-bishop' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'b') {
            moveDownLeft = false
          } else if (piece === 'w-bishop' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'w') {
            moveDownLeft = false
          } else if (piece === 'b-bishop' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
            moveDownLeft = false
          } else if (piece === 'w-bishop' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
            moveDownLeft = false
          }
        } else {
          moveDownLeft = false
        }
      }

    } else if (piece === 'w-king' || piece === 'b-king') {
      if (piece === 'b-king') {
        potentialSpaces = [
          checkCordsWithinBoard(yDirection + 1, xDirection + 1) && (board![yDirection + 1][xDirection + 1].split('-')[0] === 'w' || board![yDirection + 1][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection - 1) && (board![yDirection - 1][xDirection - 1].split('-')[0] === 'w' || board![yDirection - 1][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection - 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection + 1) && (board![yDirection - 1][xDirection + 1].split('-')[0] === 'w' || board![yDirection - 1][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection - 1) && (board![yDirection + 1][xDirection - 1].split('-')[0] === 'w' || board![yDirection + 1][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection - 1] : null,

          checkCordsWithinBoard(yDirection - 1, xDirection) && (board![yDirection - 1][xDirection].split('-')[0] === 'w' || board![yDirection - 1][xDirection].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection) && (board![yDirection + 1][xDirection].split('-')[0] === 'w' || board![yDirection + 1][xDirection].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection] : null,
          checkCordsWithinBoard(yDirection, xDirection + 1) && (board![yDirection][xDirection + 1].split('-')[0] === 'w' || board![yDirection][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection, xDirection - 1) && (board![yDirection][xDirection - 1].split('-')[0] === 'w' || board![yDirection][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection, xDirection - 1] : null,
        ]
      }

      if (piece === 'w-king') {
        potentialSpaces = [
          checkCordsWithinBoard(yDirection + 1, xDirection + 1) && (board![yDirection + 1][xDirection + 1].split('-')[0] === 'b' || board![yDirection + 1][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection - 1) && (board![yDirection - 1][xDirection - 1].split('-')[0] === 'b' || board![yDirection - 1][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection - 1] : null,
          checkCordsWithinBoard(yDirection - 1, xDirection + 1) && (board![yDirection - 1][xDirection + 1].split('-')[0] === 'b' || board![yDirection - 1][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection - 1) && (board![yDirection + 1][xDirection - 1].split('-')[0] === 'b' || board![yDirection + 1][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection - 1] : null,

          checkCordsWithinBoard(yDirection - 1, xDirection) && (board![yDirection - 1][xDirection].split('-')[0] === 'b' || board![yDirection - 1][xDirection].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection] : null,
          checkCordsWithinBoard(yDirection + 1, xDirection) && (board![yDirection + 1][xDirection].split('-')[0] === 'b' || board![yDirection + 1][xDirection].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection] : null,
          checkCordsWithinBoard(yDirection, xDirection + 1) && (board![yDirection][xDirection + 1].split('-')[0] === 'b' || board![yDirection][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection, xDirection + 1] : null,
          checkCordsWithinBoard(yDirection, xDirection - 1) && (board![yDirection][xDirection - 1].split('-')[0] === 'b' || board![yDirection][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection, xDirection - 1] : null,
        ]
      }
    } else if (piece === 'b-queen' || piece === 'w-queen') {
      let moveDown = true
      let downCounter = 0
      while (moveDown) {
        downCounter++
        if (checkCordsWithinBoard(yDirection + downCounter, xDirection)) {
          if (board![yDirection + downCounter][xDirection].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection + downCounter, xDirection])
          } else if (piece === 'b-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
            moveDown = false
          } else if (piece === 'w-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
            moveDown = false
          } else if (piece === 'b-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection + downCounter, xDirection])
            moveDown = false
          } else if (piece === 'w-queen' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection + downCounter, xDirection])
            moveDown = false
          }
        } else {
          moveDown = false
        }
      }

      let moveUp = true
      let upCounter = 0
      while (moveUp) {
        upCounter++
        if (checkCordsWithinBoard(yDirection - upCounter, xDirection)) {
          if (board![yDirection - upCounter][xDirection].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection - upCounter, xDirection])
          } else if (piece === 'b-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
            moveUp = false
          } else if (piece === 'w-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
            moveUp = false
          } else if (piece === 'b-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection - upCounter, xDirection])
            moveUp = false
          } else if (piece === 'w-queen' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection - upCounter, xDirection])
            moveUp = false
          }
        } else {
          moveUp = false
        }
      }

      let moveRight = true
      let rightCounter = 0
      while (moveRight) {
        rightCounter++
        if (checkCordsWithinBoard(yDirection, xDirection + rightCounter)) {
          if (board![yDirection][xDirection + rightCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection, xDirection + rightCounter])
          } else if (piece === 'b-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
            moveRight = false
          } else if (piece === 'w-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
            moveRight = false
          } else if (piece === 'b-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection, xDirection + rightCounter])
            moveRight = false
          } else if (piece === 'w-queen' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection, xDirection + rightCounter])
            moveRight = false
          }
        } else {
          moveRight = false
        }
      }

      let moveLeft = true
      let leftCounter = 0
      while (moveLeft) {
        leftCounter++
        if (checkCordsWithinBoard(yDirection, xDirection - leftCounter)) {
          if (board![yDirection][xDirection - leftCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection, xDirection - leftCounter])
          } else if (piece === 'b-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
            moveLeft = false
          } else if (piece === 'w-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
            moveLeft = false
          } else if (piece === 'b-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection, xDirection - leftCounter])
            moveLeft = false
          } else if (piece === 'w-queen' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection, xDirection - leftCounter])
            moveLeft = false
          }
        } else {
          moveLeft = false
        }
      }


      let moveDownRight = true
      let downRightCounter = 0
      while (moveDownRight) {
        downRightCounter++
        if (checkCordsWithinBoard(yDirection + downRightCounter, xDirection + downRightCounter)) {
          if (board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection + downRightCounter, xDirection + downRightCounter])
          } else if (piece === 'b-queen' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'b') {
            moveDownRight = false
          } else if (piece === 'w-queen' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'w') {
            moveDownRight = false
          } else if (piece === 'b-queen' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection + downRightCounter, xDirection + downRightCounter])
            moveDownRight = false
          } else if (piece === 'w-queen' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection + downRightCounter, xDirection + downRightCounter])
            moveDownRight = false
          }
        } else {
          moveDownRight = false
        }
      }

      let moveTopRight = true
      let topRightCounter = 0
      while (moveTopRight) {
        topRightCounter++
        if (checkCordsWithinBoard(yDirection - topRightCounter, xDirection + topRightCounter)) {
          if (board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection - topRightCounter, xDirection + topRightCounter])
          } else if (piece === 'b-queen' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'b') {
            moveTopRight = false
          } else if (piece === 'w-queen' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'w') {
            moveTopRight = false
          } else if (piece === 'b-queen' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection - topRightCounter, xDirection + topRightCounter])
            moveTopRight = false
          } else if (piece === 'w-queen' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection - topRightCounter, xDirection + topRightCounter])
            moveTopRight = false
          }
        } else {
          moveTopRight = false
        }
      }

      let moveUpLeft = true
      let upLeftCounter = 0
      while (moveUpLeft) {
        upLeftCounter++
        if (checkCordsWithinBoard(yDirection - upLeftCounter, xDirection - upLeftCounter)) {
          if (board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection - upLeftCounter, xDirection - upLeftCounter])
          } else if (piece === 'b-queen' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'b') {
            moveUpLeft = false
          } else if (piece === 'w-queen' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'w') {
            moveUpLeft = false
          } else if (piece === 'b-queen' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection - upLeftCounter, xDirection - upLeftCounter])
            moveUpLeft = false
          } else if (piece === 'w-queen' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection - upLeftCounter, xDirection - upLeftCounter])
            moveUpLeft = false
          }
        } else {
          moveUpLeft = false
        }
      }

      let moveDownLeft = true
      let downLeftCounter = 0
      while (moveDownLeft) {
        downLeftCounter++
        if (checkCordsWithinBoard(yDirection + downLeftCounter, xDirection - downLeftCounter)) {
          if (board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'Empty') {
            potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
          } else if (piece === 'b-queen' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'b') {
            moveDownLeft = false
          } else if (piece === 'w-queen' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'w') {
            moveDownLeft = false
          } else if (piece === 'b-queen' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'w') {
            potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
            moveDownLeft = false
          } else if (piece === 'w-queen' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'b') {
            potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
            moveDownLeft = false
          }
        } else {
          moveDownLeft = false
        }
      }

    } else if (piece === 'b-pawn') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection - 2, xDirection) && yDirection === 6 && board![yDirection - 1][xDirection] === 'Empty' && board![yDirection - 2][xDirection] === 'Empty' ? [yDirection - 2, xDirection] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection) && board![yDirection - 1][xDirection] === 'Empty' ? [yDirection - 1, xDirection] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection + 1) && board![yDirection - 1][xDirection + 1].split('-')[0] === 'w' ? [yDirection - 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection - 1) && board![yDirection - 1][xDirection - 1].split('-')[0] === 'w' ? [yDirection - 1, xDirection - 1] : null,
      ]
    } else if (piece === 'w-pawn') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection + 2, xDirection) && yDirection === 1 && board![yDirection + 1][xDirection] === 'Empty' && board![yDirection + 2][xDirection] === 'Empty'? [yDirection + 2, xDirection] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection) && board![yDirection + 1][xDirection] === 'Empty'? [yDirection + 1, xDirection] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection + 1) && board![yDirection + 1][xDirection + 1].split('-')[0] === 'b'? [yDirection + 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection - 1) && board![yDirection + 1][xDirection - 1].split('-')[0] === 'b'? [yDirection + 1, xDirection - 1] : null,
      ]
    } else {
      potentialSpaces = []
    }

    // Generating Potential Spaces for Rooks
    potentialSpaces = potentialSpaces.filter(n => n)

    const newBoard = createNewArrayPotentialBoard()
    if (potentialSpaces.length === 0) {
      null
    } else {
      for (let index in potentialSpaces) {
        const xCord = potentialSpaces[index]![1]
        const yCord = potentialSpaces[index]![0]
        newBoard[yCord][xCord] = 'Move'
      }
    }
    newBoard[yDirection][xDirection] = 'Piece'

    this.setState({
      piece: piece,
      currentLocation: pieceLocation,
      potentialSpaces: potentialSpaces,
      potentialBoard: newBoard
    })
  }

  render() {
    // console.log(this.state)
    const { turn } = this.props;
    const { board, potentialBoard } = this.state

    const rowDivArray = []
    for (let y = 0; y < 8; y++) {
      const tempRow = []
      for (let x = 0; x < 8; x++) {
        const pieceContent = board![y][x] === 'Empty' ? 'Empty' : board![y][x].toString()
        tempRow.push(<div id={`${y + x.toString()} ${pieceContent}`} onClick={this.handlePiecePotentialSpaces} className='basis-1/8' > {pieceContent} </div>)
      }
      rowDivArray.push(tempRow)
    }

    const potentialSpacesDivArray = []
    for (let y = 0; y < 8; y++) {
      const tempRow = []
      for (let x = 0; x < 8; x++) {
        const pieceContent = potentialBoard![y][x] === 'Empty' ? 'Empty' : potentialBoard![y][x].toString()
        tempRow.push(<div id={`${y + x.toString()} ${pieceContent}`} onClick={this.handlePieceMove} className='basis-1/8' > {pieceContent} </div>)
      }
      potentialSpacesDivArray.push(tempRow)
    }

    const htmlBoard = (
      <div className='grid grid-cols-8 content-center text-center'>
        {rowDivArray}
      </div>
    );

    const htmlPotentialSpaces = (
      <div className='grid grid-cols-8 content-center text-center'>
        {potentialSpacesDivArray}
      </div>
    )

    return (
      <>
        <h1 className='text-center text-2xl'>{turn}</h1>
        <div>{htmlBoard}</div>
        <h1 className='text-center text-2xl'>Potential Moves</h1>
        <div>{htmlPotentialSpaces}</div>
      </>
    );
  }
}

export default Board;

function createNewArrayOfBoard() {
  const empty1 = [] = new Array(8).fill('Empty');
  const empty2 = [] = new Array(8).fill('Empty');
  const empty3 = [] = new Array(8).fill('Empty');
  const empty4 = [] = new Array(8).fill('Empty');
  const testing = ['Empty', 'b-rook', 'w-queen', 'Empty', 'b-queen', 'w-pawn', 'Empty', 'Empty',]
  const whitePawn = [] = new Array(8).fill('w-pawn');
  const blackPawn = [] = new Array(8).fill('b-pawn');
  const arrayBoard = [
    ['w-rook', 'w-knight', 'w-bishop', 'w-queen', 'w-king', 'w-bishop', 'w-knight', 'w-rook',],
    whitePawn,
    empty1,
    testing,
    empty3,
    empty4,
    blackPawn,
    ['b-rook', 'b-knight', 'b-bishop', 'b-queen', 'b-king', 'b-bishop', 'b-knight', 'b-rook',],
  ]
  return arrayBoard
}

function createNewArrayPotentialBoard() {
  const empty1 = [] = new Array(8).fill('0');
  const empty2 = [] = new Array(8).fill('0');
  const empty3 = [] = new Array(8).fill('0');
  const empty4 = [] = new Array(8).fill('0');
  const empty5 = [] = new Array(8).fill('0');
  const empty6 = [] = new Array(8).fill('0');
  const empty7 = [] = new Array(8).fill('0');
  const empty8 = [] = new Array(8).fill('0');
  const arrayBoard = [
    empty1,
    empty2,
    empty3,
    empty4,
    empty5,
    empty6,
    empty7,
    empty8
  ]
  return arrayBoard
}

function checkCordsWithinBoard(xDirection: number, yDirection: number) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7) {
    return true
  } else {
    return false
  }
}

function checkItemInPotentialSpaces(arr: (number[] | null)[], item: number[]) {
  for (let index in arr) {
    if (JSON.stringify(item) === JSON.stringify(arr[index])) {
      return true
    } else {
      return false
    }
  }
}
