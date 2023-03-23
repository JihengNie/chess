import React from "react"
import { useState } from "react"
import ExampleModel from "./formModel"

export default function CreateButton() {
  let [createButton, setCreateButton] = useState(false)

  const handleCreateButtonClick = () => {
    console.log('createButton', createButton)
    setCreateButton(!createButton)
  }

  const createButtonClicked = <ExampleModel status={setCreateButton}/>

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
