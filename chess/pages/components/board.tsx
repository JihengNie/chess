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


 handleButtonClick(event: any) {
   console.log('TEXT CONTENT',event.target.textContent)
   console.log('ID',event.target.id)
   let [currLocation, piece] = event.target.id.split(' ')
   console.log('Current Location',currLocation[0] + currLocation[1])
   console.log('Board Location Matrix',this.state.board![currLocation[0]][currLocation[1]])


   const newBoard = [...this.state.board!]
   console.log('NewBoard', newBoard)
   newBoard[currLocation[0]][currLocation[1]] = 'WHAT?'
   this.setState({ board: newBoard})

}

  render() {
    const { turn } = this.props;
    const { board } = this.state

    const rowDivArray = []
    for (let i = 0; i < 8; i++) {
      const tempRow = []
      for (let j = 0; j < 8; j++) {
        const pieceContent = board![i][j] === 'Empty' ? 'Empty' : board![i][j].toString()
        tempRow.push(<div id={`${i + j.toString()} ${pieceContent}`} onClick={this.handleButtonClick} className='basis-1/8' > {pieceContent} </div>)
      }
      rowDivArray.push(tempRow)
    }

    const htmlBoard = (
      <div className='grid grid-cols-8 content-center text-center'>
        {rowDivArray}
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
  const empty1 = [] = new Array(8).fill('Empty');
  const empty2 = [] = new Array(8).fill('Empty');
  const empty3 = [] = new Array(8).fill('Empty');
  const empty4 = [] = new Array(8).fill('Empty');
  const whitePawn = [] = new Array(8).fill('w-pawn');
  const blackPawn = [] = new Array(8).fill('b-pawn');
  const arrayBoard = [
    ['w-rook', 'w-knight', 'w-bishop', 'w-queen', 'w-king', 'w-bishop', 'w-knight', 'w-rook',],
    whitePawn,
    empty1,
    empty2,
    empty3,
    empty4,
    blackPawn,
    ['b-rook', 'b-knight', 'b-bishop', 'b-queen', 'b-king', 'b-bishop', 'b-knight', 'b-rook',],
  ]
  return arrayBoard
}
