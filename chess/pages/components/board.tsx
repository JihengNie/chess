import React, { Component, useState} from 'react';

interface BoardProps {
  turn: string;
  board?: Array<string>;
}


class Board extends Component<BoardProps> {
  // constructors() {
  //   this.handleClick = this.handleClick.bind(this);
  // }

  render() {
    let newBoard = {
      a1: 'w-rook', b1: 'w-knight', c1: 'w-bishop', d1: 'w-queen', e1: 'w-king', f1: 'w-bishop', g1: 'w-knight', h1: 'w-rook',
      a2: 'w-pawn', b2: 'w-pawn', c2: 'w-pawn', d2: 'w-pawn', e2: 'w-pawn', f2: 'w-pawn', g2: 'w-pawn', h2: 'w-pawn',
      a3: null, b3: null, c3: null, d3: null, e3: null, f3: null, g3: null, h3: null,
      a4: null, b4: null, c4: null, d4: null, e4: null, f4: null, g4: null, h4: null,
      a5: null, b5: null, c5: null, d5: null, e5: null, f5: null, g5: null, h5: null,
      a6: null, b6: null, c6: null, d6: null, e6: null, f6: null, g6: null, h6: null,
      a7: 'b-pawn', b7: 'b-pawn', c7: 'b-pawn', d7: 'b-pawn', e7: 'b-pawn', f7: 'b-pawn', g7: 'b-pawn', h7: 'b-pawn',
      a8: 'b-rook', b8: 'b-knight', c8: 'b-bishop', d8: 'b-queen', e8: 'b-king', f8: 'b-bishop', g8: 'b-knight', h8: 'b-rook',
    }

    const { turn, board } = this.props;
    return (
      <>
        <h1 className='text-2xl'>{turn}</h1>
        <h2>{board}</h2>
      </>
    );
  }
}

export default Board;
