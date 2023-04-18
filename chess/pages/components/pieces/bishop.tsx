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

class Bishop extends Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      hasMoved: false,
      selected: false,
      potentialSpaces: [[]],
      imgUrls: { 'black': '/imgs/b-bishop.svg', 'white': '/imgs/w-bishop.svg' }
    }
    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSelected() {
    const { board, color, position } = this.props
    const [yDirection, xDirection] = position
    let potentialSpaces: any = []
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
    console.log('type of color', typeof color)
    const { imgUrls } = this.state
    console.log('states:', this.state)
    console.log("imgUrls['color']", imgUrls[color])
    console.log('props:', this.props)
    return (
      <div onClick={this.handleSelected}>
        <Image src={imgUrls[color]} alt={`${color}-bishop`} width={100} height={100} />
      </div>
    )
  }
}

export default Bishop

function checkCordsWithinBoard(xDirection: number, yDirection: number) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7) {
    return true
  } else {
    return false
  }
}
