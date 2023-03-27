import React, { Component} from 'react';

interface BoardProps {
  turn?: string;
}

type MyState = {
  board?: string[][]
}

class Board extends Component<BoardProps, MyState> {
  constructor(props: BoardProps) {
    super(props)

    this.state = {
      board: createNewArrayOfBoard()
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }


 handleButtonClick(event) {
   console.log(event.target.textContent)
   console.log(event.target)
}

  render() {

    const { turn } = this.props;
    const { board } = this.state

    const rowDivArray = []
    for (let i = 0; i < 8; i++) {
      const tempRow = []
      for (let j = 0; j < 8; j++) {
        tempRow.push(<div id={(j + i.toString())} onClick={this.handleButtonClick} className='basis-1/8'> {board![i][j] === 'Empty' ? 'Empty' : board![i][j]} </div>)
      }
      rowDivArray.push(tempRow)
    }

    const reversedRowDivArray = rowDivArray.reverse()
    const htmlBoard = (
      <div>
        {reversedRowDivArray.map((rowDiv, index) => (
          <div id={index.toString()} key={index} className='grid grid-cols-8 content-center text-center'>{rowDiv}</div>
        ))}
      </div>
    );


    return (
      <>
        <h1 className='text-center text-2xl'>{turn}</h1>
        <div>{htmlBoard}</div>
      </>
    );
  }
}

export default Board;

function createNewArrayOfBoard() {
  const empty = [] = new Array(8).fill('Empty');
  const whitePawn = [] = new Array(8).fill('w-pawn');
  const blackPawn = [] = new Array(8).fill('b-pawn');
  const arrayBoard = [
    ['w-rook', 'w-knight', 'w-bishop', 'w-queen', 'w-king', 'w-bishop', 'w-knight', 'w-rook',],
    whitePawn,
    empty,
    empty,
    empty,
    empty,
    blackPawn,
    ['b-rook', 'b-knight', 'b-bishop', 'b-queen', 'b-king', 'b-bishop', 'b-knight', 'b-rook',],
  ]
  return arrayBoard
}
