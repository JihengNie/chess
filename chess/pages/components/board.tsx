import React, { Component, useState} from 'react';

interface BoardProps {
  turn: string;
}


class Board extends Component<BoardProps> {
  // constructors() {
  //   this.handleClick = this.handleClick.bind(this);
  // }

  render() {

    const { turn } = this.props;
    console.log(createNewBoard())
    return (
      <>
        <h1 className='text-center text-2xl'>{turn}</h1>
        <div>{createNewBoard()}</div>
      </>
    );
  }
}

export default Board;


function createNewBoard() {
  const nullArr: any[] = new Array(8).fill(null);
  const whitePawn = [] = new Array(8).fill('w-pawn');
  const blackPawn = [] = new Array(8).fill('b-pawn');
  const arrayBoard = [
    ['w-rook', 'w-knight', 'w-bishop', 'w-queen', 'w-king', 'w-bishop', 'w-knight','w-rook',],
    whitePawn,
    nullArr,
    nullArr,
    nullArr,
    nullArr,
    blackPawn,
    ['b-rook', 'b-knight', 'b-bishop', 'b-queen', 'b-king', 'b-bishop', 'b-knight', 'b-rook',],
  ]

  const rowDivArray = []
  for (let i = 0; i < 8; i++) {
    const tempRow = []
    for (let j = 0; j < 8; j++) {
      arrayBoard[i][j] === null ? tempRow.push(<div className='basis-1/8'> null </div>) : tempRow.push(<div className='basis-1/8'> {arrayBoard[i][j]} </div>)
    }
    rowDivArray.push(tempRow)
  }

const reversedRowDivArray = rowDivArray.reverse()
const htmlBoard = (
  <div>
    {reversedRowDivArray.map((rowDiv, index) => (
      <div key={index} className='grid grid-cols-8 content-center text-center'>{rowDiv}</div>
    ))}
  </div>
);
  return htmlBoard
}
