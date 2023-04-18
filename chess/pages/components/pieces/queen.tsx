import React, { Component } from "react"
import Image from "next/image"

interface props {
  color: string,
  board: string[][],
  position: number[]
}

interface imgUrls {
  [key: string]: string
}

type state = {
  hasMoved: boolean,
  selected?: boolean,
  potentialSpaces: (number[] | null)[],
  imgUrls: imgUrls,

}

class Queen extends Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      hasMoved: false,
      selected: false,
      potentialSpaces: [[]],
      imgUrls: { 'black': '/imgs/b-queen.svg', 'white': '/imgs/w-queen.svg' }
    }
    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSelected() {
    const { board, color, position } = this.props
    const [yDirection, xDirection] = position
    let potentialSpaces: any = []

    let moveDown = true
    let downCounter = 0
    while (moveDown) {
      downCounter++
      if (checkCordsWithinBoard(yDirection + downCounter, xDirection)) {
        if (board![yDirection + downCounter][xDirection].split('-')[0] === 'Empty') {
          potentialSpaces.push([yDirection + downCounter, xDirection])
        } else if (color === 'black' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
          moveDown = false
        } else if (color === 'white' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
          moveDown = false
        } else if (color === 'black' && board![yDirection + downCounter][xDirection].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection + downCounter, xDirection])
          moveDown = false
        } else if (color === 'white' && board![yDirection + downCounter][xDirection].split('-')[0] === 'b') {
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
        } else if (color === 'black' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
          moveUp = false
        } else if (color === 'white' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
          moveUp = false
        } else if (color === 'black' && board![yDirection - upCounter][xDirection].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection - upCounter, xDirection])
          moveUp = false
        } else if (color === 'white' && board![yDirection - upCounter][xDirection].split('-')[0] === 'b') {
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
        } else if (color === 'black' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
          moveRight = false
        } else if (color === 'white' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
          moveRight = false
        } else if (color === 'black' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection, xDirection + rightCounter])
          moveRight = false
        } else if (color === 'white' && board![yDirection][xDirection + rightCounter].split('-')[0] === 'b') {
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
        } else if (color === 'black' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
          moveLeft = false
        } else if (color === 'white' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
          moveLeft = false
        } else if (color === 'black' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection, xDirection - leftCounter])
          moveLeft = false
        } else if (color === 'white' && board![yDirection][xDirection - leftCounter].split('-')[0] === 'b') {
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
        } else if (color === 'black' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'b') {
          moveDownRight = false
        } else if (color === 'white' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'w') {
          moveDownRight = false
        } else if (color === 'black' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection + downRightCounter, xDirection + downRightCounter])
          moveDownRight = false
        } else if (color === 'white' && board![yDirection + downRightCounter][xDirection + downRightCounter].split('-')[0] === 'b') {
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
        } else if (color === 'black' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'b') {
          moveTopRight = false
        } else if (color === 'white' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'w') {
          moveTopRight = false
        } else if (color === 'black' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection - topRightCounter, xDirection + topRightCounter])
          moveTopRight = false
        } else if (color === 'white' && board![yDirection - topRightCounter][xDirection + topRightCounter].split('-')[0] === 'b') {
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
        } else if (color === 'black' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'b') {
          moveUpLeft = false
        } else if (color === 'white' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'w') {
          moveUpLeft = false
        } else if (color === 'black' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection - upLeftCounter, xDirection - upLeftCounter])
          moveUpLeft = false
        } else if (color === 'white' && board![yDirection - upLeftCounter][xDirection - upLeftCounter].split('-')[0] === 'b') {
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
        } else if (color === 'black' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'b') {
          moveDownLeft = false
        } else if (color === 'white' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'w') {
          moveDownLeft = false
        } else if (color === 'black' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'w') {
          potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
          moveDownLeft = false
        } else if (color === 'white' && board![yDirection + downLeftCounter][xDirection - downLeftCounter].split('-')[0] === 'b') {
          potentialSpaces.push([yDirection + downLeftCounter, xDirection - downLeftCounter])
          moveDownLeft = false
        }
      } else {
        moveDownLeft = false
      }
    }

    potentialSpaces = potentialSpaces.filter(n => n)
    this.setState({
      selected: true,
      potentialSpaces
    })
  }

  render() {
    const { color } = this.props
    const { imgUrls } = this.state
    console.log('Props:', this.props)
    console.log('State:', this.state)
    return (
      <div onClick={this.handleSelected}>
        <Image src={imgUrls[color]} alt={`${color}-Queen`} width={100} height={100} />
      </div>
    )
  }
}

export default Queen

function checkCordsWithinBoard(xDirection: number, yDirection: number) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7) {
    return true
  } else {
    return false
  }
}
