import React, { Component} from 'react';

interface BoardProps {
  turn?: string;
}

type MyState = {
  board?: string[][],
  potentialBoard?: string[][],
  piece?: string | undefined,
  potentialSpaces: (number[] | null)[],
  currentLocation: number[]
}

class Board extends Component<BoardProps, MyState> {
  constructor(props: BoardProps) {
    super(props)

    this.state = {
      board: createNewArrayOfBoard(),
      potentialBoard: createNewArrayPotentialBoard(),
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

    if (JSON.stringify(newLocation) === JSON.stringify(currentLocation) && checkItemInPotentialSpaces(potentialSpaces, newLocation)) {
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

    let potentialSpaces: any = []

    // Generating Potential Spaces for Knight
    if (piece === 'b-knight' || piece === 'w-knight') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection - 2, xDirection + 1) ? [yDirection - 2, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection + 2) ? [yDirection - 1, xDirection + 2] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection + 2) ? [yDirection + 1, xDirection + 2] : null,
        checkCordsWithinBoard(yDirection + 2, xDirection + 1) ? [yDirection + 2, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 2, xDirection - 1) ? [yDirection - 2, xDirection - 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection - 2) ? [yDirection - 1, xDirection - 2] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection - 2) ? [yDirection + 1, xDirection - 2] : null,
        checkCordsWithinBoard(yDirection + 2, xDirection - 1) ? [yDirection + 2, xDirection - 1] : null
      ]
    } else if (piece === 'b-rook' || piece === 'w-rook') {
      for (let i = 0; i < 8; i++) {
        checkCordsWithinBoard(yDirection + i, xDirection) ? potentialSpaces.push([yDirection + i, xDirection]) : null
        checkCordsWithinBoard(yDirection - i, xDirection) ? potentialSpaces.push([yDirection - i, xDirection]) : null
        checkCordsWithinBoard(yDirection, xDirection + i) ? potentialSpaces.push([yDirection, xDirection + i]) : null
        checkCordsWithinBoard(yDirection, xDirection - i) ? potentialSpaces.push([yDirection, xDirection - i]) : null
      }
    } else if (piece === 'w-bishop' || piece === 'b-bishop') {
      for (let i = 0; i < 8; i++) {
        checkCordsWithinBoard(yDirection + i, xDirection + i) ? potentialSpaces.push([yDirection + i, xDirection + i]) : null
        checkCordsWithinBoard(yDirection - i, xDirection - i) ? potentialSpaces.push([yDirection - i, xDirection - i]) : null
        checkCordsWithinBoard(yDirection + i, xDirection - i) ? potentialSpaces.push([yDirection + i, xDirection - i]) : null
        checkCordsWithinBoard(yDirection - i, xDirection + i) ? potentialSpaces.push([yDirection - i, xDirection + i]) : null
      }
    } else if (piece === 'w-king' || piece === 'b-king') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection + 1, xDirection + 1) ? [yDirection + 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection - 1) ? [yDirection - 1, xDirection - 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection + 1) ? [yDirection - 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection - 1) ? [yDirection + 1, xDirection - 1] : null,

        checkCordsWithinBoard(yDirection - 1, xDirection) ? [yDirection - 1, xDirection] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection) ? [yDirection + 1, xDirection] : null,
        checkCordsWithinBoard(yDirection, xDirection + 1) ? [yDirection, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection, xDirection - 1) ? [yDirection, xDirection - 1] : null,
      ]
    } else if (piece === 'b-queen' || piece === 'w-queen') {
      for (let i = 0; i < 8; i++) {
        checkCordsWithinBoard(yDirection + i, xDirection) ? potentialSpaces.push([yDirection + i, xDirection]) : null
        checkCordsWithinBoard(yDirection - i, xDirection) ? potentialSpaces.push([yDirection - i, xDirection]) : null
        checkCordsWithinBoard(yDirection, xDirection + i) ? potentialSpaces.push([yDirection, xDirection + i]) : null
        checkCordsWithinBoard(yDirection, xDirection - i) ? potentialSpaces.push([yDirection, xDirection - i]) : null
        checkCordsWithinBoard(yDirection + i, xDirection + i) ? potentialSpaces.push([yDirection + i, xDirection + i]) : null
        checkCordsWithinBoard(yDirection - i, xDirection - i) ? potentialSpaces.push([yDirection - i, xDirection - i]) : null
        checkCordsWithinBoard(yDirection + i, xDirection - i) ? potentialSpaces.push([yDirection + i, xDirection - i]) : null
        checkCordsWithinBoard(yDirection - i, xDirection + i) ? potentialSpaces.push([yDirection - i, xDirection + i]) : null
      }
    } else if (piece === 'b-pawn') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection - 2, xDirection) && yDirection === 6 ? [yDirection - 2, xDirection] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection) ? [yDirection - 1, xDirection] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection + 1) ? [yDirection - 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection - 1, xDirection - 1) ? [yDirection - 1, xDirection - 1] : null,
      ]
    } else if (piece === 'w-pawn') {
      potentialSpaces = [
        checkCordsWithinBoard(yDirection + 2, xDirection) && yDirection === 1 ? [yDirection + 2, xDirection] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection) ? [yDirection + 1, xDirection] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection + 1) ? [yDirection + 1, xDirection + 1] : null,
        checkCordsWithinBoard(yDirection + 1, xDirection - 1) ? [yDirection + 1, xDirection - 1] : null,
      ]
    } else {
      potentialSpaces = []
    }

    // Generating Potential Spaces for Rooks
    potentialSpaces = potentialSpaces.filter(n => n)

    const newBoard = createNewArrayPotentialBoard()
    if (potentialSpaces.length === 0) {
      null
    } else {
      for (let index in potentialSpaces) {
        const xCord = potentialSpaces[index]![1]
        const yCord = potentialSpaces[index]![0]
        newBoard[yCord][xCord] = 'Move'
      }
    }
    newBoard[yDirection][xDirection] = 'Piece'

    this.setState({
      piece: piece,
      currentLocation: pieceLocation,
      potentialSpaces: potentialSpaces,
      potentialBoard: newBoard })
  }

  render() {
    console.log(this.state)
    const { turn } = this.props;
    const { board, potentialBoard} = this.state

    const rowDivArray = []
    for (let y = 0; y < 8; y++) {
      const tempRow = []
      for (let x = 0; x < 8; x++) {
        const pieceContent = board![y][x] === 'Empty' ? 'Empty' : board![y][x].toString()
        tempRow.push(<div id={`${y + x.toString()} ${pieceContent}`} onClick={this.handlePiecePotentialSpaces} className='basis-1/8' > {pieceContent} </div>)
      }
      rowDivArray.push(tempRow)
    }

    const potentialSpacesDivArray = []
    for (let y = 0; y < 8; y++) {
      const tempRow = []
      for (let x = 0; x < 8; x++) {
        const pieceContent = potentialBoard![y][x] === 'Empty' ? 'Empty' : potentialBoard![y][x].toString()
        tempRow.push(<div id={`${y + x.toString()} ${pieceContent}`} className='basis-1/8' > {pieceContent} </div>)
      }
      potentialSpacesDivArray.push(tempRow)
    }

    const htmlBoard = (
      <div className='grid grid-cols-8 content-center text-center'>
        {rowDivArray}
      </div>
    );

    const htmlPotentialSpaces = (
      <div className='grid grid-cols-8 content-center text-center'>
        {potentialSpacesDivArray}
      </div>
    )

    return (
      <>
        <h1 className='text-center text-2xl'>{turn}</h1>
        <div>{htmlBoard}</div>
        <h1 className='text-center text-2xl'>Potential Moves</h1>
        <div>{htmlPotentialSpaces}</div>
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
  const testing = ['Empty', 'Empty', 'w-bishop', 'Empty', 'b-pawn', 'w-pawn', 'Empty', 'Empty', ]
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

function createNewArrayPotentialBoard() {
  const empty1 = [] = new Array(8).fill('0');
  const empty2 = [] = new Array(8).fill('0');
  const empty3 = [] = new Array(8).fill('0');
  const empty4 = [] = new Array(8).fill('0');
  const empty5 = [] = new Array(8).fill('0');
  const empty6 = [] = new Array(8).fill('0');
  const empty7 = [] = new Array(8).fill('0');
  const empty8 = [] = new Array(8).fill('0');
  const arrayBoard = [
    empty1,
    empty2,
    empty3,
    empty4,
    empty5,
    empty6,
    empty7,
    empty8
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

function checkItemInPotentialSpaces(arr: (number[] | null)[], item: number[]) {
  for (let index in arr) {
    if (JSON.stringify(item) === JSON.stringify(arr[index])) {
      return true
    } else {
      return false
    }
  }
}
