import Head from "next/head"
import Board from "./components/board"
import Knight from "./components/pieces/knight"
import Rook from "./components/pieces/rook"
import Bishop from "./components/pieces/bishop"
import King from "./components/pieces/king"
import Pawn from "./components/pieces/pawn"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chess</title>
        <link rel="icon" href="/imgs/favicon.ico" />
      </Head>

      <Board turn='White'/>
      <Pawn color='white' board={createNewArrayOfBoard()} position={[6,1]}/>
      <Pawn color='black' board={createNewArrayOfBoard()} position={[6,1]} />
    </div>

  )
}

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
