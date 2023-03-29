import React, { Component} from 'react';

interface BoardProps {
  turn?: string;
}

type MyState = {
  board?: string[][],
  piece?: string,
  potentialSpaces: (number[] | null)[],
  currentLocation: number[]
}

class Board extends Component<BoardProps, MyState> {
  constructor(props: BoardProps) {
    super(props)

    this.state = {
      board: createNewArrayOfBoard(),
      piece: '',
      potentialSpaces: [[]],
      currentLocation: []
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleBlackKnightMove = this.handleBlackKnightMove.bind(this);
    this.handlePieceClick = this.handlePieceClick.bind(this)
  }

  handlePieceClick(event: any) {
    let [currLocation, piece] = event.target.id.split(' ')
    const yDirection = +currLocation[0]
    const xDirection = +currLocation[1]
    const pieceLocation = [yDirection, xDirection]
    this.setState({ piece: piece,
      currentLocation: pieceLocation
    })
  }

  handleBlackKnightMove(event: any) {
    let [currLocation, piece ] = event.target.id.split(' ')
    const newBoard = [...this.state.board!]

    const yDirection = +currLocation[0]
    const xDirection = +currLocation[1]
    const pieceLocation = [yDirection, xDirection]
    // Setting Current space to null
    newBoard[yDirection][xDirection] = 'Empty'

    // Generating Potential Spaces
    const potentialSpaces = [
      checkCordsWithinBoard(yDirection - 2, xDirection + 1) ? [yDirection - 2, xDirection + 1] : null,
      checkCordsWithinBoard(yDirection - 1, xDirection + 2) ? [yDirection - 1, xDirection + 2] : null,
      checkCordsWithinBoard(yDirection + 1, xDirection + 2) ? [yDirection + 1, xDirection + 2] : null,
      checkCordsWithinBoard(yDirection + 2, xDirection + 1) ? [yDirection + 2, xDirection + 1] : null,
      checkCordsWithinBoard(yDirection - 2, xDirection - 1) ? [yDirection - 2, xDirection - 1] : null,
      checkCordsWithinBoard(yDirection - 1, xDirection - 2) ? [yDirection - 1, xDirection - 2] : null,
      checkCordsWithinBoard(yDirection + 1, xDirection - 2) ? [yDirection + 1, xDirection - 2] : null,
      checkCordsWithinBoard(yDirection + 2, xDirection - 1) ? [yDirection + 2, xDirection - 1] : null
    ]
    this.setState({
      board: newBoard,
      piece: piece,
      currentLocation: pieceLocation,
      potentialSpaces: potentialSpaces })
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
    console.log(this.state)
    const { turn } = this.props;
    const { board } = this.state

    const rowDivArray = []
    for (let i = 0; i < 8; i++) {
      const tempRow = []
      for (let j = 0; j < 8; j++) {
        const pieceContent = board![i][j] === 'Empty' ? 'Empty' : board![i][j].toString()
        tempRow.push(<div id={`${i + j.toString()} ${pieceContent}`} onClick={this.handleBlackKnightMove} className='basis-1/8' > {pieceContent} </div>)
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

function checkCordsWithinBoard(xDirection: number, yDirection: number ) {
  if (xDirection >= 0 && xDirection <= 7 && yDirection >= 0 && yDirection <= 7 ) {
    return true
  } else {
    return false
  }
}
