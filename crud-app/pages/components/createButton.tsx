import React from "react"
import { useState } from "react"
import ExampleModel from "./formModel"

export default function CreateButton() {
  let [createButton, setCreateButton] = useState(false)

  const handleCreateButtonClick = () => {
    setCreateButton(!createButton)
  }

  const createButtonClicked = <ExampleModel handleCreateButtonClick={handleCreateButtonClick}/>

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={handleCreateButtonClick}>
         Click ME!
      </button>
      {createButton ? createButtonClicked : null}
    </div>
  )
}
