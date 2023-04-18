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

class Rook extends Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      hasMoved: false,
      selected: false,
      potentialSpaces: [[]],
      imgUrls: { 'black': '/imgs/b-rook.svg', 'white': '/imgs/w-rook.svg' }
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
        <Image src={imgUrls[color]} alt={`${color}-rook`} width={100} height={100} />
      </div>
    )
  }
}

export default Rook

function checkCordsWithinBoard(xDirection: number, yDirection: number) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7) {
    return true
  } else {
    return false
  }
}
