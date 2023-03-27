import React, {useState} from 'react'

export default function Box() {
  let [pieceValue, setPieceValue] = useState(0)

  function handlePieceClick(event: any) {
    console.log(event.target)
    setPieceValue(pieceValue + 1)
  }

  return (
    <button
      onClick={handlePieceClick}
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
      Click me! {pieceValue}
    </button>
  )
}
