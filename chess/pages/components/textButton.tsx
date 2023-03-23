import React from "react"
import { useState } from "react"

export default function TextButton() {
  let [inputValue, setInputValue] = useState(0); // Hooks for using States without components

  const handleInputChange = () => {
    setInputValue(inputValue+1);
  };
  return (
    <button onClick={handleInputChange}> Click Me! {inputValue} </button>
  )
}
