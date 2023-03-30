import React, { Component} from 'react';

interface BoardProps {
  turn?: string;
}

type MyState = {
  board?: string[][],
  piece?: string | undefined,
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
    this.handlePiecePotentialSpaces = this.handlePiecePotentialSpaces.bind(this);
    this.handlePieceClick = this.handlePieceClick.bind(this)
  }

  handlePieceClick(event: any) {
    const { piece, currentLocation, potentialSpaces } = this.state
    const yDirection = +currentLocation[0]
    const xDirection = +currentLocation[1]
    const [ newCords ] = event.target.id.split(' ')
    const newY = +newCords[0]
    const newX = +newCords[1]
    const newLocation = [newY, newX]
    const newBoard = [...this.state.board!]

    if (JSON.stringify(newLocation) === JSON.stringify(currentLocation) && checkItemInArray(potentialSpaces, newLocation)) {
      // Setting Current space to null
      newBoard[yDirection][xDirection] = 'Empty'
      newBoard[newY][newX] = piece!
    }
    this.setState({ board: newBoard,
      piece: '',
      potentialSpaces: [[]],
      currentLocation: []
    })
  }

  handlePiecePotentialSpaces(event: any) {
    let [currLocation, piece ] = event.target.id.split(' ')

    const yDirection = +currLocation[0]
    const xDirection = +currLocation[1]
    const pieceLocation = [yDirection, xDirection]

    // Generating Potential Spaces for Knight
    let potentialSpaces = [
      checkCordsWithinBoard(yDirection - 2, xDirection + 1) ? [yDirection - 2, xDirection + 1] : null,
      checkCordsWithinBoard(yDirection - 1, xDirection + 2) ? [yDirection - 1, xDirection + 2] : null,
      checkCordsWithinBoard(yDirection + 1, xDirection + 2) ? [yDirection + 1, xDirection + 2] : null,
      checkCordsWithinBoard(yDirection + 2, xDirection + 1) ? [yDirection + 2, xDirection + 1] : null,
      checkCordsWithinBoard(yDirection - 2, xDirection - 1) ? [yDirection - 2, xDirection - 1] : null,
      checkCordsWithinBoard(yDirection - 1, xDirection - 2) ? [yDirection - 1, xDirection - 2] : null,
      checkCordsWithinBoard(yDirection + 1, xDirection - 2) ? [yDirection + 1, xDirection - 2] : null,
      checkCordsWithinBoard(yDirection + 2, xDirection - 1) ? [yDirection + 2, xDirection - 1] : null
    ]
    potentialSpaces = potentialSpaces.filter(n => n)
    this.setState({
      piece: piece,
      currentLocation: pieceLocation,
      potentialSpaces: potentialSpaces })
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
        tempRow.push(<div id={`${i + j.toString()} ${pieceContent}`} onClick={this.handlePiecePotentialSpaces} className='basis-1/8' > {pieceContent} </div>)
      }
      rowDivArray.push(tempRow)
    }

    const htmlBoard = (
      <div onClick={this.handlePieceClick} className='grid grid-cols-8 content-center text-center'>
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

function checkItemInArray(arr: (number[] | null)[], item: number[]) {
  for (let index in arr) {
    if (JSON.stringify(item) === JSON.stringify(arr[index])) {
      return true
    } else {
      return false
    }
  }
}
