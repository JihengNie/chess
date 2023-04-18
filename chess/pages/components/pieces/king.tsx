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

class King extends Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      hasMoved: false,
      selected: false,
      potentialSpaces: [[]],
      imgUrls: { 'black': '/imgs/b-king.svg', 'white': '/imgs/w-king.svg' }
    }
    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSelected() {
    const { board, color, position } = this.props
    const [yDirection, xDirection] = position
    let potentialSpaces: any = []

    if (color === 'black') {
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

    if (color === 'white') {
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

    potentialSpaces = potentialSpaces.filter(n => n)
    this.setState({
      selected: true,
      potentialSpaces
    })
  }

  render() {
    const { color } = this.props
    const { imgUrls } = this.state
    return (
      <div onClick={this.handleSelected}>
        <Image src={imgUrls[color]} alt={`${color}-King`} width={100} height={100} />
      </div>
    )
  }
}

export default King

function checkCordsWithinBoard(xDirection: number, yDirection: number) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7) {
    return true
  } else {
    return false
  }
}
