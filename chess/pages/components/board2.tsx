import React, { Component } from 'react';
import Knight from "./pieces/knight"
import Rook from "./pieces/rook"
import Bishop from "./pieces/bishop"
import King from "./pieces/king"
import Pawn from "./pieces/pawn"
import Queen from "./pieces/queen"

interface BoardProps {

}

type MyState = {
  turn: string,
  board?: string[][],
  piece?: string | undefined,
  potentialSpaces: (number[] | null)[],
  currentLocation: number[]
}

class Board2 extends Component<BoardProps, MyState> {

  constructor(props: BoardProps) {
    super(props)

    this.state = {
      turn:'white',
      board: this.createDefaultBoard(),
      piece: '',
      potentialSpaces: [[]],
      currentLocation: []
    }
    this.createDefaultBoard = this.createDefaultBoard.bind(this)
  }

  createDefaultBoard() {
    const bd = createNewArrayOfBoard()
    const row0 = [
    <Rook color='white' position={[0, 0]} board={bd} key='00-w-rook'/>,
    <Knight color='white' position={[0,1]} board={bd} key='01-w-knight'/>,
    <Bishop color='white' position={[0,2]} board={bd} key='02-w-bishop'/>,
    <Queen color='white' position={[0,3]} board={bd} key='03-w-queen'/>,
    <King color='white' position={[0,4]} board={bd} key='04-w-king'/>,
    <Bishop color='white' position={[0, 5]} board={bd} key='05-w-bishop' />,
    <Knight color='white' position={[0, 6]} board={bd} key='06-w-knight' />,
    <Rook color='white' position={[0, 7]} board={bd} key='07-w-rook' />
  ]
    const row1 = [
      <Pawn color='white' position={[1, 0]} board={bd} key='10-w-pawn'/>,
      <Pawn color='white' position={[1, 1]} board={bd} key='11-w-pawn' />,
      <Pawn color='white' position={[1, 2]} board={bd} key='12-w-pawn' />,
      <Pawn color='white' position={[1, 3]} board={bd} key='13-w-pawn' />,
      <Pawn color='white' position={[1, 4]} board={bd} key='14-w-pawn' />,
      <Pawn color='white' position={[1, 5]} board={bd} key='15-w-pawn' />,
      <Pawn color='white' position={[1, 6]} board={bd} key='16-w-pawn' />,
      <Pawn color='white' position={[1, 7]} board={bd} key='17-w-pawn' />
    ]
    const row2 = [] = new Array(8).fill('Empty');
    const row3 = [] = new Array(8).fill('Empty');
    const row4 = [] = new Array(8).fill('Empty');
    const row5 = [] = new Array(8).fill('Empty');
    const row6 = [
      <Pawn color='black' position={[8, 0]} board={bd} key='60-b-pawn' />,
      <Pawn color='black' position={[8, 1]} board={bd} key='61-b-pawn' />,
      <Pawn color='black' position={[8, 2]} board={bd} key='62-b-pawn' />,
      <Pawn color='black' position={[8, 3]} board={bd} key='63-b-pawn' />,
      <Pawn color='black' position={[8, 4]} board={bd} key='64-b-pawn' />,
      <Pawn color='black' position={[8, 5]} board={bd} key='65-b-pawn' />,
      <Pawn color='black' position={[8, 6]} board={bd} key='66-b-pawn' />,
      <Pawn color='black' position={[8, 7]} board={bd} key='67-b-pawn' />
    ]

    const row7 = [
      <Rook color='black' position={[7, 0]} board={bd} key='70-b-rook' />,
      <Knight color='black' position={[7, 1]} board={bd} key='71-b-knight' />,
      <Bishop color='black' position={[7, 2]} board={bd} key='72-b-bishop' />,
      <Queen color='black' position={[7, 3]} board={bd} key='73-b-queen' />,
      <King color='black' position={[7, 4]} board={bd} key='74-b-king' />,
      <Bishop color='black' position={[7, 5]} board={bd} key='75-b-bishop' />,
      <Knight color='black' position={[7, 6]} board={bd} key='76-b-knight' />,
      <Rook color='black' position={[7, 7]} board={bd} key='77-b-rook' />
    ]
    const board = [ row0, row1, row2, row3, row4, row5, row6, row7 ]
    return board
  }

  render() {
    const board = this.state.board?.map((item, index) => {
      return <div className='flex' key={index}>{item}</div>
    })

    return (
      <div className='justify-between'>
        {board}
      </div>
    )
  }
}
export default Board2;

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
