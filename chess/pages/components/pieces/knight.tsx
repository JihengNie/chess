import React, { Component } from "react"
import Image from "next/image"

interface KnightProps {
  color: string,
  imgUrl: string,
  board: string[][],
  position: number[]
}

type KnightState = {
  hasMoved: boolean,
  selected?: boolean,
  potentialSpaces: (number[] | null)[],

}

class Knight extends Component<KnightProps, KnightState> {
  constructor(props: KnightProps) {
    super(props)
    this.state = {
      hasMoved: false,
      selected: false,
      potentialSpaces: [[]]
    }
    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSelected () {
    const {board, color, position} = this.props
    const [yDirection, xDirection] = position
    let potentialSpaces: any = []
    if (color === 'black') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection - 2, xDirection + 1) && (board![yDirection - 2][xDirection + 1].split('-')[0] === 'w' || board![yDirection - 2][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection - 2, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection + 2) && (board![yDirection - 1][xDirection + 2].split('-')[0] === 'w' || board![yDirection - 1][xDirection + 2].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection + 2] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection + 2) && (board![yDirection + 1][xDirection + 2].split('-')[0] === 'w' || board![yDirection + 1][xDirection + 2].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection + 2] : null,
        checkCordsWithinBoard(yDirection + 2, xDirection + 1) && (board![yDirection + 2][xDirection + 1].split('-')[0] === 'w' || board![yDirection + 2][xDirection + 1].split('-')[0] === 'Empty') ? [yDirection + 2, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 2, xDirection - 1) && (board![yDirection - 2][xDirection - 1].split('-')[0] === 'w' || board![yDirection - 2][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection - 2, xDirection - 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection - 2) && (board![yDirection - 1][xDirection - 2].split('-')[0] === 'w' || board![yDirection - 1][xDirection - 2].split('-')[0] === 'Empty') ? [yDirection - 1, xDirection - 2] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection - 2) && (board![yDirection + 1][xDirection - 2].split('-')[0] === 'w' || board![yDirection + 1][xDirection - 2].split('-')[0] === 'Empty') ? [yDirection + 1, xDirection - 2] : null,
        checkCordsWithinBoard(yDirection + 2, xDirection - 1) && (board![yDirection + 2][xDirection - 1].split('-')[0] === 'w' || board![yDirection + 2][xDirection - 1].split('-')[0] === 'Empty') ? [yDirection + 2, xDirection - 1] : null
      ]
    }
    if (color === 'white') {
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
    potentialSpaces = potentialSpaces.filter(n => n)
    this.setState({
      selected: true,
      potentialSpaces
    })
  }

  render() {
    const {color, imgUrl} = this.props
    console.log('states:',this.state)
    console.log('props:', this.props)
    return (
      <div onClick={this.handleSelected}>
        <Image src={imgUrl} alt={`${color}-Knight`} width={100} height={100}/>
    </div>
  )
}
}

export default Knight

function checkCordsWithinBoard(xDirection: number, yDirection: number) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7) {
    return true
  } else {
    return false
  }
}
