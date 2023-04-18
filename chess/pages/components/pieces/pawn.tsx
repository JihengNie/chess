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

class Pawn extends Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      hasMoved: false,
      selected: false,
      potentialSpaces: [[]],
      imgUrls: { 'black': '/imgs/b-pawn.svg', 'white': '/imgs/w-pawn.svg' }
    }
    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSelected() {
    const { board, color, position } = this.props
    const [yDirection, xDirection] = position
    let potentialSpaces: any = []
    if(color === 'black') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection - 2, xDirection) && yDirection === 6 && board![yDirection - 1][xDirection] === 'Empty' && board![yDirection - 2][xDirection] === 'Empty' ? [yDirection - 2, xDirection] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection) && board![yDirection - 1][xDirection] === 'Empty' ? [yDirection - 1, xDirection] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection + 1) && board![yDirection - 1][xDirection + 1].split('-')[0] === 'w' ? [yDirection - 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection - 1) && board![yDirection - 1][xDirection - 1].split('-')[0] === 'w' ? [yDirection - 1, xDirection - 1] : null,
      ]
    }
    if (color === 'white') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection + 2, xDirection) && yDirection === 1 && board![yDirection + 1][xDirection] === 'Empty' && board![yDirection + 2][xDirection] === 'Empty' ? [yDirection + 2, xDirection] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection) && board![yDirection + 1][xDirection] === 'Empty' ? [yDirection + 1, xDirection] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection + 1) && board![yDirection + 1][xDirection + 1].split('-')[0] === 'b' ? [yDirection + 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection - 1) && board![yDirection + 1][xDirection - 1].split('-')[0] === 'b' ? [yDirection + 1, xDirection - 1] : null,
      ]
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
        <Image src={imgUrls[color]} alt={`${color}-Pawn`} width={100} height={100} />
      </div>
    )
  }
}

export default Pawn

function checkCordsWithinBoard(xDirection: number, yDirection: number) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7) {
    return true
  } else {
    return false
  }
}
